const checkExpiery = (req, res, next) => {
  try {
    let userData = req.body.userData;

    if (!userData) {
      let userData = req.body.userData;

      let currentLoginTime = userData.loginTime;

      /////call api and check last login time let say lastLoginTimeByMongo

      if (currentLoginTime != lastLoginTimeByMongo) {
        return res.status(403).json({
          message: 'You have login from new device',
        });
      }
    }
  } catch {
    return res.status(403).json({
      message: 'Error Occur while Acess Token',
    });
  }

  return next();
};
