const Order = require("../../models/Order");
const Adminauth = require("../../models/Adminauth");

class paymentController {
  static list = async (req, res) => {
    try {
      let paymentData = await Order.find()
        .populate("user_id subscription_plan_id trainer_id")
        .sort({
          created_at: -1,
        });
      const admin = await Adminauth.find({});
      return res.render("admin/orders-list", {
        paymentData,
        admin,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
}

module.exports = paymentController;