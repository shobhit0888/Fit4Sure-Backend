const Faq = require("../../models/Faq");
const About = require("../../models/About");
const Transformations = require("../../models/Transformations");
const Testimonial = require("../../models/Testimonial");
const Fit_Provides = require("../../models/Fit_Provides");
const Team = require("../../models/Team");
const Package = require("../../models/Package");
const Plan = require("../../models/Plan");
const PackageInclude = require("../../models/PackageInclude");
const Contact = require("../../models/Contact");
const Web_Contact = require("../../models/Web_Contact");
const Web_Faq = require("../../models/Web_Faq");
const Web_services = require("../../models/Web_services");
const Setting_Footer = require("../../models/Setting_Footer");
const Web_Apart = require("../../models/Web_Apart");
const User_Say = require("../../models/User_Say");
const Web_Slider = require("../../models/Web_Slider");
const Food_Type = require("../../models/Food_Type");
const Web_Testimonials = require("../../models/Web_Testimonials");
const Talk_To_Expert = require("../../models/Talk_To_Expert");
const View_Full_Answer = require("../../models/View_Full_Answer");
const Counting = require("../../models/Counting");
const Setting = require("../../models/Setting");

class WebsiteController {
  static index = async (req, res) => {
    try {
      const transformations = await Transformations.find();
      const testimonials = await Testimonial.find();
      const fit_provides = await Fit_Provides.find();
      const web_Faq = await Web_Faq.find();
      const web_services = await Web_services.find();
      const setting_footer = await Setting_Footer.find();
      const web_apart = await Web_Apart.find();
      const user_say = await User_Say.find();
      const web_slider = await Web_Slider.find();
      const food_type = await Food_Type.find();
      const web_testimonials = await Web_Testimonials.find();
      const talk_to_expert = await Talk_To_Expert.find();
      const view_full_answer = await View_Full_Answer.find();
      const counting = await Counting.find();
      const data = await Setting.find();
      return res.render("website/index", {
        testimonials,
        fit_provides,
        transformations,
        web_Faq,
        web_services_image1: web_services[0].image ? web_services[0].image : "",
        web_services_image2: web_services[1].image ? web_services[1].image : "",
        web_services_image3: web_services[2].image ? web_services[2].image : "",
        web_services_image4: web_services[3].image ? web_services[3].image : "",
        web_services_image5: web_services[4].image ? web_services[4].image : "",
        web_services_image6: web_services[5].image ? web_services[5].image : "",
        web_services,
        setting_footer,
        web_apart,
        user_say,
        web_slider,
        food_type,
        web_testimonials,
        talk_to_expert,
        view_full_answer,
        counting,
        web_service_title: data ? data.web_service_title : "",
        web_service_description: data ? data.web_service_description : "",
        transformation_title: data ? data.transformation_title : "",
        transformation_description: data ? data.transformation_description : "",
        food_type_title: data ? data.food_type_title : "",
        steps_title: data ? data.steps_title : "",
        steps_description: data ? data.steps_description : "",
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };

  static food = async (req, res) => {
    try {
      let foodID = req.body.id;
      const food_type = await Food_Type.findOne({
        _id: foodID,
      });
      return res.send({
        food_type,
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later ");
    }
  };

  static aboutus = async (req, res) => {
    try {
      const aboutus = await About.find();
      const setting_footer = await Setting_Footer.find();
      return res.render("website/aboutus", {
        aboutus,
        setting_footer,
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };
  static services = async (req, res) => {
    try {
      const web_services = await Web_services.find();
      const data = await Setting.find();
      const setting_footer = await Setting_Footer.find();
      return res.render("website/services", {
        web_services,
        setting_footer,
        web_service_title: data ? data.web_service_title : "",
        web_service_description: data ? data.web_service_description : "",
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };
  static service_details = async (req, res) => {
    try {
      let id = req.params.id;
      const web_services = await Web_services.findOne({
        _id: id,
      });
      // console.log(web_services);
      const data = await Setting.find();
      const setting_footer = await Setting_Footer.find();
      return res.render("website/services_details", {
        web_services,
        setting_footer,
        web_service_title: data ? data.web_service_title : "",
        web_service_description: data ? data.web_service_description : "",
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };
  static careers = async (req, res) => {
    try {
      const setting_footer = await Setting_Footer.find();
      return res.render("website/careers", {
        setting_footer,
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };

  static addcontact = async (req, res) => {
    try {
      //Create data
      let data = req.body;
      const web_contact = Web_Contact({
        contact_name: data.contact_name,
        email: data.email,
        country: data.country,
        city: data.city,
        phone: data.phone,
        gender: data.gender,
        concern: data.concern,
        time: data.time,
      });
      //save data
      await web_contact.save();
      return res.send({
        message: "Contact added successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static contact = async (req, res) => {
    try {
      const setting_footer = await Setting_Footer.find();
      const web_contact = await Web_Contact.find();
      return res.render("website/contact", {
        setting_footer,
        web_contact,
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };
}

module.exports = WebsiteController;
