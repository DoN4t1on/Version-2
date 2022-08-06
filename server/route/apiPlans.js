const { Router } = require("express");

module.exports = (apiPlansController) => {
  const apiPlansRouter = new Router();

  apiPlansRouter.post("/createApiPlans", apiPlansController.createApiPlans);

  apiPlansRouter.get("/getAllApiPlans", apiPlansController.getAllApiPlans);

  apiPlansRouter.post(
    "/updateApiPlanInfo",
    apiPlansController.updateApiPlanInfo
  );

  return apiPlansRouter;
};
