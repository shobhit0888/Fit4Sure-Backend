const Setting_Footer = require("../../models/Setting_Footer");
const Adminauth = require("../../models/Adminauth");

class SettingFooterController {
    static list = async (req, res) => {
        try {
        const settingFooter = await Setting_Footer.findOne();
        const admin = await Adminauth.find({});
        return res.render("admin/settingFooter", {
            admin,
            playstore_link: settingFooter ? settingFooter.playstore_link : "",
            appstore_link: settingFooter ? settingFooter.appstore_link : "",
            youtube_link: settingFooter ? settingFooter.youtube_link : "",
            instagram_link: settingFooter ? settingFooter.instagram_link : "",
            twitter_link: settingFooter ? settingFooter.twitter_link : "",
            facebook_link: settingFooter ? settingFooter.facebook_link : "",
            description: settingFooter ? settingFooter.description : "",
            
        });
        } catch (error) {
        console.log(error);
        return res.send("Something went wrong please try again later");
        }
    };

    static get_Footer = async (req, res) => {
        try {
        const footer = await Setting_Footer.findOne();
        return res.send({
            footer,
        });
        } catch (error) {
        console.log(error);
        return res.send("Something went wrong please try again later");
        }
    };
    
  
    static add = async (req, res) => {
        try {

            const settingFooter = await Setting_Footer.findOne();

            if(settingFooter){

                await Setting_Footer.findOneAndUpdate({},
                    { $set: {
                        playstore_link: req.body.playstore_link,
                        appstore_link: req.body.appstore_link,
                        youtube_link: req.body.youtube_link,
                        instagram_link: req.body.instagram_link,
                        twitter_link: req.body.twitter_link,
                        facebook_link: req.body.facebook_link,
                        description: req.body.description,
                        updated_at: Date.now(),
                    }});
                    return res.send({
                        message: "Footer Updated Successfully",
                    }); 
            }
            else{
                   
                const settingFooter = new Setting_Footer({
                    playstore_link: req.body.playstore_link,
                    appstore_link: req.body.appstore_link,
                    youtube_link: req.body.youtube_link,
                    instagram_link: req.body.instagram_link,
                    twitter_link: req.body.twitter_link,
                    facebook_link: req.body.facebook_link,
                    description: req.body.description,
                    created_at: Date.now(),
                });
                await settingFooter.save();
                return res.send({
                    message: "Footer Added Successfully",
                });
            }

        } catch (error) {
        console.log(error);
        return res.send("Something went wrong please try again later");
        }
    };
    static delete = async (req, res) => {
        try {
            console.log("hello")
            const setting_footer = await Setting_Footer.findOne({
                    _id: req.body.id,
                  });
                  await Setting_Footer.deleteOne({
                    _id: setting_footer.id,
                  });    
        return res.send({
            message: "Footer Deleted Successfully",
        });
        } catch (error) {
        console.log(error);
        return res.send("Something went wrong please try again later");
        }
    }
}

module.exports = SettingFooterController;
    
            