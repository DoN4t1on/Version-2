const { Router } = require("express");

module.exports = (accountController) => {
  const accountRouter = new Router();

  accountRouter.post(
    "/createChildAccount",
    accountController.createChildAccount
  );

  accountRouter.post(
    "/updateChildAccountUsageLimit",
    accountController.updateChildAccountUsageLimit
  );

  accountRouter.get(
    "/getChildAccountInfo",
    accountController.getChildAccountInfo
  );

  accountRouter.get("/getUserInfo", accountController.getUserInfo);

  return accountRouter;
};
