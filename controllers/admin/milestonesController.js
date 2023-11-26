const Milestones = require("../../models/Milestones");
const Adminauth = require("../../models/Adminauth");

class milestonesController {
    static list = async (req, res) => {
        try {
        const admin = await Adminauth.find({});
        const milestones = await Milestones.find({});
        return res.render("admin/milestones", {
            milestones,
            admin,
        });
        } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };

    static get_all_milestones = async (req, res) => {
        try {
        const milestones = await Milestones.find({});
        return res.send({
            milestones,
        });
        } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };

    static add = async (req, res) => {
        try {
            const milestone = new Milestones({
                coaches: req.body.coaches,
                success_rate: req.body.success_rate,
                lives_impacted: req.body.lives_impacted,
                users_in_india: req.body.users_in_india,
            });
            await milestone.save();
            return res.send({
                message: "Milestone Added Successfully",
                });
        } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };

    static delete = async (req, res) => {
        try {
        await Milestones.findOneAndDelete({
            _id: req.body.id,
        });
        return res.send({
            message: "Milestone Deleted Successfully",
        });
        }
        catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };
}

module.exports = milestonesController;