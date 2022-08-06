const { ApiPlans } = require("../model");

const createApiPlans = async (req, res) => {
  try {
    console.log(req.body);
    const { title, apiUsage, price } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: `title is missing in request body`,
      });
    }

    if (!price) {
      return res.status(400).json({
        success: false,
        message: `price is missing in request body`,
      });
    }

    if (title === "Enterprise") {
      const isPlanAlreadyExist = await ApiPlans.find({ title });
      console.log("isPlanAlreadyExist", isPlanAlreadyExist);

      if (isPlanAlreadyExist.length) {
        return res.status(400).json({
          success: false,
          message: `apiPlan with the specfic title already exist`,
        });
      }

      const createdApiPlans = await ApiPlans.create({
        title,
        price,
      });

      return res.status(200).json({
        success: true,
        message: "1 record inserted in ApiPlans",
        createdApiPlans,
      });
    }

    if (!apiUsage) {
      return res.status(400).json({
        success: false,
        message: `apiUsage is missing in request body`,
      });
    }

    const isPlanAlreadyExist = await ApiPlans.find({ title });
    console.log("isPlanAlreadyExist", isPlanAlreadyExist);

    if (isPlanAlreadyExist.length) {
      return res.status(400).json({
        success: false,
        message: `apiPlan with the specfic title already exist`,
      });
    }

    const createdApiPlans = await ApiPlans.create({
      title,
      apiUsage,
      price,
    });

    return res.status(200).json({
      success: true,
      message: "1 record inserted in ApiPlans",
      createdApiPlans,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "something Went Wrong" });
  }
};

const getAllApiPlans = async (req, res) => {
  try {
    const allApiPlans = await ApiPlans.find();
    console.log("allApiPlans", allApiPlans);

    return res.status(200).json({
      success: true,
      allApiPlans: allApiPlans,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "something Went Wrong" });
  }
};

const updateApiPlanInfo = async (req, res) => {
  try {
    const { title, apiUsage, price } = req.body;

    const apiPlanInfo = await ApiPlans.findOne({ title });

    if (!apiPlanInfo) {
      return res.status(400).json({
        success: false,
        message: `apiPlan with the specfic title does not exist`,
      });
    }

    if (title === "Enterprise") {
      const dataToUpdate = price
        ? {
            price,
          }
        : {};

      const updatedInfo = await ApiPlans.findOneAndUpdate(
        { title },
        dataToUpdate
      );

      return res.status(200).json({
        success: true,
        updatedInfo: updatedInfo,
      });
    }

    let dataToUpdate = {
      apiUsage,
      price,
    };

    if (!apiUsage) {
      dataToUpdate = {
        price,
      };
    }

    if (!price) {
      dataToUpdate = {
        apiUsage,
      };
    }

    const updatedInfo = await ApiPlans.findOneAndUpdate(
      { title },
      dataToUpdate
    );

    return res.status(200).json({
      success: true,
      updatedInfo: updatedInfo,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "something Went Wrong" });
  }
};

module.exports = {
  createApiPlans,
  getAllApiPlans,
  updateApiPlanInfo,
};
