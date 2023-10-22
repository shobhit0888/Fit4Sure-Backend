const Schedule = require("../../models/Classes");

class ScheduleController {
  static get_schedule = async (req, res) => {
    try {
      const userId = req.userId;
      const schedule = await Schedule.find({ user_id: userId })
        .populate("trainer_id")

      return res.send({
        schedule,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
}

module.exports = ScheduleController;
