const { v4: uuidv4 } = require("uuid");

const { User } = require("../model");

const addApiInfo = async (req, res) => {
  try {
    console.log(req.body);
    const { api_key } = req.headers;

    if (!api_key) {
      return res.status(400).json({
        success: false,
        message: `no account existed for this apiKey`,
      });
    }

    const accountInfo = await User.findOne({
      apiKey: { $elemMatch: { apiKey: api_key } },
    });

    console.log("accountInfo", accountInfo);

    if (!accountInfo) {
      return res.status(400).json({
        success: false,
        message: `no account existed for this apiKey`,
      });
    }

    const apiKeyUnique = uuidv4();

    await User.findByIdAndUpdate(accountInfo._id, {
      $set: {
        apiKey: [
          ...accountInfo.apiKey,
          {
            apiKey: apiKeyUnique,
            isActive: true,
          },
        ],
      },
    });

    return res.status(200).json({
      success: true,
      message: "Api Key Info is Updated",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "something Went Wrong" });
  }
};

const updateApiInfo = async (req, res) => {
  try {
    console.log(req.body);
    const { api_key } = req.headers;

    if (!api_key) {
      return res.status(400).json({
        success: false,
        message: `no account existed for this apiKey`,
      });
    }

    const accountInfo = await User.findOne({
      apiKey: { $elemMatch: { apiKey: api_key } },
    });

    if (!accountInfo) {
      return res.status(400).json({
        success: false,
        message: `no account existed for this apiKey`,
      });
    }

    const foundApiKeyIndex = accountInfo.apiKey.findIndex(
      (obj) => obj.apiKey === api_key
    );

    accountInfo.apiKey[foundApiKeyIndex].isActive =
      !accountInfo.apiKey[foundApiKeyIndex].isActive;

    await User.findByIdAndUpdate(accountInfo._id, {
      $set: {
        apiKey: accountInfo.apiKey,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Api Key Info is Updated",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "something Went Wrong" });
  }
};

const checkApiLimit = async (req, res) => {
  try {
    console.log(req.body);
    const { api_key } = req.headers;

    const accountInfo =
      (await User.findOne({
        apiKey: { $elemMatch: { apiKey: api_key } },
      })) || {};

    console.log("accountInfo", accountInfo);

    return res.status(200).json({
      success: true,
      message: "Current Plan Info",
      apiPlanInfo: accountInfo.apiPlanInfo || {},
      apiKey: accountInfo.apiKey || [],
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "something Went Wrong" });
  }
};

module.exports = {
  addApiInfo,
  updateApiInfo,
  checkApiLimit,
};
