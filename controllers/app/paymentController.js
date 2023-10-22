const User = require("../../models/User");
const Order = require("../../models/Order");
const Appointment = require("../../models/Appointment");
const Razorpay = require("razorpay");
var invNum = require("invoice-number");
const Receipt = require("../../models/Receipt");
const cron = require("node-cron");
const multer = require("multer");
const firebaseApp = require("../../firebase");
const docFilter = require("../../config/docFilter");

const bucket = firebaseApp.storage().bucket();

const generateUniqueFileName = (fileName) => {
  const uniqueId = Date.now().toString();
  const fileExtension = fileName.split(".").pop();
  return `${uniqueId}.${fileExtension}`;
};

const uploadImageToFirebase = (pdfFile) => {
  return new Promise((resolve, reject) => {
    try {
      const fileName = generateUniqueFileName(pdfFile.originalname);
      const filePath = `invoices/${fileName}`;
      const file = bucket.file(filePath);

      // Create a write stream to upload the image file
      const writeStream = file.createWriteStream({
        metadata: {
          contentType: pdfFile.mimetype,
        },
      });

      // Pipe the image file to the write stream
      writeStream.end(pdfFile.buffer);

      // Handle the completion of the upload
      writeStream.on("finish", async () => {
        // Get the download URL
        try {
          const [url] = await file.getSignedUrl({
            action: "read",
            expires: "03-01-2500",
          });
          resolve({ filePath, downloadUrl: url });
        } catch (error) {
          reject(error);
        }
      });

      writeStream.on("error", (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

class PaymentController {
  static order_with_razorpay = async (req, res) => {
    try {
      const data = req.body;
      if (!data.amount) {
        return res.status(400).send({
          status: 400,
          key: "amount",
          message: "amount is required",
        });
      }
      if (!data.subscription_plan_id) {
        return res.status(400).send({
          status: 400,
          key: "subscription_plan_id",
          message: "subscription_plan_id is required",
        });
      }
      if (!data.duration) {
        return res.status(400).send({
          status: 400,
          key: "duration",
          message: "duration is required",
        });
      }

      const user = await User.findOne({
        _id: data.user_id,
      });

      const order_data = await instance.orders.create({
        amount: data.amount,
        currency: "INR",
      });

      const order = Order({
        user_id: req.userId ? req.userId : "",
        order_id: order_data.id,
        amount: order_data.amount / 100,
        subscription_plan_id: data.subscription_plan_id,
        plan_details: data.plan_details,
        trainer_id: data.trainer_id,
        duration: data.duration,
        currency: order_data.currency,
        receipt_id: "12345",
        status: order_data.status,
        attempts: order_data.attempts,
      });
      var savedorder = await order.save();

      return res.send({ order_id: order_data.id });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static checkout_with_razorpay = async (req, res) => {
    try {
      const data = req.body;
      if (!data.order_id) {
        return res.status(400).send({
          status: 400,
          key: "order_id",
          message: "order_id is required",
        });
      }
      if (!data.payment_data) {
        return res.status(400).send({
          status: 400,
          key: "payment_data",
          message: "payment_data is required",
        });
      }

      const payment = await instance.orders.fetch(data.order_id);

      if (payment.amount_due != 0) {
        return res.status(400).send({
          status: 400,
          message: "Payment due",
        });
      } else {
        const order = await Order.findOneAndUpdate(
          {
            order_id: data.order_id,
          },
          {
            payment_data: data.payment_data,
            status: "success",
          },
          {
            new: true,
          }
        );

        await Appointment.findOneAndUpdate(
          {
            order,
          },
          {
            status: 1,
          }
        );
      }

      return res.status(200).send({
        status: 200,
        message: "Success",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: 500,
        message: "Something went wrong please try again later",
        error,
      });
    }
  };

  static getOrderDetails = async (req, res) => {
    try {
      const { razorpay_order_id } = req.params;
      const order = await Order.findOne({ order_id: razorpay_order_id }).populate("user_id");
      return res.status(200).json({ order });
    } catch (error) {
      console.error("Error fetching order details:", error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  };

  static billing_history = async (req, res) => {
    try {
      const order = await Order.find({
        user_id: req.userId ? req.userId : "",
        status: "success",
      })

      return res.send({
        order
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static upload_invoice = async (req, res) => {
    try {
      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          // Handle multer errors (e.g., file size, unsupported file type)
          return res.status(400).json({ error: err.message});
        } else if (err) {
          // Handle other errors
          return res.status(500).json({ error: "An error occurred" });
        }

          if (!req.file) {
            return res.status(400).json({ error: "No file received" });
          }


          const orderData = JSON.parse(req.body.order);

          if(orderData.status !== "success") {
            return res.status(400).json({ error: "Order status is not success" });
          }

          const { filePath, downloadUrl } = await uploadImageToFirebase(
            req.file
          );

          const orderId = orderData._id;

          await Order.findByIdAndUpdate(orderId, { invoice: downloadUrl });

          return res
            .status(200)
            .json({ message: "File uploaded successfully" });
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while uploading the file" });
    }
  };
}

cron.schedule("0 * * * *", async () => {
  const timeThreshold = 30 * 60 * 1000; // 30 minutes in milliseconds
  const currentTime = Date.now();

  try {
    // Find all orders with status "created"
    const createdOrders = await Order.find({ status: "created" });

    // Filter orders that are older than the time threshold
    const ordersToDelete = createdOrders.filter(
      (order) => currentTime - order.createdTime.getTime() >= timeThreshold
    );

    // Delete the orders that are older than the time threshold
    for (const orderToDelete of ordersToDelete) {
      await Order.findOneAndDelete({ _id: orderToDelete._id });
    }
  } catch (error) {
    console.error('Error deleting "created" orders:', error);
  }
});

var instance = new Razorpay({
  key_id: "rzp_test_rFXwtHIILu1CTU",
  key_secret: "OagCUpxf4bDzhU7igpiUOxK2",
});

module.exports = PaymentController;

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: docFilter,
}).single("file");
