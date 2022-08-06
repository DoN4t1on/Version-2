const { ObjectId } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

const { User } = require("../model");
const { registerUser } = require("../services/userAuthService");

const createChildAccount = async (req, res) => {
  try {
    console.log(req.body);
    const { apiUsage: childApiUsage, childInfo } = req.body;
    const { api_key } = req.headers;

    const parentAccountInfo = await User.findOne({
      apiKey: { $elemMatch: { apiKey: api_key } },
    });

    if (!parentAccountInfo) {
      return res.status(400).json({
        success: false,
        message: `no account existed for this ID`,
      });
    }

    if (!parentAccountInfo.apiPlanInfo.hasOwnProperty("apiUsage")) {
      return res.status(400).json({
        success: false,
        message: `You currently don't have any plan, Assign in one to create child account`,
      });
    }

    if (!childApiUsage) {
      return res.status(400).json({
        success: false,
        message: `API Usage limit for child account is not provided`,
      });
    }

    if (parentAccountInfo.apiPlanInfo.apiUsage <= childApiUsage) {
      return res.status(400).json({
        success: false,
        message: `You can't assign API limit to child account greater than your current API limits, It should be less than current ${parentAccountInfo.apiPlanInfo.apiUsage}`,
      });
    }

    const childAccountResponse = await registerUser(childInfo, res, true);

    if (!childAccountResponse.success) {
      return res.status(400).json({
        success: false,
        message: `Unable to create child Account ${childAccountResponse.message}`,
      });
    }
    const apiKey = uuidv4();

    await User.findByIdAndUpdate(childAccountResponse.user._id, {
      $set: {
        apiPlanInfo: {
          ...parentAccountInfo.apiPlanInfo,
          apiUsage: childApiUsage,
        },
        apiKey: [
          {
            apiKey,
            isActive: true,
          },
        ],
        parentAccountID: parentAccountInfo._id,
      },
    });

    await User.findByIdAndUpdate(parentAccountInfo._id, {
      $set: {
        "apiPlanInfo.apiUsage":
          parentAccountInfo.apiPlanInfo.apiUsage - childApiUsage,
        childAccountID: [
          ...parentAccountInfo.childAccountID,
          childAccountResponse.user._id,
        ],
      },
    });

    return res.status(200).json({
      success: true,
      message:
        "Child Account is created, Verification email is sent to child account, Please check that",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "something Went Wrong" });
  }
};

const updateChildAccountUsageLimit = async (req, res) => {
  try {
    const { api_key } = req.headers;

    const { childApiKey, usageLimit } = req.body;

    if (!(api_key && childApiKey && usageLimit)) {
      return res.status(400).json({
        success: false,
        message: `Please provide all fields`,
      });
    }

    const parentAccountInfo = await User.findOne({
      apiKey: { $elemMatch: { apiKey: api_key } },
    });

    const childAccountInfo = await User.findOne({
      apiKey: { $elemMatch: { apiKey: childApiKey } },
    });

    if (!parentAccountInfo) {
      return res.status(400).json({
        success: false,
        message: `No account found for specified parentAccountID`,
      });
    }

    if (!parentAccountInfo.apiPlanInfo.hasOwnProperty("apiUsage")) {
      return res.status(400).json({
        success: false,
        message: `You currently don't have any plan, Assign in one to set Child Limit`,
      });
    }

    const isParentAccountLimit =
      parentAccountInfo.apiPlanInfo.apiUsage <= usageLimit;

    if (isParentAccountLimit) {
      return res.status(400).json({
        success: false,
        message: `You can't assign API limit to child account greater than your current API limits, It should be less than current ${parentAccountInfo.apiPlanInfo.apiUsage}`,
      });
    }

    await User.updateOne(
      { parentAccountID: parentAccountInfo._id, _id: childAccountInfo._id },
      {
        $set: {
          "apiPlanInfo.apiUsage": usageLimit,
        },
      }
    );

    await User.findByIdAndUpdate(ObjectId(parentAccountInfo._id), {
      $set: {
        "apiPlanInfo.apiUsage":
          parentAccountInfo.apiPlanInfo.apiUsage - usageLimit,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Child Account API usage limit is set",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "something Went Wrong" });
  }
};

const getChildAccountInfo = async (req, res) => {
  try {
    const { api_key } = req.headers;

    const parentAccountInfo = await User.findOne({
      apiKey: { $elemMatch: { apiKey: api_key } },
    });

    if (!parentAccountInfo) {
      return res.status(400).json({
        success: false,
        message: `no account existed for this ID`,
      });
    }

    const childAccountInfo = await User.find({
      parentAccountID: parentAccountInfo._id,
    });

    return res.status(200).json({
      success: true,
      message: "Child Account Info",
      childAccountInfo,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "something Went Wrong" });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const { api_key } = req.headers;

    const accountInfo = await User.findOne({
      apiKey: { $elemMatch: { apiKey: api_key } },
    });

    if (!accountInfo) {
      return res.status(400).json({
        success: false,
        message: `no account existed for this ID`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Account Info",
      accountInfo,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "something Went Wrong" });
  }
};

module.exports = {
  createChildAccount,
  updateChildAccountUsageLimit,
  getChildAccountInfo,
  getUserInfo,
};
