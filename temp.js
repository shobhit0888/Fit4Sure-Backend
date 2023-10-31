// const accountSid = "ACcd02be05ad3b49e27407ac84a181c97e";
// const authToken = "37419abc85f88c70d6a805054cfb4d7c";
// const verifySid = "VA1de4dc8a0847b6b5a90cd114612f743e";
// const client = require("twilio")(accountSid, authToken);
// const twilioPhoneNumber = '+16508177578';
// // Generate a random 6-digit OTP
// function generateOTP() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// const otpStorage = {};


// static SendOTP = async(req, res) => {
//   const { mobileNumber } = req.body;
//   const otp = generateOTP();
//   otpStorage[mobileNumber] = otp;

//    client.messages
//     .create({
//       body: `Your OTP is: ${otp}`,
//       from: twilioPhoneNumber,
//       to: mobileNumber,
//     })
//     .then(() => {
//       res.send('OTP sent successfully.');
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send('Failed to send OTP.');
//     });
// }

// static verifyOTP = async(req, res) => {
//   const { mobileNumber, otp } = req.body;

//   // Check if the OTP exists for the given mobile number
//   if (otpStorage[mobileNumber] === otp) {
//     res.send('OTP is valid.');
//     delete otpStorage[mobileNumber]; // Remove the used OTP from storage
//   } else {
//     res.status(400).send('Invalid OTP.');
//   }
// }

// // client.verify.v2
// //   .services(verifySid)
// //   .verifications.create({ to: "+916265401088", channel: "sms" })
// //   .then((verification) => console.log(verification.status))
// //   .then(() => {
// //     const readline = require("readline").createInterface({
// //       input: process.stdin,
// //       output: process.stdout,
// //     });
// //     readline.question("Please enter the OTP:", (otpCode) => {
// //       client.verify.v2
// //         .services(verifySid)
// //         .verificationChecks.create({ to: "+916265401088", code: otpCode })
// //         .then((verification_check) => console.log(verification_check.status))
// //         .then(() => readline.close());
// //     });
// //   });
// // // E:\fit4sure_backend-main\temp.js
