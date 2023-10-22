const Web_Qna = require("../../models/Web_Qna");
const Adminauth = require("../../models/Adminauth");

class WebQnaController {
    static list = async (req, res) => {
        try {
        const admin = await Adminauth.find({});
        const qna = await Web_Qna.find({});
        return res.render("admin/web_qna", {
            qna,
            admin,
        });
        } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };

    static get_all_qna = async (req, res) => {
        try {
        const qna = await Web_Qna.find({});
        return res.send({
            qna,
        });
        } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };

    static add = async (req, res) => {
        try {
            const web_qna = new Web_Qna({
            title: req.body.title,
            description: req.body.description,
            question: req.body.question,
            });
            await web_qna.save();
            return res.send({
                message: "Web Qna Added Successfully",
                });
        } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };

    static delete = async (req, res) => {
        try {
        await Web_Qna.findOneAndDelete({
            _id: req.body.id,
        });
        return res.send({
            message: "Web Qna Deleted Successfully",
        });
        }
        catch (error) {
        res.status(500).json({
            message: error.message,
        });
        }
    };
}

module.exports = WebQnaController;