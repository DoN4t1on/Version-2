const { Router } = require("express");

module.exports = (enrollUserToPlanController) => {
  const enrollUserToPlanRouter = new Router();

  enrollUserToPlanRouter.post(
    "/enrollUser",
    enrollUserToPlanController.enrollUser
  );

  enrollUserToPlanRouter.post(
    "/updateEnrollUser",
    enrollUserToPlanController.updateEnrollUser
  );

  return enrollUserToPlanRouter;
};
