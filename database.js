const mongoose = require("mongoose");

const Database = () => {
  return new Promise(async (resolve, reject) => {
    //  dbUrl = "mongodb+srv://Shobhit:sho@123@cluster0.toxaco6.mongodb.net/?retryWrites=true&w=majority";
    await mongoose
      .connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((data) => {
        resolve("Database connnected successfully");
      })
      .catch((e) => {
        reject(e);
      });
  });
};

module.exports = Database;