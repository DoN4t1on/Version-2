const { Router } = require("express");
const emailRoutes = require("./email");
const userAuthRoutes = require("./userAuth");

const sampleDataRoutes = require("./sampleData");
const apiPlansRoutes = require("./apiPlans");
const enrollUserToPlanRoutes = require("./enrollUserToPlan");
const accountRoutes = require("./account");
const apiInfoRoutes = require("./apiInfo");

const adminRoutes = require("./admin");
const postRoute = require("./postRoute");

const socalQueryRoute = require("./socalQueryRoute");

const { auth, checkApiKey, checkIsAdmin } = require("../middleware");

module.exports = (controllers) => {
  const router = new Router();

  router.use("/email", emailRoutes(controllers.email));

  router.use("/post", postRoute(controllers.post));

  router.use("/social", socalQueryRoute(controllers.soialQueries));

  router.use("/admin", adminRoutes(controllers.admin));

  router.use("/userAuth", userAuthRoutes(controllers.userAuth));
  router.use(
    "/sampleData",
    auth,
    checkApiKey,
    sampleDataRoutes(controllers.sampleData)
  );

  router.use(
    "/apiPlans",
    auth,
    checkIsAdmin,
    apiPlansRoutes(controllers.apiPlans)
  );

  router.use(
    "/enrollUserToPlan",
    auth,
    enrollUserToPlanRoutes(controllers.enrollUserToPlan)
  );

  router.use("/account", auth, accountRoutes(controllers.account));

  router.use("/apiInfo", auth, apiInfoRoutes(controllers.apiInfo));

  return router;
};
