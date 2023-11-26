const Web_Testimonials = require('../../models/Web_Testimonials');
const Adminauth = require('../../models/Adminauth');
const multer = require("multer");
const path = require("path");
const root = process.cwd();
const imageFilter = require("../../config/imageFilter");
const fs = require("fs");
const moment = require("moment");

class Web_TestimonialsController {
    static list = async (req, res) => {
        try {
            let web_testimonials = await Web_Testimonials.findOne()
            const admin = await Adminauth.find({});

            return res.render('admin/web_testimonials', {
                title: web_testimonials ? web_testimonials.title : '',
                sub_title: web_testimonials ? web_testimonials.sub_title : '',
                description: web_testimonials ? web_testimonials.description : '',
                image: web_testimonials ? web_testimonials.image : '',
                link : web_testimonials ? web_testimonials.link : '',
                admin,
            });
        } catch (error) {
            return res.send('Something went wrong please try again later');
        }
    };

    static add = async (req, res) => {
        try {
            const web_testimonial = await Web_Testimonials.findOne()
            if (web_testimonial) {
                upload(req, res, async function (err) {
                    await Web_Testimonials.findOneAndUpdate({},
                        {
                            title: req.body.title,
                            sub_title: req.body.sub_title,
                            description: req.body.description,
                            image: req.file.filename,
                            link: req.body.link,
                            updated_at: Date.now(),
                        } );
                    return res.send({
                        error: false,
                        message: 'Web Testimonial added successfully',
                    });
                });
            } else {
                upload(req, res, async function (err) {
                   
                    const web_testimonial = Web_Testimonials({
                        title: req.body.title,
                        sub_title: req.body.sub_title,
                        description: req.body.description,
                        link: req.body.link,
                        image: req.file.filename,
                    });
                    await web_testimonial.save();
                    return res.send({
                        error: false,
                        message: 'Web Testimonial added successfully',
                    });
                });

            }
        } catch (error) {
            console.log(error);
            return res.send('Somthing went wrong please try again later');
        }
    };
            
    static delete = async (req, res) => {
        try {
            const web_testimonial = await Web_Testimonials.findOne({
                _id: req.body.id,
            });
            if (!web_testimonial) {
                return res.send({
                    error: true,
                    message: 'Web Testimonial not found',
                });
            }
           
            fs.unlinkSync(root + "/public/uploads/web_testimonials/" + web_testimonial.image);
            await Web_Testimonials.deleteOne({
                _id: req.body.id,
            });
            return res.send({
                error: false,
                message: 'Web Testimonial deleted successfully',
            });
        } catch (error) {
            return res.send('Something went wrong please try again later');
        }
    }
}

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: path.join(root, "/public/uploads/web_testimonials/"),
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}.jpg`);
    },
  });
  
  // Init Upload
  const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 5000000
    // },
    fileFilter: imageFilter,
  }).single("image");



module.exports = Web_TestimonialsController;