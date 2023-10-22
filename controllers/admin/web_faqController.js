const Web_Faq = require("../../models/Web_Faq");
const Adminauth = require("../../models/Adminauth");

class Web_FaqController {
    static list = async (req, res) => {
        try {
        const admin = await Adminauth.find({});
        const faq = await Web_Faq.find({});
        return res.render("admin/web_faq", {
            faq,
            admin,
        });
        } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };

    static get_all_faq = async (req, res) => {
        try {
        const faq = await Web_Faq.find({});
        return res.send({
            faq,
        });
        } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };

    static add = async (req, res) => {
        try {
            const web_faq = new Web_Faq({
            title: req.body.title,
            description: req.body.description,
            });
            await web_faq.save();
            return res.send({
                message: "Web Faq Added Successfully",
                });
        } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };

    static delete = async (req, res) => {
        try {
        await Web_Faq.findOneAndDelete({
            _id: req.body.id,
        });
        return res.send({
            message: "Web Faq Deleted Successfully",
        });
        }
        catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };
}

module.exports = Web_FaqController;