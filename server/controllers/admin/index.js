const {
  addNewDisease,
  deleteOneDisease,
  fetchallDisease,
  updateOneDisease,
  adminVerify,
  updateImageDisease,
  fetchDiseaseById,
} = require("./diseaseRoute");

const {
  addNewTreatment,
  deleteOneTreatment,
  fetchallTreatment,
  updateOneTreatment,
  updateImagTreatment,
  fetchallTreatmentByUserid,
} = require("./treatmentRoute");

module.exports = {
  addNewDisease,
  deleteOneDisease,
  fetchallDisease,
  updateOneDisease,
  updateImagTreatment,
  adminVerify,
  addNewTreatment,
  deleteOneTreatment,
  fetchallTreatment,
  updateImageDisease,
  updateOneTreatment,
  fetchallTreatmentByUserid,
  fetchDiseaseById,
};
