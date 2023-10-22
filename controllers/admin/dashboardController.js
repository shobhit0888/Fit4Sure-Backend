const moment = require("moment");
const orderModel = require("../../models/Order");
const Adminauth = require("../../models/Adminauth");

const dashboardData = async (req, res) => {
  const before7daysDate = moment().subtract(7, "d").format("MM/DD/YYYY");
  const before30daysDate = moment().subtract(30, "d").format("MM/DD/YYYY");

  const aggregation = [
    {
      $group: {
        _id: null,
        totalAmount: {
          $sum: "$amount",
        },
      },
    },
    {
      $lookup: {
        from: "classes",
        let: {},
        pipeline: [
          {
            $match: {
              $expr: {
                $or: [{}],
              },
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "user_id",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $lookup: {
              from: "trainers",
              localField: "trainer_id",
              foreignField: "_id",
              as: "trainer",
            },
          },
        ],
        as: "classes",
      },
    },
    {
      $lookup: {
        from: "users",
        let: {},
        pipeline: [
          {
            $match: {
              $expr: {
                $or: [{}],
              },
            },
          },
        ],
        as: "users",
      },
    },
    {
      $addFields: {
        totalUsers: {
          $size: "$users",
        },
        totalClasses: {
          $size: "$classes",
        },
      },
    },

    {
      $limit: 10,
    },
    {
      $project: {
        users: {
          $slice: ["$users", 10], // Limit users to 10
        },
        classes: {
          $slice: ["$classes", 10], // Limit classes to 10
        },
        totalUsers: 1,
        totalClasses: 1,
        totalAmount: 1,
      },
    },
  ];

  const condition = [
    {
      $addFields: {
        currentDate: {
          $dateToParts: {
            date: new Date(),
          },
        },
        created_at_parts: {
          $dateToParts: {
            date: {
              $dateFromString: {
                dateString: "$created_at",
                format: "%d/%m/%Y",
              },
            },
          },
        },
      },
    },
    {
      $match: {
        $expr: {
          $and: [
            { $eq: ["$created_at_parts.day", "$currentDate.day"] },
            { $eq: ["$created_at_parts.month", "$currentDate.month"] },
            { $eq: ["$created_at_parts.year", "$currentDate.year"] },
          ],
        },
      },
    },
    {
      $group: {
        _id: null,
        todayAmount: {
          $sum: "$amount",
        },
      },
    },
  ];

  const condition7 = [
    {
      $addFields: {
        created_at: {
          $dateFromString: {
            dateString: "$created_at",
            format: "%d/%m/%Y",
          },
        },
        currentDate: {
          $toDate: before7daysDate,
        },
      },
    },
    {
      $match: {
        $expr: {
          $gte: ["$created_at", "$currentDate"],
        },
      },
    },
    {
      $group: {
        _id: null,
        todayAmount: {
          $sum: "$amount",
        },
      },
    },
  ];

  const condition30 = [
    {
      $addFields: {
        created_at: {
          $dateFromString: {
            dateString: "$created_at",
            format: "%d/%m/%Y",
          },
        },
        currentDate: {
          $toDate: before30daysDate,
        },
      },
    },
    {
      $match: {
        $expr: {
          $gte: ["$created_at", "$currentDate"],
        },
      },
    },
    {
      $group: {
        _id: null,
        todayAmount: {
          $sum: "$amount",
        },
      },
    },
  ];

  try {
    const dashboardData = await orderModel.aggregate(aggregation);
    const todayOrderData = await orderModel.aggregate(condition);
    const last7daysAmount = await orderModel.aggregate(condition7);
    const last30daysAmount = await orderModel.aggregate(condition30);
    const admin = await Adminauth.find({});
    return res.render("admin/dashboard", {
      dashboardData,
      todayOrderData,
      last7daysAmount,
      last30daysAmount,
      admin,
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports.dashboardData = dashboardData;
