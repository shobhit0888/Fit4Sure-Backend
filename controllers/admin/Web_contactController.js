const Web_Contact = require("../../models/Web_Contact");
const Adminauth = require("../../models/Adminauth");


class Web_contactController {
    static list = async (req, res) => {
        try {
        const web_contact = await Web_Contact.find();
        const admin = await Adminauth.find({});
        return res.render("admin/web_contact", {
            web_contact,
            admin,
        });
        } catch (error) {
        console.log(error);
        return res.send("Something went wrong please try again later");
        }
    };
    
  
    static add = async (req, res) => {
        try {
            const web_contact = new Web_Contact({
                contact_name: req.body.contact_name,
                email: req.body.email,
                country: req.body.country,
                city: req.body.city,
                phone: req.body.phone,
                gender: req.body.gender,
                concern: req.body.concern,
                time: req.body.time,
                created_at: Date.now(),
            });
            await web_contact.save();
            return res.send({
                message: "Contact Added Successfully",
            });
        } catch (error) {
            console.log(error);
            return res.send("Something went wrong please try again later");
        }
    };

    static edit = async (req, res) => {
        try {
            const web_contact = await Web_Contact.findOne({
                _id: req.body.editid,
            });
            await web_contact.updateOneAndUpdate({
                _id : web_contact._id
            },
                { $set: {
                    contact_name: req.body.contact_name,
                    email: req.body.email,
                    country: req.body.country,
                    city: req.body.city,
                    phone: req.body.phone,
                    gender: req.body.gender,
                concern: req.body.concern,
                time: req.body.time,
                    updated_at: Date.now(),
                }});
                return res.send({
                    message: "Contact Updated Successfully",
                });
        } catch (error) {
            console.log(error);
            return res.send("Something went wrong please try again later");
        }
    };

    static delete = async (req, res) => {
        try {
            const web_contact = await Web_Contact.findOne({
                _id: req.body.id,

            });
            await web_contact.remove();
            return res.send({
                message: "Contact Deleted Successfully",
            });
        } catch (error) {
            console.log(error);
            return res.send("Something went wrong please try again later");
        }
    }
}

module.exports = Web_contactController;