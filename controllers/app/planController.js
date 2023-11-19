const User = require("./../../models/User")
const mongoose = require("mongoose")

class PlanController{
    static selectPlan = async(req,res) => {
        try{
            const user = req.userId
            
            const data = {
                 plan: req.body.plan
            }

            const selectedPlan = await User.findByIdAndUpdate(
              user,
              {
                $push: { optedplan: data },
              },
              { new: true, useFindAndModify: false }
            );

            res.json({message: "plan selected", selectedPlan})
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = PlanController;