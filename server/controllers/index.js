const email = require("./email");
const userAuth = require("./userAuth");
const sampleData = require("./sampleData");
const apiPlans = require("./apiPlans");
const enrollUserToPlan = require("./enrollUserToPlan");
const account = require("./account");
const apiInfo = require("./apiInfo");

const post = require("./post");

const soialQueries = require("./soialQueries");

const admin = require("./admin/index");

function controllersFactory() {
  return {
    admin,
    post,
    email,
    userAuth,
    sampleData,
    apiPlans,
    enrollUserToPlan,
    account,
    apiInfo,
    soialQueries,
  };
}

module.exports = controllersFactory;
