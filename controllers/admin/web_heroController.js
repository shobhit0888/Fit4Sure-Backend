const Web_Hero = require("../../models/Web_Hero");
const Adminauth = require("../../models/Adminauth");

class Web_HeroController {
    static list = async (req, res) => {
        try {
        const admin = await Adminauth.find({});
        const hero = await Web_Hero.find({});
        return res.render("admin/web_hero", {
            hero,
            admin,
        });
        } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };

    static get_all_hero = async (req, res) => {
        try {
        const hero = await Web_Hero.find({});
        return res.send({
            hero,
        });
        } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };

    static add = async (req, res) => {
        try {
            const web_hero = new Web_Hero({
            title: req.body.title,
            description: req.body.description,
            });
            await web_hero.save();
            return res.send({
                message: "Web Hero Added Successfully",
                });
        } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };

    static delete = async (req, res) => {
        try {
        await Web_Hero.findOneAndDelete({
            _id: req.body.id,
        });
        return res.send({
            message: "Web Hero Deleted Successfully",
        });
        }
        catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };
}

module.exports = Web_HeroController;