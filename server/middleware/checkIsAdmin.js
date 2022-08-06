const { User } = require("../model");

const checkIsAdmin = async (req, res, next) => {
  try {
    const { user_id } = req.headers;
    console.log("userID", user_id);

    const userInfo = await User.findOne({
      _id: user_id,
    });

    if (!userInfo?.isAdmin) {
      return res.status(403).json({
        message: "You are not authorized to use this route",
      });
    }

    return next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({
      message: "Error Occur while Acess Token",
    });
  }
};

module.exports = checkIsAdmin;
