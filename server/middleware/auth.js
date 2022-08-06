const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  try {
    const token =
      req.headers.token || req.query.token || req.headers["authorization"];

    if (!token) {
      return res.status(403).json({
        message: "A token is required for authentication",
      });
    }
    try {
      const decoded = jwt.verify(token, config.TOKEN_KEY);
      req.user = decoded;
    } catch (err) {
      return res.status(403).json({
        message: "Invalid Token",
      });
    }
  } catch {
    return res.status(403).json({
      message: "Error Occur while Acess Token",
    });
  }

  return next();
};

module.exports = verifyToken;
