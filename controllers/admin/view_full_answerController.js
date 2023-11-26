const View_Full_Answer = require("../../models/View_Full_Answer");
const Adminauth = require("../../models/Adminauth");

class ViewFullAnswerController {
    static index = async (req, res) => {
        try {
        const view_full_answer = await View_Full_Answer.find();
        const admin = await Adminauth.find();
        return res.render("admin/view_full_answer", {
            view_full_answer,
            admin,
        });
        } catch (error) {
        console.log(error);
        return res.send("Something went wrong please try again later");
        }
    };

    static add = async (req, res) => {
        try {
        const view_full_answer = new View_Full_Answer({
            title: req.body.title,
            sub_title: req.body.sub_title,
            description: req.body.description,

        })
        await view_full_answer.save();
        return res.send({
            message: "View Full Answer added successfully",
            success: true,
        });
        } catch (error) {
        console.log(error);
        return res.send("Something went wrong please try again later");
        }
    }

    static edit = async (req, res) => {
        try {
        const view_full_answer = await View_Full_Answer.findOne({
            _id: req.body.editid,
        },{
            title: req.body.title,
            sub_title: req.body.sub_title,
            description: req.body.description,

        });
        return res.send({
            message: "View Full Answer updated successfully",
            success: true,
        });
        }
        catch (error) {
        console.log(error);
        return res.send("Something went wrong please try again later");
        }
    }

    static delete = async (req, res) => {
        try {
        const view_full_answer = await View_Full_Answer.findOneAndDelete({
            _id: req.body.id,
        });
        return res.send({
            message: "View Full Answer deleted successfully",
            success: true,
        });
        }
        catch (error) {
        console.log(error);
        return res.send("Something went wrong please try again later");
        }
    }
}

module.exports = ViewFullAnswerController;
    
    
 
    
    