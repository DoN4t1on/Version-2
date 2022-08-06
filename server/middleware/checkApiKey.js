const { ObjectId } = require("mongodb");
const { User } = require("../model");

const checkApiKey = async (req, res, next) => {
  try {
    const { api_key } = req.headers;
    console.log("apiKey", api_key);

    if (!api_key) {
      return res.status(403).json({
        message: "Api Key is missing in request body",
      });
    }

    const userInfo = await User.findOne({
      apiKey: { $elemMatch: { apiKey: api_key, isActive: true } },
    });

    console.log("userInfo", userInfo);

    if (!userInfo) {
      return res.status(403).json({
        message: "Invalid Api Key provided",
      });
    }

    //check if user has apiUsage limit
    console.log("userInfo.apiPlanInfo.apiUsage", userInfo.apiPlanInfo.apiUsage);
    if (!userInfo.apiPlanInfo.apiUsage) {
      console.log("hello");
      return res.status(403).json({
        message: "Usage Limit exceeded, upgrade your plan",
      });
    }

    console.log("userInfo", userInfo);

    if (!(userInfo.apiPlanInfo.apiUsage - 1)) {
      console.log("hello");
      await User.updateMany(
        { parentAccountID: userInfo._id },
        {
          $set: { "apiPlanInfo.apiUsage": 0 },
        }
      );
    }

    //updating user
    await User.updateOne(
      { apiKey: { $elemMatch: { apiKey: api_key } } },
      {
        $set: { "apiPlanInfo.apiUsage": userInfo.apiPlanInfo.apiUsage - 1 },
      }
    );

    console.log("userInfo", userInfo);

    return next();
  } catch {
    console.log("In middle");
    return res.status(403).json({
      message: "Error Occur while Acess Token",
    });
  }
};

module.exports = checkApiKey;
