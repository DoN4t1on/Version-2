const { ObjectId } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const { ApiPlans, User, UserPlansHistory } = require("../model");

const handleEnterpriseEnrollment = async (req, res) => {
  try {
    const { planTitle, usageLimits, price } = req.body;
    const { user_id } = req.headers;

    let transformedPrice = price;

    if (!price) {
      transformedPrice = usageLimits * 12;
    }

    const apiKey = uuidv4();

    const userInfo = await User.findById(Object(user_id));

    console.log("userInfo", userInfo);

    if (userInfo.parentAccountID) {
      return {
        success: false,
        message:
          "You cannot enroll in this plan, Please contact your parent account",
        status: 400,
      };
    }

    if (userInfo.apiPlanInfo.hasOwnProperty("apiUsage")) {
      const updatedUser = await User.findByIdAndUpdate(
        ObjectId(user_id),
        {
          apiPlanInfo: {
            title: planTitle,
            apiUsage: Number(usageLimits),
            price: transformedPrice,
          },
        },
        { new: true }
      );

      await UserPlansHistory.updateOne(
        { userID: ObjectId(user_id) },
        {
          $set: {
            apiKey: userInfo.apiKey,
            "plansHistory.$[].isActivated": false,
          },
        },
        { multi: true }
      );

      const updatedPlansHistory = await UserPlansHistory.findOne({
        userID: ObjectId(user_id),
      });

      await UserPlansHistory.updateOne(
        { userID: ObjectId(user_id) },
        {
          $set: {
            apiKey: userInfo.apiKey,
            plansHistory: [
              ...updatedPlansHistory.plansHistory,
              {
                title: planTitle,
                apiUsage: Number(usageLimits),
                price: transformedPrice,
                isActivated: true,
              },
            ],
          },
        }
      );

      return {
        success: true,
        message: "User is enrolled in the specified plan",
        updatedUser,
        status: 200,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(
      ObjectId(user_id),
      {
        apiPlanInfo: {
          title: planTitle,
          apiUsage: Number(usageLimits),
          price: transformedPrice,
        },
        apiKey: [
          {
            apiKey,
            isActive: true,
          },
        ],
      },
      { new: true }
    );

    await UserPlansHistory.create({
      userID: ObjectId(user_id),
      apiKey: [
        {
          apiKey,
          isActive: true,
        },
      ],
      plansHistory: [
        {
          title: planTitle,
          apiUsage: Number(usageLimits),
          price: transformedPrice,
          isActivated: true,
        },
      ],
    });

    return {
      success: true,
      message:
        "User is enrolled in the specified plan and plans history is updated",
      updatedUser,
      status: 200,
    };
  } catch (err) {
    console.log(err);
    return { message: "something Went Wrong", status: 400 };
  }
};

const enrollUser = async (req, res) => {
  try {
    console.log(req.body);
    const { planTitle } = req.body;
    const { user_id } = req.headers;

    console.log("user_id", user_id);

    if (!planTitle) {
      return res.status(400).json({
        success: false,
        message: `planTitle is missing in request body`,
      });
    }

    if (planTitle === "Enterprise") {
      const response = await handleEnterpriseEnrollment(req, res);
      console.log("response", response);
      return res.status(response.status).json(response);
    }

    const planInfo = await ApiPlans.findOne({ title: planTitle });
    const planInfoCopy = planInfo.toObject();

    if (!planInfo) {
      return res.status(400).json({
        success: false,
        message: `plan with specified title does not exist`,
      });
    }

    const apiKey = uuidv4();

    const userInfo = await User.findById(Object(user_id));

    console.log("userInfo", userInfo);

    if (userInfo.parentAccountID) {
      return res.status(400).json({
        success: false,
        message:
          "You cannot enroll in this plan, Please contact your parent account",
      });
    }

    if (userInfo.apiPlanInfo.hasOwnProperty("apiUsage")) {
      const updatedUser = await User.findByIdAndUpdate(
        ObjectId(user_id),

        {
          apiPlanInfo: planInfo,
        },
        { new: true }
      );

      await UserPlansHistory.updateOne(
        { userID: ObjectId(user_id) },
        {
          $set: {
            apiKey: userInfo.apiKey,
            "plansHistory.$[].isActivated": false,
          },
        },
        { multi: true }
      );

      const updatedPlansHistory = await UserPlansHistory.findOne({
        userID: ObjectId(user_id),
      });

      console.log("updatedPlansHistory", updatedPlansHistory);

      await UserPlansHistory.updateOne(
        { userID: ObjectId(user_id) },
        {
          $set: {
            apiKey: userInfo.apiKey,
            plansHistory: [
              ...updatedPlansHistory.plansHistory,
              {
                ...planInfoCopy,
                isActivated: true,
              },
            ],
          },
        }
      );

      return res.status(200).json({
        success: true,
        message: "User is enrolled in the specified plan",
        updatedUser,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      ObjectId(user_id),

      {
        apiPlanInfo: planInfo,
        apiKey: [
          {
            apiKey,
            isActive: true,
          },
        ],
      },
      { new: true }
    );

    await UserPlansHistory.create({
      userID: ObjectId(user_id),
      apiKey: [
        {
          apiKey,
          isActive: true,
        },
      ],
      plansHistory: [
        {
          ...planInfoCopy,
          isActivated: true,
        },
      ],
    });

    return res.status(200).json({
      success: true,
      message:
        "User is enrolled in the specified plan and plans history is updated",
      updatedUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "something Went Wrong" });
  }
};

const updateEnrollUser = async (req, res) => {
  try {
    const { planTitle, _id } = req.body;

    if (!planTitle) {
      return res.status(400).json({
        success: false,
        message: `planTitle is missing in request body`,
      });
    }

    const planInfo = await ApiPlans.findOne({ title: planTitle });

    if (!planInfo) {
      return res.status(400).json({
        success: false,
        message: `plan with specified title does not exist`,
      });
    }

    const apiKey = uuidv4();

    const userInfo = await User.findById(Object(_id));

    if (userInfo.apiPlanInfo.hasOwnProperty("apiUsage")) {
      const updatedUser = await User.findByIdAndUpdate(ObjectId(_id), {
        apiPlanInfo: planInfo,
      });

      return res.status(200).json({
        success: true,
        message: "User is enrolled in the specified plan",
        updatedUser,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(ObjectId(_id), {
      apiPlanInfo: planInfo,
      apiKey,
    });

    return res.status(200).json({
      success: true,
      message: "User is enrolled in the specified plan",
      updatedUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "something Went Wrong" });
  }
};

module.exports = {
  enrollUser,
  updateEnrollUser,
};
