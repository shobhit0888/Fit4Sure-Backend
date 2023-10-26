const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const Otp = require("../../models/Otp");
const User = require("../../models/User");
const Trainer = require("../../models/Trainer");
const Coupon = require("../../models/Coupon");
const Notification = require("../../models/Notification");
require("dotenv").config();
const moment = require("moment");
const multer = require("multer");
const imageFilter = require("../../config/imageFilter");
const firebaseApp = require("../../firebase");
const root = process.cwd();
const path = require("path");
const fs = require("fs");
const sendEmail = require("../../config/mailer");
const bcrpyt = require("bcrypt");
const twilioPhoneNumber = "+16508177578";
const accountSid = "ACcd02be05ad3b49e27407ac84a181c97e";
const authToken = "37419abc85f88c70d6a805054cfb4d7c";
const verifySid = "VA1de4dc8a0847b6b5a90cd114612f743e";
const otpStorage = {};
// Set The Storage Engine
// const storage = multer.diskStorage({
//   destination: path.join(root, "/public/uploads/profile"),
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}.jpg`);
//   },
// });

// Init Upload
// const upload = multer({
//   storage: storage,

//   // fileFilter: imageFilter,
// }).single("image");

const bucket = firebaseApp.storage().bucket();

const generateUniqueFileName = (fileName) => {
  const uniqueId = Date.now().toString();
  const fileExtension = fileName.split(".").pop();
  return `${uniqueId}.${fileExtension}`;
};

const uploadImageToFirebase = async (imageFile) => {
  try {
    const fileName = generateUniqueFileName(imageFile.originalname);
    const filePath = `users/${fileName}`;
    const file = bucket.file(filePath);

    // Create a write stream to upload the image file
    const writeStream = file.createWriteStream({
      metadata: {
        contentType: imageFile.mimetype,
      },
    });

    // Pipe the image file to the write stream
    writeStream.end(imageFile.buffer);

    // Handle the completion of the upload
    return new Promise((resolve, reject) => {
      writeStream.on("finish", () => {
        resolve(filePath);
      });

      writeStream.on("error", (error) => {
        reject(error);
      });
    });
  } catch (error) {
    throw new Error("Error uploading image to Firebase Storage");
  }
};

class AuthController {
  static trainer_signin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const existingUser = await Trainer.findOne({ email });

      if (!existingUser)
        return res.status(404).json({ message: "Trainer does not exist" });

      const isPasswordCorrect = await bcrpyt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordCorrect)
        return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        process.env.TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ result: existingUser, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  static signin = async (req, res) => {
    const { email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });

      if (!existingUser)
        return res.status(404).json({ message: "User does not exist" });

      const isPasswordCorrect = await bcrpyt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordCorrect)
        return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        process.env.TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ result: existingUser, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  static signup = async (req, res) => {
    console.log(req.body);
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      contactNumber,
    } = req.body;
    // user.contactNumber = contactNumber;
    try {
      const existingUser = await User.findOne({ email });
      const existingno = await User.findOne({ contactNumber });
      console.log(existingno);
      if (existingUser)
        return res.status(400).json({ message: "User already exists" });
      if (existingno)
        return res
          .status(400)
          .json({ message: "Contact number already exists" });
      if (password !== confirmPassword)
        return res.status(400).json({ message: "Passwords don't match" });

      const hashedPassword = await bcrpyt.hash(password, 12);

      const result = await User.create({
        email,
        contactNumber,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
      });

      const token = jwt.sign(
        {
          email: result.email,
          id: result._id,
          contactNumber: result.contactNumber,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      const options = {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      //save in cookie
      res.status(200).cookie("token", token, options).json({
        result,
      });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  static googleAuthCallback = async (req, res) => {
    const { credential } = req.body;

    try {
      // Extract relevant user data from the Google authentication response
      const { email, name, picture } = credential;

      // Check if the user already exists in the database based on the email
      let user = await User.findOne({ email });

      // If the user doesn't exist, create a new user in the database
      if (!user) {
        const hashedPassword = await bcrpyt.hash("", 12); // Set an empty password for Google-authenticated users

        user = await User.create({
          email,
          password: hashedPassword,
          name,
          image: picture,
        });
      }

      // Generate a token for the user
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      // Return the user data and token to the frontend
      res.status(200).json({ result: user, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  static userProfile = async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) return res.status(401).send("User not found");

      const isGoogleImage = user.image && user.image.startsWith("https://");

      if (!isGoogleImage && user.image) {
        const file = bucket.file(user.image);
        const [signedUrl] = await file.getSignedUrl({
          action: "read",
          expires: "03-01-2500",
        });
        user.image = signedUrl;
      }

      return res.send(user);
    } catch (error) {
      console.log(error);
      return res.status(401).send("Something went wrong");
    }
  };

  static forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
    } catch (error) {
      console.log(error);
      return res.status(401).send("Something went wrong");
    }
  };

  static changePassword = async (req, res) => {
    try {
      const { oldPassword, newPassword, confirmNewPassword } = req.body;
      const userId = req.userId;

      if (!oldPassword || !newPassword || !confirmNewPassword) {
        return res.status(400).send("All fields are required");
      }

      if (newPassword !== confirmNewPassword) {
        return res
          .status(400)
          .send("New password and confirm password don't match");
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }

      const passwordMatch = await bcrpyt.compare(oldPassword, user.password);
      if (!passwordMatch) {
        return res.status(401).send("Invalid old password");
      }

      const hashedPassword = await bcrpyt.hash(newPassword, 12);

      user.password = hashedPassword;
      await user.save();

      res.status(200).send("Password changed successfully");
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrong");
    }
  };

  static editUserProfile = async (req, res) => {
    try {
      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          console.log(err);
          return res.status(500).send(err);
        } else if (err) {
          console.log(err);
          return res.status(500).send(err);
        }

        const { name, email, contactNumber, dateOfBirth, stateOfResidence } =
          req.body;
        const userId = req.params.userId;

        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).send("User not found");
        }

        user.name = name;
        user.email = email;
        user.contactNumber = contactNumber;
        user.dateOfBirth = dateOfBirth;
        user.stateOfResidence = stateOfResidence;

        if (req.file) {
          if (user.image && user.image.includes("googleusercontent.com")) {
          } else if (user.image) {
            const existingFilePath = user.image;
            const existingFile = bucket.file(existingFilePath);
            await existingFile.delete();
          }

          const imageUrl = await uploadImageToFirebase(req.file);
          user.image = imageUrl;
        }

        await user.save();

        return res.status(200).json({
          message: "User profile updated successfully",
          user: user,
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(401).send("Something went wrong");
    }
  };

  // static login = async (req, res) => {
  //   const mobile_number = req.body.mobile_number;
  //   const msg = "Something went wrong. Please try again later";

  //   try {
  //     // Validate the mobile number format
  //     // const mobile_regex = /^\d{10}$/;
  //     // if (!mobile_regex.test(mobile_number)) {
  //     //   return res.status(400).send("Invalid Mobile Number");
  //     // }
  //     console.log(mobile_number);
  //     // Check if the user with the given mobile number exists
  //     let user = await User.findOne({ mobile_number });

  //     if (!user) {
  //       // If the user doesn't exist, create a new user
  //       user = new User({
  //         mobile_number,
  //       });
  //       user = await user.save();
  //     }

  //     let newOtp = otpGenerator.generate(4, {
  //       alphabets: false,
  //       upperCase: false,
  //       specialChars: false,
  //     });

  //     // Hardcoded OTP for testing purposes (should be removed in production)
  //     if (mobile_number === "8952829519") {
  //       newOtp = "1234";
  //     }

  //     // Send the OTP to the user's mobile number
  //     // sendSMS(user.mobile_number, newOtp);

  //     // Check if an OTP record already exists for the user
  //     const otpExist = await Otp.findOne({ user });

  //     if (otpExist) {
  //       // If an OTP record exists, update it
  //       await Otp.findByIdAndUpdate(otpExist._id, {
  //         otp: newOtp,
  //         updated_at: Date.now(),
  //       });
  //     } else {
  //       // If no OTP record exists, create a new one
  //       const otp = new Otp({
  //         user,
  //         otp: newOtp,
  //         created_at: Date.now(),
  //         updated_at: Date.now(),
  //       });
  //       await otp.save();
  //     }

  //     return res.send("OTP Sent Successfully");
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(401).send(msg);
  //   }
  // };
  // static login = async (req, res) => {
  //   const mobile_number = req.body.mobile_number;
  //   let msg = "Something went wrong please try again later";
  //   var mobile_regex = /^\d{10}$/;
  //   if (!mobile_regex.test(mobile_number)) {
  //     return res.status(401).send("Invalid Mobile Number");
  //   }
  //   try {
  //     let user = await User.findOne({ mobile_number });
  //     if (!user) {
  //       user = User({
  //         mobile_number,
  //       });
  //       user = await user.save();
  //     }
  //     // let newOtp = await otpGenerator.generate(4, {
  //     //   alphabets: false,
  //     //   upperCase: false,
  //     //   specialChars: false,
  //     // });
  //     // if (mobile_number == "8952829519") {
  //     //   newOtp = 1234;
  //     // }
  //     //newOtp = 1234;
  //     let customerMobile = user.mobile_number;
  //     // sendSMS(customerMobile, newOtp);
  //     // const otpExist = await Otp.findOne({
  //     //   user,
  //     // });
  //     // if (otpExist) {
  //     //   await Otp.findOneAndUpdate(
  //     //     {
  //     //       _id: otpExist._id,
  //     //     },
  //     //     {
  //     //       otp: newOtp,
  //     //       update_at: Date.now(),
  //     //     }
  //     //   );
  //     // }
  //     // else {
  //     //   const otp = Otp({
  //     //     user,
  //     //     otp: newOtp,
  //     //     created_at: Date.now(),
  //     //     update_at: Date.now(),
  //     //   });
  //     //   await otp.save();
  //     // }
  //     return res.send("Otp Sent Successfully");
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(401).send(msg);
  //   }
  // };
  static sendOTP = async (req, res) => {
    const mobile_number = req.body.contactNumber;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    //   const otpStorage = {};
    otpStorage[mobile_number] = otp;
    console.log(otpStorage[mobile_number]);
    try {
      const client = require("twilio")(accountSid, authToken);
      client.messages
        .create({
          body: `Your OTP is: ${otp}`,
          from: twilioPhoneNumber,
          to: mobile_number,
        })
        .then(() => {
          res.json({success:true}).send("OTP sent successfully.");
        });
    } catch (err) {
      console.log(err);
      return res.send(err);
    }
  };

  static login = async (req, res) => {
    const mobile_number = req.body.contactNumber;
    const otp = req.body.otp;

    try {
      const user = await User.findOne({ contactNumber: mobile_number });
      if (user == null) {
        console.log("register yourself");
        return res.status(404).json({ message: "User not found" });
      }

      if (otpStorage[mobile_number] !== otp) {
        console.log("dada2");
        return res.status(401).json({ message: "Invalid OTP" });
      }

      const expiresIn = Math.floor(Date.now() / 1000) + 315360000;
      const token = jwt.sign(
        {
          id: user._id,
          contactNumber: mobile_number,
        },
        process.env.TOKEN_SECRET,
        { expiresIn }
      );

      const options = {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.status(200).cookie("token", token, options).json({
        result: user,
        token,
      });
      console.log("ho gya bhai");
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // static login = async (req, res) => {
  //   const mobile_number = req.body.contactNumber;
  //   console.log(mobile_number);
  //   let msg = "Something went wrong please try again later";
  //   const otp = Math.floor(100000 + Math.random() * 900000).toString();
  //   const otpStorage = {};
  //   otpStorage[mobile_number] = otp;
  //   //  }
  //   try {
  // let user = await User.findOne({ contactNumber: mobile_number });
  // if (user == null) {
  //   console.log("register yourself");
  // }
  // // if (user.contactNumber == null) {
  // //   res.send("update yourself");
  // // }
  //     const client = require("twilio")(accountSid, authToken);
  //     client.messages
  //       .create({
  //         body: `Your OTP is: ${otp}`,
  //         from: twilioPhoneNumber,
  //         to: mobile_Number,
  //       })
  //       .then(() => {
  //         res.send("OTP sent successfully.");
  //       });

  //     if (req.body.otp === otpStorage[mobile_number]) {
  //       const expiresIn = Math.floor(Date.now() / 1000) + 315360000;
  //       const token = jwt.sign(
  //         {
  //           id: user._id,
  //           contactNumber: mobile_number,
  //         },
  //         process.env.TOKEN_SECRET,
  //         { expiresIn } // Set expiresIn to a string like 'never'
  //       );
  //       const options = {
  //         expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  //         httpOnly: true,
  //       };
  //       //save in cookie
  //       res.status(200).cookie("token", token, options).json({
  //         result: user,
  //       });
  //     }

  // client.verify.v2
  //   .services(verifySid)
  //   .verifications.create({ to: user.contactNumber, channel: "sms" })
  //   .then((verification) => console.log(verification.status))
  //   .then(() => {
  //     const readline = require("readline").createInterface({
  //       input: process.stdin,
  //       output: process.stdout,
  //     });
  // readline.question("Please enter the OTP:", (otpCode) => {
  //   client.verify.v2
  //     .services(verifySid)
  //     .verificationChecks.create({
  //       to: user.contactNumber,
  //       code: otpCode,
  //     })
  //         .then((verification_check) => {
  //           console.log(verification_check.status);
  //           if (verification_check.status == "pending") {
  //             console.log("Invalid OTP");
  //           } else {
  //             const expiresIn = Math.floor(Date.now() / 1000) + 315360000;
  //             const token = jwt.sign(
  //               {
  //                 id: user._id,
  //                 contactNumber: mobile_number,
  //               },
  //               process.env.TOKEN_SECRET,
  //               { expiresIn } // Set expiresIn to a string like 'never'
  //             );
  //             const options = {
  //               expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  //               httpOnly: true,
  //             };
  //             //save in cookie
  //             res.status(200).cookie("token", token, options).json({
  //               result: user,
  //             });
  //           }
  //         })
  //         .then(() => readline.close());
  //     });
  //   });
  //   } catch (err) {
  //     console.log(err);
  //     res.send(err);
  //   }
  // };

  // static otp_verify = async (req, res) => {
  //   let msg = "Something went wrong please try again later";
  //   try {
  //     const { mobileNumber, otp } = req.body;

  //     // Check if the OTP exists for the given mobile number
  //     if (otpStorage[mobileNumber] === otp) {
  //       res.send("OTP is valid.");
  //       delete otpStorage[mobileNumber]; // Remove the used OTP from storage
  //     } else {
  //       res.status(400).send("Invalid OTP.");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(401).send(msg);
  //   }
  // };

  // static sendOTP = async (req, res) => {
  //   let msg = "Something went wrong please try again later";
  //   try {
  //     const { mobileNumber } = req.body;
  // const otp = generateOTP();
  // otpStorage[mobileNumber] = otp;

  //  client.messages
  //   .create({
  //     body: `Your OTP is: ${otp}`,
  //     from: twilioPhoneNumber,
  //     to: mobileNumber,
  //   })
  //   .then(() => {
  //     res.send('OTP sent successfully.');
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     res.status(500).send('Failed to send OTP.');
  //   });
  // }

  static findmycoach = async (req, res) => {
    let msg = "Something went wrong please try again later";
    try {
      var gender = req.body.gender;
      var language = req.body.language;
      var category = req.body.category;
      const coach = await Trainer.find({
        $and: [
          { gender: gender },
          { language: language },
          { category: category },
        ],
      });
      if (coach)
        return res.json({
          message: "coach found successfully",
          success: true,
          data: coach,
        });
    } catch (err) {
      console.log(error);
      return res.status(401).send(msg);
    }
  };

  static register = async (req, res) => {
    let msg = "Something went wrong please try again later";
    try {
      var token = req.body.token;
      var registerData = req.body.registerData;
      registerData = JSON.parse(registerData);
      const payload = jwt.decode(token, process.env.TOKEN_SECRET);
      const user = await User.findById(payload._id);
      if (!user) return res.status(401).send("User not found");
      await User.findByIdAndUpdate(user._id, registerData);
      let returnObj = {
        message: "Success",
        statusCode: 200,
      };
      // sending notification start
      const notification = Notification({
        user: req.id,
        type: "User Registered",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("User Registered");
      // sending notification end
      // await sendEmail(
      //   registerData.email,
      //   " Thankyou for registration " + registerData.name
      // );
      res.send(returnObj);
    } catch (error) {
      console.log(error);
      return res.status(401).send(msg);
    }
  };

  static editProfile = async (req, res) => {
    // try {
    //   upload(req, res, async function (err) {
    //     var token = req.body.token;
    //     const payload = jwt.decode(token, process.env.TOKEN_SECRET);
    //     const user = await User.findById(payload._id);
    //     if (!user) return res.status(401).send("User not found");
    //     const data = req.body;
    //     const profile = await User.findByIdAndUpdate(user._id, {
    //       image: req.file ? req.file.filename : "",
    //       name: data.name,
    //       age: data.age,
    //       gender: data.gender,
    //       height: data.height,
    //       current_weight: data.current_weight,
    //       target_weight: data.target_weight,
    //       lifestyle: data.lifestyle,
    //       medical_condition: data.medical_condition,
    //       weight_goal: data.weight_goal,
    //       city: data.city,
    //       what_brings: data.what_brings,
    //       bio: data.bio,
    //       diet_preference: data.diet_preference,
    //       allergies: data.allergies,
    //       preferred_cuisine: data.preferred_cuisine,
    //     });
    //     await profile.save();
    //     // sending notification start
    //     const notification = Notification({
    //       user: req.id,
    //       type: "Profile Updated",
    //       data: {
    //         time: Date.now(),
    //       },
    //     });
    //     await notification.save();
    //     if (req.app.socket) req.app.socket.emit("Profile Updated");
    //     // sending notification end
    //     return res.send("profile Update successfully");
    //   });
    // } catch (error) {
    //   console.log(error);
    //   return res.status(500).send("Something went wrong");
    // }
  };
  static get_user_profile = async (req, res) => {
    // let msg = "Something went wrong please try again later";
    // try {
    //   var token = req.body.token;
    //   const payload = jwt.decode(token, process.env.TOKEN_SECRET);
    //   const user = await User.findById(payload._id);
    //   if (!user) return res.status(401).send("User not found");
    //   res.send(user);
    // } catch (error) {
    //   console.log(error);
    //   return res.status(401).send(msg);
    // }
  };

  static coupon_verify = async (req, res) => {
    // let msg = "Something went wrong please try again later";
    // try {
    //   var token = req.body.token;
    //   var coupon_code = req.body.coupon_code;
    //   const payload = jwt.decode(token, process.env.TOKEN_SECRET);
    //   const user = await User.findById(payload.id);
    //   if (!user) return res.status(401).send("User not found");
    //   let findData = {
    //     coupon_code: coupon_code,
    //   };
    //   let findRec = await Coupon.findOne(findData);
    //   if (!findRec) return res.status(401).send("Invalid coupon");
    //   if (findRec.is_used == true)
    //     return res.status(401).send("Coupon already used");
    //   let returnObj = {
    //     message: "Coupon Applied",
    //     data: {
    //       coupon_code: coupon_code,
    //       valid_start_date: findRec.valid_start_date,
    //       valid_expiry_date: findRec.valid_expiry_date,
    //     },
    //   };
    //   res.send(returnObj);
    // } catch (error) {
    //   console.log(error);
    //   return res.status(401).send(msg);
    // }
  };
}

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: imageFilter,
}).single("image");

module.exports = AuthController;

function sendSMS(mobileNo, OTP) {
  let theUrl = `http://sms.smsinsta.in/vb/apikey.php?apikey=1158c647754664171463&senderid=SMSINS&templateid=1207162019695960917&route=3&number=${mobileNo}&message=Your OTP is ${OTP}. Regards SMSINSTA`;
  const request = require("request");

  request(theUrl, { json: true }, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    return body;
  });
}
// const accountSid = process.env.accountSid;
// const authToken = process.env.authToken;
// const verifySid = process.env.verifySid;
// const client = require("twilio")(accountSid, authToken);

// client.verify.v2
//   .services(verifySid)
//   .verifications.create({ to: "+919696660547", channel: "sms" })
//   .then((verification) => console.log(verification.status))
//   .then(() => {
//     const readline = require("readline").createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     readline.question("Please enter the OTP:", (otpCode) => {
//       client.verify.v2
//         .services(verifySid)
//         .verificationChecks.create({ to: "+919696660547", code: otpCode })
//         .then((verification_check) => console.log(verification_check.status))
//         .then(() => readline.close());
//     });
//   });
