const mongoose = require("mongoose");
const Healthlog = require("./../../models/Healthlog");
const trackhealth = require("./../../models/trackhealth");
const User = require("./../../models/User")
class trackhealthController {
  static add = async (req, res) => {
    try {
      const user = req.userId;
      const temp = [];
      const data = {
        BMI: req.body.BMI,
        BMR: req.body.BMR,
        BFP: req.body.BFP,
        IBW: req.body.IBW,
        TDEE: req.body.TDEE,
        WHR: req.body.WHR,
        ABSI: req.body.ABSI,
      };
      temp.push(data);
    //   console.log(temp)
        // const addlog = await User.findOneAndUpdate(
        //   { _id: user },
        //   { BMI: req.body.BMI },
        //   { BMR: req.body.BMR },
        //   { BFP: req.body.BFP },
        //   { IBW: req.body.IBW },
        //   { TDEE: req.body.TDEE },
        //   { WHR: req.body.WHR },
        //   { ABSI: req.body.ABSI },
        //   {
            // $addToSet: {
            //   record: {
            //     BMI: req.body.BMI,
            //     BMR: req.body.BMR,
            //     BFP: req.body.BFP,
            //     IBW: req.body.IBW,
            //     TDEE: req.body.TDEE,
            //     WHR: req.body.WHR,
            //     ABSI: req.body.ABSI,
            //   },
        //     },
        //   },
        //   { new: true }
        // );
        const addlog = await User.findByIdAndUpdate(user, {$addToSet: {
              record: [{
                BMI: req.body.BMI,
                BMR: req.body.BMR,
                BFP: req.body.BFP,
                IBW: req.body.IBW,
                TDEE: req.body.TDEE,
                WHR: req.body.WHR,
                ABSI: req.body.ABSI
              }]}}, {new: true})
        console.log(addlog)
      res
        .status(201)
        .json({ message: "Health record created successfully", addlog });
    } catch (err) {
      console.log(err);
    }
  };
}
module.exports = trackhealthController;