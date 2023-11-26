// const express = require("express");
// var { rainbow } = require("handy-log");
// require("dotenv").config();
// const mongoose = require("mongoose");
// const cors = require("cors");
// const AdminRoutes = require("./admin-routes");
// const AppRoutes = require("./app-routes");
// const bodyParser = require("body-parser");
// const createAdmin = require("./config/createAdmin");
// const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);

// const WebsiteRoutes = require("./website-routes");

// // create admin
// const result = createAdmin();
// if (!result) {
//   print("admin creation failed");
//   process.exit();
// }

// //express and env config
// const app = express(),
//   {
//     env: { DB_CONNECT, PORT },
//   } = process;

// // set the view engine to ejs
// app.set("view engine", "ejs");

// const corsOption = {
//   credentials: true,
//   origin: ["http://localhost:3000"],
// };
// app.use(cors(corsOption));

// // public directory
// app.use(express.static(__dirname + "/public"));

// //mongodb connection
// // mongoose.conmect = mongoose.connect(DB_CONNECT);
// mongoose.connect(DB_CONNECT, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });
// mongoose.connection.on("connected", () => {
//   console.log("Connected to mongo instance");
// });
// mongoose.connection.on("error", (err) => {
//   console.error("Error connecting to mongo", err);
// });

// sessionStore = new MongoStore({
//   url: DB_CONNECT,
// });

// // Use the session middleware
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: sessionStore,
//     cookie: {
//       maxAge: 14 * 24 * 60 * 60, // = 14 days. Default
//     },
//   })
// );

// //middleware
// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

// //routes
// AdminRoutes(app);
// AppRoutes(app);
// WebsiteRoutes(app);

// module.exports = app;

const express = require("express");
const app = express();
var { rainbow } = require("handy-log");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const AdminRoutes = require("./admin-routes");
const AppRoutes = require("./app-routes");
const bodyParser = require("body-parser");
const createAdmin = require("./config/createAdmin");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const DB_CONNECT = process.env.DB_CONNECT;
const database = require("./database");
// const io = require("socket.io")(index);

const WebsiteRoutes = require("./website-routes");

// create admin
const result = createAdmin();
if (!result) {
  print("admin creation failed");
  process.exit();
}

//express and env config
// const app = express()
// {
//   env: { DB_CONNECT, PORT }
// } = process;

// set the view engine to ejs
app.set("view engine", "ejs");

const corsOption = {
  credentials: true,
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOption));

// public directory
app.use(express.static(__dirname + "/public"));

//mongodb connection
// mongoose
//   .connect(DB_CONNECT, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//   })
//   .then((data) => {
//     console.log("Connected to mongo instance");
//   })
//   .catch((e) => {
//     console.log("err");
//   });
// mongoose.connection.on("connected", () => {
//   console.log("Connected to mongo instance");
//   })
//   .catch((e) => {
//     console.log("err");
//   });
// mongoose.connection.on("connected", () => {
//   console.log("Connected to mongo instance");
// });
// mongoose.connection.on("error", (err) => {
//   console.error("Error connecting to mongo", err);
// });

sessionStore = new MongoStore({
  url: DB_CONNECT,
});

// Use the session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 14 * 24 * 60 * 60, // = 14 days. Default
    },
  })
  );
  console.log("hi there");
  //middleware
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  
  //routes
  AdminRoutes(app);
  AppRoutes(app);
  WebsiteRoutes(app);
  
  // const DB_CONNECT = process.env.DB_CONNECT;
  
  const PORT = process.env.PORT || 3000;
// io.on("connection", (socket) => {
//   console.log("socket connected");
//   socket.on("disconnect", function () {
//     console.log("socket  disconnect!");
//   });
//   app.socket = socket;
// });
// app.listen(PORT, () => {
//   // setTimeout(printURL, 50);
//   rainbow(App running on port ${PORT} ..);
// });

const con = database();
con
  .then((message) => {
    console.log(message);
    app.listen(process.env.PORT, () => {
      console.log('Server is running on port: ' + process.env.PORT);
    });
  })
  .catch((message) => {
    console.log(message);
  });
module.exports = app;  