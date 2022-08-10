const { Disease, Expereince } = require("../../model");
const { ObjectId } = require("mongodb");
const addNewDisease = async (req, res) => {
  try {
    const { name, desc, keywords } = req.body;

    console.log(req.body);

    let pic = req.files != "" ? req.files[0].filename : "";

    console.log(pic);

    const newDisease = await Disease.create({
      name: name,
      desc: desc,
      image: pic,
      keywords: keywords,
    });
    console.log(newDisease);
    return res.status(200).json({ message: "added" });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: "Etwas lief schief" });
  }
};

const deleteOneDisease = async (req, res) => {
  try {
    const { _id } = req.body;

    const newDisease = await Disease.deleteOne({
      _id: ObjectId(_id),
    });
    console.log(newDisease);
    return res.status(200).json({ message: "Deleted" });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: "Etwas lief schief" });
  }
};

const fetchallDisease = async (req, res) => {
  try {
    const allDisease = await Disease.find({});

    return res.status(200).json({ data: allDisease });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: "Etwas lief schief" });
  }
};

const fetchDiseaseById = async (req, res) => {
  //// req.params.diseaseid
  try {
    let FetchAvgRating = await Expereince.aggregate([
      {
        $match: { sympId: ObjectId(req.params.diseaseId) },
      },

      {
        $group: {
          _id: "$sympId",
          avg: { $avg: "$rating" },
        },
      },
    ]);

    console.log(FetchAvgRating);

    let Fetch = await Disease.aggregate([
      {
        $match: { _id: ObjectId(req.params.diseaseId) },
      },

      { $sort: { _id: -1 } },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "symptons_id",

          as: "userPost",
        },
      },

      {
        $lookup: {
          from: "sympaffecteds",
          localField: "_id",
          foreignField: "sympId",

          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",

                as: "user",
              },
            },
          ],

          as: "sympaffected",
        },
      },

      // { $unwind: "$sympaffected" },

      {
        $lookup: {
          from: "expereinces",
          localField: "_id",
          foreignField: "sympId",

          as: "helpedungroup",
        },
      },

      { $addFields: { treatments: { $size: "$userPost" } } },

      { $addFields: { affected: { $size: "$sympaffected" } } },
      { $addFields: { helped: { $size: "$helpedungroup" } } },
      { $addFields: { avgrating: FetchAvgRating } },

      //  affected: { $addToSet: { $size: "$sympaffected" } },
      //      helped: { $addToSet: { $size: "$helpedungroup" } },

      // { $unwind: "$helped" },

      // { $addFields: { helpedCount: { $size: "$helped" } } },

      // {
      //   $group: { _id: "helped", avg: { $avg: "$helped.rating" } },
      // },

      // {
      //   $addFields: {
      //     avgRating: {
      //       $group: { _id: "helped", avg: { $avg: "$helped.rating" } },
      //     },
      //   },
      // },

      // {
      //   $group: {
      //     _id: "$_id",
      //     avgrating: { $avg: "$helped.rating" },
      //     treatments: { $addToSet: { $size: "$treatments" } },
      //     affected: { $addToSet: { $size: "$sympaffected" } },
      //     helped: { $addToSet: { $size: "$helpedungroup" } },

      //     name: { $addToSet: "$name" },

      //     desc: { $addToSet: "$desc" },

      //     image: { $addToSet: "$image" },

      //     keywords: { $addToSet: "$keywords" },
      //   },
      // },

      // {
      //   $group: {
      //     _id: "$_id",
      //     treatments: { $sum: "$treatments" },
      //   },
      // },

      // { $addFields: { treatmentsCount: { $size: "$treatments" } } },

      // { $addFields: { affectedCount: { $size: "$sympaffected" } } },

      // {
      //   $group: {
      //     _id: "$sympaffected._id",
      //     treatmentsCount: { $sum: "$_id" },
      //   },
      // },
    ]);

    return res.status(200).json({ status: true, data: Fetch });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: "Etwas lief schief" });
  }
};

const adminVerify = async (req, res) => {
  try {
    let adminusername = "saeedartists@gmail.com";
    let adminpassword = "12345678";

    const { email, pass } = req.body;

    if (email.toLowerCase() == adminusername && adminpassword == pass) {
      return res
        .status(200)
        .json({ data: { email: adminusername, pass: adminpassword } });
    } else {
      return res
        .status(400)
        .json({ data: "", message: "Admin not authenticated" });
    }
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: "Etwas lief schief" });
  }
};

const updateImageDisease = async (req, res) => {
  try {
    let pic = req.files != "" ? req.files[0].filename : "";

    console.log("this is new pic", req.body._id);

    const { _id } = req.body;

    const filter = { _id: ObjectId(_id) };
    const update = {
      image: pic,
    };

    let doc = await Disease.findOneAndUpdate(filter, update);

    console.log(doc);
    return res.status(200).json({ data: [], message: "updated" });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: "Etwas lief schief" });
  }
};

const updateOneDisease = async (req, res) => {
  try {
    const { name, desc, keywords, _id } = req.body;

    const filter = { _id: ObjectId(_id) };
    const update = {
      name: name,
      desc: desc,

      keywords: keywords,
    };

    let doc = await Disease.findOneAndUpdate(filter, update);
    return res.status(200).json({ data: [], message: "updated" });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: "Etwas lief schief" });
  }
};

module.exports = {
  addNewDisease,
  deleteOneDisease,
  fetchallDisease,
  updateOneDisease,
  updateImageDisease,
  adminVerify,
  fetchDiseaseById,
};
