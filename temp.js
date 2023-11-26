// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = "ACcd02be05ad3b49e27407ac84a181c97e";
const authToken = "37419abc85f88c70d6a805054cfb4d7c";
const verifySid = "VA1de4dc8a0847b6b5a90cd114612f743e";
const client = require("twilio")(accountSid, authToken);

client.verify.v2
  .services(verifySid)
  .verifications.create({ body:"Hello World",to: "+919696660547", channel: "sms" })
  .then((verification) => console.log(verification.status))
  .then(() => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question("Please enter the OTP:", (otpCode) => {
      client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: "+919696660547", code: otpCode })
        .then((verification_check) => console.log(verification_check.status))
        .then(() => readline.close());
});
});
// const otp = '155574'; // Replace this with your dynamically generated OTP

// const message = `Your OTP for Fit4sure login is: ${otp}`;
// client.verify.services(verifySid)
//   .verifications.create({ to: '+919696660547', channel: 'sms', body: message })
//   .then((verification) => {
//     console.log(verification.status);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
client.messages
  .create({
    body: "Hello from Node",
    from: "+16508177578",
    to: "+916265401088",
  })
  .then((message) => console.log(message.sid));

// client.verify.v2
//   .services(verifySid)
//   .verifications.create({
//     body: 'Your Otp for Fit4sure login is : 155574',
//     to: '+919696660547',
//     channel: 'sms',
//   })
//   .then((verification) => console.log(verification.status))
//   .then(() => {
//     const readline = require('readline').createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//   });