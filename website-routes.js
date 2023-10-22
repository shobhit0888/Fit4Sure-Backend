const home = require("./routes/website/website");

const WebsiteRoutes = (app) => {
  app.use("/website", home);

};

module.exports = WebsiteRoutes;
