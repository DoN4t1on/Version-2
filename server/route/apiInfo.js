const { Router } = require("express");

module.exports = (apiInfoController) => {
  const apiInfoRouter = new Router();

  apiInfoRouter.get("/addApiInfo", apiInfoController.addApiInfo);

  apiInfoRouter.get("/updateApiInfo", apiInfoController.updateApiInfo);

  apiInfoRouter.get("/checkApiLimit", apiInfoController.checkApiLimit);

  return apiInfoRouter;
};
