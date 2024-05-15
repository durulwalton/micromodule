const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    appStatus = false;
    appCode = 401;
    appMessage = "Access denied. No token provided.";
    return res.send(
      JSON.stringify({
        appStatus: appStatus,
        appCode: appCode,
        appMessage: appMessage,
        appData: null,
      })
    );
  } else {
    try {
      const decoded = jwt.verify(token, "talha");
      req.user = decoded;
      next();
    } catch (ex) {
      appStatus = false;
      appCode = 400;
      appMessage = "Invalid token.";
      res.send(
        JSON.stringify({
          appStatus: appStatus,
          appCode: appCode,
          appMessage: appMessage,
          appData: null,
        })
      );
    }
  }
};
