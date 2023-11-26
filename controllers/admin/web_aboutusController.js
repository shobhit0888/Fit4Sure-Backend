const Web_Aboutus = require("../../models/Web_Aboutus");
const Adminauth = require("../../models/Adminauth");

class Web_AboutusController {
    static list = async (req, res) => {
        try {
        const admin = await Adminauth.find({});
        const aboutus = await Web_Aboutus.find({});
        return res.render("admin/web_aboutus", {
            aboutus,
            admin,
        });
        } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };

    static get_aboutus = async (req, res) => {
        try {
        const aboutus = await Web_Aboutus.find({});
        return res.send({
            aboutus,
        });
        } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };

    static add = async (req, res) => {
        try {
            const aboutus = new Web_Aboutus({
            who_we_are : req.body.who_we_are,
            description: req.body.description,
            });
            await aboutus.save();
            return res.send({
                message: "Web Aboutus Added Successfully",
                });
        } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };

    static delete = async (req, res) => {
        try {
        await Web_Aboutus.findOneAndDelete({
            _id: req.body.id,
        });
        return res.send({
            message: "Web Aboutus Deleted Successfully",
        });
        }
        catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };
}

module.exports = Web_AboutusController;