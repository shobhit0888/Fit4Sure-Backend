const ContactInfo = require("../../models/Web_UserContactInfo");

class UserContactInfoController {
  static add = async (req, res) => {
    try {
      const contactInfo = new ContactInfo({
        name: req.body.name,
        email: req.body.email,
        mobileNumber: req.body.mobileNumber,
        message: req.body.topic,
      });
      await contactInfo.save();
      return res.send({
        message: "Contact Info Added Successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
}

module.exports = UserContactInfoController;
