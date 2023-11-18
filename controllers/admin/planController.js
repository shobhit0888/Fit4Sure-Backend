const Plan = require("../../models/Plan");
const Adminauth = require("../../models/Adminauth");

class PlanController {
  static list = async (req, res) => {
    try {
      const plan = await Plan.find({});
      const admin = await Adminauth.find({});
      return res.render("admin/plan", {
        plan,
        admin,
      });
    } catch (error) {
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static all = async (req, res) => {
    try {
      const plan = await Plan.find({});
      return res.json(plan)
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static add = async (req, res) => {
    try {
      const plan = await Plan.create({
        title: req.body.title,
        price: req.body.price,
        per_month_price: req.body.per_month_price,
        duration: req.body.duration,
        description: req.body.description,
        short_description: req.body.short_description,
      });

      await plan.save();

      return res.send({
        error: false,
        message: "Plan added successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static delete = async (req, res) => {
    try {
        await Plan.findOneAndDelete({
            _id: req.body.id,
        });
      return res.send({
        error: false,
        message: "Plan deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
}

module.exports = PlanController;
