const { SampleData } = require("../model");

const createSampleData = async (req, res) => {
  try {
    const { title } = req.body;

    console.log(req.body);

    if (title) {
      const createdSampleData = await SampleData.create({
        title,
      });
      return res.status(200).json({
        success: true,
        message: "1 record inserted in SampleData",
        createdSampleData,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Please provide title for record" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "something Went Wrong" });
  }
};

const getAllSampleData = async (req, res) => {
  try {
    const allSampleData = await SampleData.find();
    console.log("allSampleData", allSampleData);

    return res.status(200).json({
      success: true,
      allSampleData: allSampleData,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "something Went Wrong" });
  }
};

const getSampleDataMatchingTitle = async (req, res) => {
  try {
    const { title } = req.body;
    const sampleDataMatchingTitle = await SampleData.find({ title });

    return res.status(200).json({
      success: true,
      sampleDataMatchingTitle: sampleDataMatchingTitle,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "something Went Wrong" });
  }
};

module.exports = {
  createSampleData,
  getAllSampleData,
  getSampleDataMatchingTitle,
};
