const mongoose = require("mongoose");
const Trainer = require("../../models/Trainer");
const Adminauth = require("../../models/Adminauth");
const Category = require("../../models/Category");
const multer = require("multer");
const imageFilter = require("../../config/imageFilter");
const firebaseApp = require("../../firebase");

const storage = firebaseApp.storage();

const bucket = firebaseApp.storage().bucket();

const generateUniqueFileName = (fileName) => {
  const uniqueId = Date.now().toString();
  const fileExtension = fileName.split(".").pop();
  return `${uniqueId}.${fileExtension}`;
};

const uploadImageToFirebase = async (imageFile) => {
  try {
    const fileName = generateUniqueFileName(imageFile.originalname);
    const filePath = `trainers/${fileName}`;
    const file = bucket.file(filePath);

    // Create a write stream to upload the image file
    const writeStream = file.createWriteStream({
      metadata: {
        contentType: imageFile.mimetype,
      },
    });

    // Pipe the image file to the write stream
    writeStream.end(imageFile.buffer);

    // Handle the completion of the upload
    return new Promise((resolve, reject) => {
      writeStream.on("finish", () => {
        resolve(filePath);
      });

      writeStream.on("error", (error) => {
        reject(error);
      });
    });
  } catch (error) {
    throw new Error("Error uploading image to Firebase Storage");
  }
};

class TrainerController {
  static addGet = async (req, res) => {
    try {
      const trainers = await Trainer.find();
      const admin = await Adminauth.find({});
      const categories = await Category.find().sort({
        created_at: -1,
      });
      res.render("admin/add-trainer", {
        trainers,
        admin,
        categories,
      });
    } catch (err) {
      console.log(err);
      return res.send("Something went wrong please try again later");
    }
  };

  static add = async (req, res) => {
    try {
      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          console.log(err);
          return res.status(500).send(err);
        } else if (err) {
          console.log(err);
          return res.status(500).send(err);
        }

        if (!req.file) {
          return res.status(400).send("Please upload an image file");
        }

        const imageUrl = await uploadImageToFirebase(req.file);

        const trainer = new Trainer({
          image: imageUrl,
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          experience_year: req.body.experience_year,
          about: req.body.about,
          location: req.body.location,
          experties: req.body.experties,
          bank_name: req.body.bank_name,
          account_holder_name: req.body.account_holder_name,
          account_no: req.body.account_no,
          ifsc_code: req.body.ifsc_code,
          branch: req.body.branch,
          upi: req.body.upi,
          category: req.body.category ? req.body.category : "Not Found",
          people_trained: req.body.people_trained,
          rating: req.body.rating,
          website_desc: req.body.website_desc,
        });

        await trainer.save();
        return res.send({
          error: false,
          message: " Trainer added successfully",
        });
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static trainerList = async (req, res) => {
    try {
      const trainer = await Trainer.find();
      const admin = await Adminauth.find({});
      // const TrainersWithImageURLs = await Promise.all(
      //   trainer.map(async (trainer) => {
      //     const file = storage.bucket().file(trainer.image);
      //     console.log(file);
      //     const [signedUrl] = await file.getSignedUrl({
      //       action: "read",
      //       expires: "03-01-2500",
      //     });
      //     return { ...trainer.toObject(), image: signedUrl };
      //   })
      // );

      return res.render("admin/trainer-list", {
        trainer: trainer,
        admin,
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };

  static Approved = async (req, res) => {
    try {
      const data = req.body;

      await Trainer.findByIdAndUpdate(data.id, {
        approved: data.approved,
      });
      ({
        type: "form_status",
        data: {
          id: Trainer.id,
          status: data.approved ? "approved" : "disapproved",
          time: Date.now(),
        },
      });
      return res.send({
        error: false,
        message: "Trainer status updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static edit = async (req, res) => {
    try {
      const trainer = await Trainer.findOne({
        _id: req.body.editid,
      });
      await Trainer.findOneAndUpdate(
        {
          _id: req.body.editid,
        },
        {
          name: req.body.edit_name,
          email: req.body.edit_email,
          phone: req.body.edit_phone,
          experience_year: req.body.edit_experience_year,
          about: req.body.edit_about,
          location: req.body.edit_location,
          experties: req.body.edit_experties,
          bank_name: req.body.edit_bank_name,
          account_holder_name: req.body.edit_account_holder_name,
          account_no: req.body.edit_account_no,
          ifsc_code: req.body.edit_ifsc_code,
          branch: req.body.edit_branch,
          upi: req.body.edit_upi,
          people_trained: req.body.edit_people_trained,
          rating: req.body.edit_rating,
          website_desc: req.body.edit_website_desc,
          updated_at: Date.now(),
        }
      );
      return res.send({
        error: false,
        message: "Trainer updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something went wrong please try again later");
    }
  };

  static delete = async (req, res) => {
    try {
      const trainer = await Trainer.findOne({
        _id: req.body.id,
      });
      const filePath = trainer.image;
      const file = bucket.file(filePath);
      await file.delete();
      await Trainer.deleteOne({
        _id: trainer.id,
      });
      return res.send({
        error: false,
        message: "Trainer Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static trainerDetails = async (req, res) => {
    const trainerId = req.params.trainerId;
    const aggregation = [
      {
        $match: {
          _id: mongoose.Types.ObjectId(trainerId),
        },
      },
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "trainer_id",
          as: "orders",
        },
      },
      {
        $lookup: {
          from: "classes",
          let: {
            trainerId: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$trainer_id", "$$trainerId"],
                    },
                  ],
                },
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "user",
              },
            },
            {
              $unwind: {
                path: "$user",
                preserveNullAndEmptyArrays: true,
              },
            },
          ],
          as: "classes",
        },
      },
    ];
    try {
      const trainerDetails = await Trainer.aggregate(aggregation);
      const admin = await Adminauth.find({});
      if (trainerDetails != null && trainerDetails.length > 0) {
        return res.render("admin/trainer-details", {
          trainerDetails: trainerDetails[0],
          admin,
        });
      } else {
        return res
          .status(404)
          .send("No Trainer found with given id please check id.");
      }
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .send("Error generated while fetching trainer details.");
    }
  };

  static trainerByCategory = async (req, res) => {
    try {
      const categoryId = req.params.categoryId;

      // Find the corresponding category based on the categoryId
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      const trainers = await Trainer.find({ category: categoryId });

      const trainersWithImageURLs = await Promise.all(
        trainers.map(async (trainer) => {
          const file = storage.bucket().file(trainer.image);
          const [signedUrl] = await file.getSignedUrl({
            action: "read",
            expires: "03-01-2500",
          });
          return { ...trainer.toObject(), image: signedUrl };
        })
      );
      return res.send({ trainers: trainersWithImageURLs });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: imageFilter,
}).single("image");

module.exports = TrainerController;
