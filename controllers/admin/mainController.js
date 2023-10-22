const Notifications = require("../../models/PushNotifications");
const Adminauth = require("../../models/Adminauth");
const multer = require("multer");
const path = require("path");
const root = process.cwd();
const fs = require("fs");
const OneSignal = require("onesignal-node");
const AppId = "d2a48840-a906-4a6a-be40-9edc181259c9";
const ApiKey = "ZmJjMjFkZDktMDU5Zi00YmI1LWI3NDYtNmY0YmVkYzQ5ZWZi";
const client = new OneSignal.Client(AppId, ApiKey);

//Image Storage
const baseURL = process.env.URL;
const notificationsUrl = baseURL + "public/uploads/notifications/";
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(root + "/public/uploads/notifications/"));
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

//@Check Images Filter
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}
//@Upload images
const upload = multer({
  storage,
  // fileFilter: function (req, file, cb) {
  //   checkFileType(file, cb);
  //},
}).fields([
  {
    name: "image",
    maxCount: 1,
  },
]);

class MainController {
  static main = async (req, res) => {
    return res.redirect("/admin/dashboard");
  };
  static notification_list = async (req, res) => {
    try {
      let records = await Notifications.find({}).sort({
        created_at: -1,
      });
      const admin = await Adminauth.find({});
      return res.render("admin/notification_list", {
        records,
        admin,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static notification_add = async (req, res) => {
    try {
      upload(req, res, async function (err) {
        if (req.body.title == "") {
          return res.send("title is required");
        }
        if (req.body.description == "") {
          return res.send("description is required");
        }
        let saveData = {
          title: req.body.title,
          description: req.body.description,
          url: req.body.url,
          time: req.body.time,
          selectedOption: req.body.selectedOption,
        };
        if (req.files.image) {
          saveData.image = req.files.image[0].filename;
        }
        const category = Notifications(saveData);
        await category.save();
        const notification = {
          contents: {
            en: req.body.title,
          },
          included_segments: ["Subscribed Users"],
          // filters: [
          //   { field: 'tag', key: 'level', relation: '>', value: 10 }
          // ]
        };
        if (req.files.image) {
          notification.big_picture = notificationsUrl + saveData.image;
        }
        if (req.body.url) {
          notification.url = saveData.url;
        }
        if (req.body.time) {
          notification.delivery_time_of_day = saveData.time;
        }
        // using async/await
        try {
          const response = await client.createNotification(notification);
          // console.log(response.body);
          let resp = {
            error: false,
            message: "Notification added successfully",
          };
          return res.send(resp);
        } catch (e) {
          console.log("err", e);
          if (e instanceof OneSignal.HTTPError) {
            // When status code of HTTP response is not 2xx, HTTPError is thrown.
            console.log(e.statusCode);
            console.log(e.body);
          }
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };
}

module.exports = MainController;
