const ContactInfo = require("../../models/Web_UserContactInfo");
const Adminauth = require("../../models/Adminauth");

class Web_UserContactInfoController {

    static list = async (req, res) => {

        try {
            const admin = await Adminauth.find({});
            const contactInfo = await ContactInfo.find({});
            return res.render('admin/web_userContactInfo', {
                contactInfo,
                admin
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }

    static delete = async (req, res) => {

        try {
            await ContactInfo.findOneAndDelete({
                _id: req.body.id
            });
            return res.send({
                message: 'Contact Info Deleted Successfully'
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }
}

module.exports = Web_UserContactInfoController;