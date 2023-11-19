const User = require("./../../models/User")
const mongoose = require("mongoose")

class PlanController{
    static selectPlan = async(req,res) => {
        try{
            const user = req.userId
            const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
            const duration = req.body.duration;
            const currdate = Date.now()
            const trainer = req.body.trainer;
            const tempDate = new Date(currdate + duration*oneDayInMilliseconds);
            const endDate = tempDate.toISOString();
            const data = {
                 plan: req.body.plan,
                 duration: req.body.duration,
                 endDate: endDate,
                 trainer: trainer
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