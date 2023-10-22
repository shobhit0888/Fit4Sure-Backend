const router = require("express").Router();
const { auth } = require("../../middlewares/Appauth");
const PaymentController = require("../../controllers/app/paymentController");

router.post(
  "/order-with-razorpay",
  auth,
  PaymentController.order_with_razorpay
);
router.post(
  "/checkout-with-razorpay",
  auth,
  PaymentController.checkout_with_razorpay
);
router.get("/billing-history", auth, PaymentController.billing_history);

router.post("/upload-invoice", auth, PaymentController.upload_invoice);

router.get("/get-order/:razorpay_order_id", auth, PaymentController.getOrderDetails);

router.get("/test1", auth, async (req, res) => {
  // const payment = await instance.orders.fetch('order_GwlV48Q7gVg7Vf');
  res.send(invNum);
});

function receipt_id() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString(36).substr(2, 9);
}

module.exports = router;
