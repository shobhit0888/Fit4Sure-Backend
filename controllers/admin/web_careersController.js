const Careers = require("../../models/Web_Careers");
const Adminauth = require("../../models/Adminauth");

class WebCareersController {
    static list = async (req, res) => {
        try {
        const admin = await Adminauth.find({});
        const careers = await Careers.find({});
        return res.render("admin/web_careers", {
            careers,
            admin,
        });
        } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };

    static get_all_careers = async (req, res) => {
        try {
        const careers = await Careers.find({});
        return res.send({
            careers,
        });
        } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };

    static add = async (req, res) => {
        try {
            const careers = new Careers({
            title: req.body.title,
            qualification: req.body.qualification,
            experience: req.body.experience,
            location: req.body.location,
            type: req.body.type,
            description: req.body.description,
            });
            await careers.save();
            return res.send({
                message: "Career Added Successfully",
                });
        } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };

    static delete = async (req, res) => {
        try {
        await Careers.findOneAndDelete({
            _id: req.body.id,
        });
        return res.send({
            message: "Career Deleted Successfully",
        });
        }
        catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };
}

module.exports = WebCareersController;