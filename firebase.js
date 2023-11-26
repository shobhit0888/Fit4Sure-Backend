const admin = require("firebase-admin");
const serviceAccount = require("./fit4sure-a1bf3-firebase-adminsdk-paul1-82c4340ab6.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "fit4sure-a1bf3.appspot.com",
});

const firebaseApp = admin.app();

module.exports = firebaseApp;