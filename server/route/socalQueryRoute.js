const { Router } = require("express");

module.exports = (SocialController) => {
  const SocialRouter = new Router();

  SocialRouter.post(
    "/updatelike",

    SocialController.updateLike
  );

  SocialRouter.post(
    "/updateaffected",

    SocialController.updateAffected
  );

  return SocialRouter;
};
