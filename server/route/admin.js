const { Router } = require("express");
const auth = require("../middleware/auth");
const Validator = require("../middleware/Validator");

const upload = require("../middleware/upload");
module.exports = (AdminController) => {
  const adminRouter = new Router();

  adminRouter.post(
    "/adminVerify",

    AdminController.adminVerify
  );

  adminRouter.post(
    "/addNewDisease",
    upload.array("pics"),
    AdminController.addNewDisease
  );

  adminRouter.post(
    "/updateoneDisease",

    AdminController.updateOneDisease
  );

  adminRouter.post(
    "/updateImageDisease",
    upload.array("pics"),
    AdminController.updateImageDisease
  );

  adminRouter.post(
    "/updateImageTreatment",
    upload.array("pics"),
    AdminController.updateImagTreatment
  );

  adminRouter.get(
    "/getallDisease",

    AdminController.fetchallDisease
  );

  adminRouter.get(
    "/getallDisease",

    AdminController.fetchallDisease
  );

  adminRouter.get(
    "/getallDisease/:diseaseId",

    AdminController.fetchDiseaseById
  );

  adminRouter.post(
    "/deleteOneDisease",

    AdminController.deleteOneDisease
  );

  adminRouter.post(
    "/addNewTreatment",
    upload.array("pics"),
    AdminController.addNewTreatment
  );

  adminRouter.post(
    "/updateoneTreatment",

    AdminController.updateOneTreatment
  );

  adminRouter.get(
    "/getallTreatment/:userId",

    AdminController.fetchallTreatmentByUserid
  );

  adminRouter.get(
    "/getallTreatment",

    AdminController.fetchallTreatment
  );

  adminRouter.post(
    "/deleteOneTreatment",

    AdminController.deleteOneTreatment
  );

  return adminRouter;
};
