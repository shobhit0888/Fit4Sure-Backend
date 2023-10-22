const User_Say = require("../../models/User_Say");
const Adminauth = require("../../models/Adminauth");

class User_SayController {
    static list = async (req, res) => {
        try {
        const admin = await Adminauth.find({});
        const user_say = await User_Say.find({});
        return res.render("admin/user_say", {
            user_say,
            admin,
        });
        } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };
    
    static add = async (req, res) => {
        try {
            const user_say = new User_Say({
            title: req.body.title,
            description: req.body.description,
            });
            await user_say.save();
            return res.send({
                message: "User Say Added Successfully",
                });
        } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };

    static update = async (req, res) => {
        try {
        const user_say = await User_Say.findOne({
            _id: req.body.editid,
        })
        await User_Say.findOneAndUpdate(
            {
            _id: req.body.editid,
            },
            {
            $set: {
                title: req.body.edittitle,
                description: req.body.editdescription,
                updated_at: Date.now(),
            },
            }
        );
        return res.send({
            message: "User Say Updated Successfully",
        });
        } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message,
        });
        }
    };

    static delete = async (req, res) => {
        try {
        const user_say = await User_Say.findByIdAndDelete(req.body.id);
        return res.send({
            message: "User Say Deleted Successfully",
        });
        } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    }
}

module.exports = User_SayController;