const home = require("./routes/app/home");
const apiRoutes = require("./routes/app/apiRoutes");
const auth = require("./routes/app/auth");
const post = require("./routes/app/post");
const shortVideo = require("./routes/app/shortVideo");
const payment = require("./routes/app/payment");
const notification = require("./routes/app/notification");
const userContactInfo = require("./routes/app/userContactInfo");
const test = require("./routes/app/test");
const schedule = require("./routes/app/schedule");
const trackhealth = require("./routes/app/trackhealth")

const AppRoutes = (app) => {
  app.use("/app", home);
  app.use("/app/user", auth);
  app.use("/app", apiRoutes);
  app.use("/app/post", post);
  app.use("/app/shortvideo", shortVideo);
  app.use("/app/payment", payment);
  app.use("/app/notification", notification);
  app.use("/app/usercontactinfo", userContactInfo);
  app.use("/app/test", test);
  app.use("/app/schedule", schedule);
  app.use("/app/trackhealth", trackhealth);

};

module.exports = AppRoutes;
