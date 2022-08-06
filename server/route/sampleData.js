const { Router } = require("express");

module.exports = (sampleDataController) => {
  const sampleDataRouter = new Router();

  sampleDataRouter.post(
    "/createSampleData",
    sampleDataController.createSampleData
  );

  sampleDataRouter.get(
    "/getAllSampleData",
    sampleDataController.getAllSampleData
  );

  sampleDataRouter.post(
    "/getSampleDataMatchingTitle",
    sampleDataController.getSampleDataMatchingTitle
  );

  return sampleDataRouter;
};
