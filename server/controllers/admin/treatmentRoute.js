const { Treatment } = require("../../model");
const { ObjectId } = require("mongodb");
const addNewTreatment = async (req, res) => {
  try {
    const { name, desc, keywords, category } = req.body;

    console.log(req.body);

    let pic = req.files != "" ? req.files[0].filename : "";

    console.log(pic);

    const newTreatment = await Treatment.create({
      name: name,
      desc: desc,
      category: category,
      image: pic,
      keywords: keywords,
    });
    console.log(newTreatment);
    return res.status(200).json({ message: "added" });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: "something Went Wrong" });
  }
};

const deleteOneTreatment = async (req, res) => {
  try {
    const { _id } = req.body;

    const newTreatment = await Treatment.deleteOne({
      _id: ObjectId(_id),
    });
    console.log(newTreatment);
    return res.status(200).json({ message: "Deleted" });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: "something Went Wrong" });
  }
};

const fetchallTreatment = async (req, res) => {
  try {
    const allTreatment = await Treatment.find({});

    return res.status(200).json({ data: allTreatment });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: "something Went Wrong" });
  }
};

const fetchallTreatmentByUserid = async (req, res) => {
  try {
    console.log("----");
    console.log(req.params.userId);

    let Fetch = await Treatment.aggregate([
      {
        $match: {},
      },

      { $sort: { _id: -1 } },

      { $set: { userRequestedId: ObjectId(req.params.userId) } },

      {
        $lookup: {
          from: "posts",
          localField: "_id",

          foreignField: "means_thearay_id",

          pipeline: [{ $match: { userId: ObjectId(req.params.userId) } }],
          as: "expereince",
        },
      },

      // {
      //   $lookup: {
      //     from: "posts",
      //     localField: "userRequestedId",
      //     foreignField: "userId",

      //     as: "userExpereince",
      //   },
      // },
    ]);

    // Fetch["userExperience"]="No";
    // for (let i = 0; i < Fetch.length; i++) {

    //   console.log(Fetch[i].expereince)

    //   for (let j = 0; j < Fetch[i].expereince.length; j++) {

    //     if(Fetch[i].expereince[j].userId==req.params.userId){

    //     Fetch["userExperience"]="yes";
    //     }

    //   }

    // }

    ////// const allTreatment = await Treatment.find({});

    return res.status(200).json({ data: Fetch });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: "something Went Wrong" });
  }
};

const updateOneTreatment = async (req, res) => {
  try {
    const { name, desc, keywords, _id, category } = req.body;

    const filter = { _id: ObjectId(_id) };
    const update = {
      name: name,
      desc: desc,
      category: category,
      keywords: keywords,
    };

    let doc = await Treatment.findOneAndUpdate(filter, update);

    return res.status(200).json({ data: [], message: "updated" });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: "something Went Wrong" });
  }
};

const updateImagTreatment = async (req, res) => {
  try {
    let pic = req.files != "" ? req.files[0].filename : "";

    console.log("this is new pic", req.body._id);

    const { _id } = req.body;

    const filter = { _id: ObjectId(_id) };
    const update = {
      image: pic,
    };

    let doc = await Treatment.findOneAndUpdate(filter, update);

    console.log(doc);
    return res.status(200).json({ data: [], message: "updated" });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: "something Went Wrong" });
  }
};

module.exports = {
  addNewTreatment,
  deleteOneTreatment,
  updateImagTreatment,
  fetchallTreatmentByUserid,
  fetchallTreatment,
  updateOneTreatment,
};
