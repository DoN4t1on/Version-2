const { Router } = require("express");

module.exports = (emailController) => {
  const emailRouter = new Router();

  emailRouter.post("/applyforgetpass", emailController.applyForgotPassword);
  emailRouter.get(
    "/verify/:email/uniqueid/:uniqueId",
    emailController.verifyEmail
  );

  return emailRouter;
};
