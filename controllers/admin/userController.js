const User = require("../../models/User");
const Adminauth = require("../../models/Adminauth");
const mongoose = require('mongoose')
require("dotenv");
const firebaseApp = require("../../firebase");

const storage = firebaseApp.storage();

class usersController {
  static list = async (req, res) => {
    try {
      let recordData = await User.find().sort({
        created_at: -1,
      });
      const admin = await Adminauth.find({});
      const usersWithImageURLs = await Promise.all(
        recordData.map(async (user) => {
          const file = storage.bucket().file(user.image);
          const [signedUrl] = await file.getSignedUrl({
            action: 'read',
            expires: '03-01-2500',
          });
          return { ...user.toObject(), image: signedUrl };
        })
      );
      return res.render("admin/user-list", {
        recordData: usersWithImageURLs,
        admin,
      });
    } catch (error) {
      return res
        .status(500)
        .send("An error occurred: " + error.message);
    }
  };
  static Approved = async (req, res) => {
    try {
      const data = req.body;

      await User.findByIdAndUpdate(data.id, {
        approved: data.approved,
      });
      ({
        type: "form_status",
        data: {
          id: User.id,
          status: data.approved ? "approved" : "disapproved",
          time: Date.now(),
        },
      });
      return res.send({
        error: false,
        message: "User status updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static userDetails = async (req, res) => {
    const userId = req.params.userId
    const aggregation = [
      {
        '$match': {
          '_id': mongoose.Types.ObjectId(userId)
        }
      }, {
        '$lookup': {
          'from': 'orders',
          'let': {
            'userId': '$_id'
          },
          'pipeline': [
            {
              '$match': {
                '$expr': {
                  '$and': [
                    {
                      '$eq': [
                        '$user_id', '$$userId'
                      ]
                    }
                  ]
                }
              }
            }, {
              '$lookup': {
                'from': 'subscriptions',
                'localField': 'subscription_plan_id',
                'foreignField': '_id',
                'as': 'subscription'
              }
            }, {
              '$lookup': {
                'from': 'trainers',
                'localField': 'trainer_id',
                'foreignField': '_id',
                'as': 'trainer'
              }
            }, {
              '$unwind': {
                'path': '$trainer',
                'preserveNullAndEmptyArrays': true
              }
            }, {
              '$unwind': {
                'path': '$subscription',
                'preserveNullAndEmptyArrays': true
              }
            }
          ],
          'as': 'payments'
        }
      }, {
        '$lookup': {
          'from': 'classes',
          'let': {
            'userId': '$_id'
          },
          'pipeline': [
            {
              '$match': {
                '$expr': {
                  '$and': [
                    {
                      '$eq': [
                        '$user_id', '$$userId'
                      ]
                    }
                  ]
                }
              }
            }, {
              '$lookup': {
                'from': 'trainers',
                'localField': 'trainer_id',
                'foreignField': '_id',
                'as': 'trainer'
              }
            }, {
              '$unwind': {
                'path': '$trainer',
                'preserveNullAndEmptyArrays': true
              }
            }
          ],
          'as': 'schedules'
        }
      }
    ]
    try {
      const userDetails = await User.aggregate(aggregation);
      const admin = await Adminauth.find({});
      if (userDetails != null && userDetails.length > 0) {
        return res.render("admin/user-details", {
          userDetails: userDetails[0],
          admin,
        });
      }
      else {
        return res
          .status(404)
          .send("No user found with given id please check id.");
      }
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .send("Error genrated while fetching user details.");
    }
  }
}

module.exports = usersController;
