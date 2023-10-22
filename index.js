// const app = require("./app");
// const http = require("http");
// const index = http.createServer(app);
// const io = require("socket.io")(index);
// const { rainbow } = require("handy-log");
// // dotenv.config({ path: '.env' });
// require("dotenv").config();
// // const DB_CONNECT =
// //   "mongodb+srv://Dhruv:hihello1@cluster0.toxaco6.mongodb.net/?retryWrites=true&w=majority";
// const DB_CONNECT = process.env.DB_CONNECT;



// const PORT = process.env.PORT||3000;
// app.listen(PORT, () => {
//   // setTimeout(printURL, 50);
//   rainbow(`App running on port ${PORT} ..`);
// });
// io.on("connection", (socket) => {
//   console.log("socket connected");
//   socket.on("disconnect", function () {
//     console.log("socket  disconnect!");
//   });
//   app.socket = socket;
// });

// // Listening to PORT 3000


// const printURL = () => {
//   console.log("\x1b[36m%s\x1b[0m", `url: http://localhost:${PORT}`);
// };
