const accountSid = "ACcd02be05ad3b49e27407ac84a181c97e";
const authToken = "37419abc85f88c70d6a805054cfb4d7c";
const verifySid = "VA1de4dc8a0847b6b5a90cd114612f743e";
const client = require("twilio")(accountSid, authToken);

client.verify.v2
  .services(verifySid)
  .verifications.create({ to: "+916265401088", channel: "sms" })
  .then((verification) => console.log(verification.status))
  .then(() => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question("Please enter the OTP:", (otpCode) => {
      client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: "+916265401088", code: otpCode })
        .then((verification_check) => console.log(verification_check.status))
        .then(() => readline.close());
    });
  });
// E:\fit4sure_backend-main\temp.js