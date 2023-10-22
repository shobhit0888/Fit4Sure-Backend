const Testimonial = require("../../models/Testimonial");
const Adminauth = require("../../models/Adminauth");

class TestimonialController {
  static list = async (req, res) => {
    try {
      const testimonials = await Testimonial.find();
      const admin = await Adminauth.find({});
      return res.render("admin/testimonials", {
        testimonials,
        admin,
      });
    } catch (error) {
      return res.send("Something went wrong please try again later");
    }
  };

  static add = async (req, res) => {
    try {
      const testimonial = Testimonial({
        name: req.body.name,
        description: req.body.description,
      });
      await testimonial.save();
      return res.send({
        error: false,
        message: "Testimonial added successfully",
      });
    } catch (error) {
      console.log(error);
      return res.send("Somthing went wrong please try again later");
    }
  };

  static delete = async (req, res) => {
    try {
      const testimonial = await Testimonial.findOne({
        _id: req.body.id,
      });
      await testimonial.remove();
      return res.send({
        error: false,
        message: "Testimonial deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return res.send("Somthing went wrong please try again later");
    }
  };
}

module.exports = TestimonialController;
