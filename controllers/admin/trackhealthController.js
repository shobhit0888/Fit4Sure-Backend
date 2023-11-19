// const mongoose = require("mongoose")
// const Healthlog = require("./../../models/Healthlog")
// const trackhealth = require("./../../models/trackhealth")

// class trackhealthController{
//     static add = async(req,res) => {
//         try{
//             const user = req.userId;
//             const temp = [];
//             const data = {
//                 BMI: req.body.BMI,
//                 BMR: req.body.BMR,
//                 BFP: req.body.BFP,
//                 IBW: req.body.IBW,
//                 TDEE: req.body.TDEE,
//                 WHR: req.body.WHR,
//                 ABSI: req.body.ABSI
//             } 
//             temp.push(data);
//             const log = new Healthlog({user:user, record:temp})
//             await log.save()
//              res
//                .status(201)
//                .json({ message: "Health record created successfully", log });
//         }
//         catch(err){console.log(err)}
//     }
// }