const Setting = require("../../models/Setting");
const Adminauth = require("../../models/Adminauth");

class SettingController {
  static list = async (req, res) => {
    try {
      const data = await Setting.findOne({});
      const admin = await Adminauth.find({});
      return res.render("admin/setting", {
        admin,
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
      return res
        .status(500)
        .json({ message: "omething went wrong please try again later" });
    }
  };

  static add = async (req, res) => {
    try {
      let data = req.body;
      var exist = await Setting.findOne();
      if (exist) {
        await Setting.findOneAndUpdate(
          {},
          {
            web_service_title: data.web_service_title.trim(),
            web_service_description: data.web_service_description.trim(),
            transformation_title: data.transformation_title.trim(),
            transformation_description: data.transformation_description.trim(),
            food_type_title: data.food_type_title.trim(),
            steps_title: data.steps_title.trim(),
            steps_description: data.steps_description.trim(),
            updated_at: Date.now(),
          }
        );
        return res.send({
          error: false,
          message: "Setting updated successfully",
        });
      } else {
        const setting = await Setting({
          web_service_title: data.web_service_title.trim(),
          web_service_description: data.web_service_description.trim(),
          transformation_title: data.transformation_title.trim(),
          transformation_description: data.transformation_description.trim(),
          food_type_title: data.food_type_title.trim(),
          steps_title: data.steps_title.trim(),
          steps_description: data.steps_description.trim(),
        });

        await setting.save();
      }
      return res.send({
        error: false,
        message: "Setting Add successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Something went wrong please try again later" });
    }
  };
}

module.exports = SettingController;
