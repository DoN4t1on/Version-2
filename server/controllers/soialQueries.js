const { ObjectId } = require("mongodb");

const {
  Post,
  Thema,
  Expereince,
  subexpereince,
  ExpLike,
  SympAffected,
  Disease,
} = require("../model");

const moment = require("moment-timezone");

const updateLike = async (req, res) => {
  try {
    const { _id, userId } = req.body;
    const existExpereiince = await Expereince.findOne({ _id: ObjectId(_id) });

    const existLike = await ExpLike.findOne({
      $and: [
        {
          expId: ObjectId(_id),
        },
        {
          userId: ObjectId(userId),
        },
      ],
    });
    console.log(existLike);

    if (existLike) {
      const filter = { _id: ObjectId(_id) };
      const update = {
        likes: existExpereiince.likes - 1,
      };

      let doc = await Expereince.findOneAndUpdate(filter, update);

      console.log(doc);

      const existLikeDelete = await ExpLike.deleteOne({
        $and: [
          {
            expId: ObjectId(_id),
          },
          {
            userId: ObjectId(userId),
          },
        ],
      });
    } else {
      console.log(existExpereiince, "else run---------------------");

      const filter = { _id: ObjectId(_id) };
      const update = {
        likes: existExpereiince.likes + 1,
      };

      let doc = await Expereince.findOneAndUpdate(filter, update);

      console.log(doc);

      const existLikeCrete = await ExpLike.create({
        expId: ObjectId(_id),

        userId: ObjectId(userId),
      });
    }

    return res.status(200).json({ data: [], message: "updated" });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: "something Went Wrong" });
  }
};

const updateAffected = async (req, res) => {
  try {
    const { _id, userId } = req.body;
    const existDisease = await Disease.findOne({ _id: ObjectId(_id) });

    const existAffected = await SympAffected.findOne({
      $and: [
        {
          sympId: ObjectId(_id),
        },
        {
          userId: ObjectId(userId),
        },
      ],
    });
    console.log(existAffected);

    if (existAffected) {
      const filter = { _id: ObjectId(_id) };
      const update = {
        affected: existDisease.affected - 1,
      };

      let doc = await Disease.findOneAndUpdate(filter, update);

      console.log(doc);

      const existAffectedDelete = await SympAffected.deleteOne({
        $and: [
          {
            sympId: ObjectId(_id),
          },
          {
            userId: ObjectId(userId),
          },
        ],
      });
    } else {
      console.log(existAffected, "else run---------------------");

      const filter = { _id: ObjectId(_id) };
      const update = {
        affected: existDisease.affected + 1,
      };

      let doc = await Disease.findOneAndUpdate(filter, update);

      console.log(doc);

      const existAffectedCrete = await SympAffected.create({
        sympId: ObjectId(_id),

        userId: ObjectId(userId),
      });
    }

    return res.status(200).json({ data: [], message: "updated" });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: "something Went Wrong" });
  }
};

// const uploadPost = async (req, res) => {
//   try {
//     console.log(req.body);

//     const {
//       Isincognito,
//       userId,
//       symptons_id,
//       means_thearay_id,
//       whatHelped,
//       own_experience,
//       rating,
//       professional_other,

//       timeZone,
//       dateTime,
//     } = req.body;

//     req.body.dateTime = moment.tz(dateTime, timeZone);

//     req.body.symptons_id = ObjectId(req.body.symptons_id);

//     req.body.userId = ObjectId(req.body.userId);

//     req.body.means_thearay_id =
//       req.body.means_thearay_id == ""
//         ? ObjectId("6216619e6c52ca2390dab9d4")
//         : ObjectId(req.body.means_thearay_id);

//     const post = await Post.create(req.body);

//     const ex = await Expereince.create({
//       userId: ObjectId(req.body.userId),
//       postId: ObjectId(post._id),
//       expereince: own_experience,
//       rating: rating,
//       Isincognito: Isincognito,
//       timeZone: timeZone,
//       dateTime: req.body.dateTime,
//     });

//     return res.status(200).json({ status: true, data: post });
//   } catch (err) {
//     console.log(err);

//     return res.status(400).json({ message: "something Went Wrong" });
//   }
// };

// const uploadParentComment = async (req, res) => {
//   try {
//     console.log(req.body);

//     const {
//       Isincognito,
//       userId,
//       postId,

//       own_experience,
//       rating,

//       timeZone,
//       dateTime,
//     } = req.body;

//     const ex = await Expereince.create({
//       userId: ObjectId(req.body.userId),
//       Isincognito: Isincognito,
//       postId: ObjectId(postId),
//       expereince: own_experience,
//       rating: rating,
//       timeZone: timeZone,
//       dateTime: req.body.dateTime,
//     });

//     return res.status(200).json({ status: true, data: ex });
//   } catch (err) {
//     console.log(err);

//     return res.status(400).json({ message: "something Went Wrong" });
//   }
// };

// const uploadChildComment = async (req, res) => {
//   try {
//     console.log(req.body);

//     const {
//       Isincognito,
//       userId,

//       Id,
//       own_experience,

//       timeZone,
//       dateTime,
//     } = req.body;

//     const ex = await subexpereince.create({
//       userId: ObjectId(req.body.userId),
//       Isincognito: Isincognito,
//       expereinceId: ObjectId(Id),
//       expereince: own_experience,

//       timeZone: timeZone,
//       dateTime: req.body.dateTime,
//     });

//     return res.status(200).json({ status: true, data: ex });
//   } catch (err) {
//     console.log(err);

//     return res.status(400).json({ message: "something Went Wrong" });
//   }
// };

// const getAllPosts = async (req, res) => {
//   try {
//     let Fetch = await Post.aggregate([
//       {
//         $match: {},
//       },

//       { $sort: { _id: -1 } },
//       {
//         $lookup: {
//           from: "users",
//           localField: "userId",
//           foreignField: "_id",
//           as: "user",
//         },
//       },

//       { $unwind: "$user" },

//       {
//         $lookup: {
//           from: "diseases",
//           localField: "symptons_id",
//           foreignField: "_id",
//           as: "symptons",
//         },
//       },

//       { $unwind: "$symptons" },

//       {
//         $lookup: {
//           from: "treatments",
//           localField: "means_thearay_id",
//           foreignField: "_id",
//           as: "means_thearay",
//         },
//       },

//       {
//         $lookup: {
//           from: "expereinces",
//           localField: "_id",
//           foreignField: "postId",

//           pipeline: [
//             {
//               $lookup: {
//                 from: "users",
//                 localField: "userId",
//                 foreignField: "_id",

//                 as: "user",
//               },
//             },

//             {
//               $lookup: {
//                 from: "subexpereinces",
//                 localField: "_id",
//                 foreignField: "expereinceId",

//                 pipeline: [
//                   {
//                     $lookup: {
//                       from: "users",
//                       localField: "userId",
//                       foreignField: "_id",

//                       as: "user",
//                     },
//                   },
//                 ],

//                 as: "subcomments",
//               },
//             },
//           ],
//           as: "expereince",
//         },
//       },

//       { $unset: ["user.pass"] },
//     ]);

//     return res.status(200).json({ status: true, data: Fetch });
//   } catch (err) {
//     console.log(err);

//     return res.status(400).json({ message: "something Went Wrong" });
//   }
// };

// const addTheme = async (req, res) => {
//   try {
//     console.log(req.body);

//     req.body.userId = ObjectId(req.body.userId);

//     req.body.symptons_id = ObjectId(req.body.symptons_id);

//     const user = await Thema.create(req.body);

//     return res.status(200).json({ status: true, data: user });
//   } catch (err) {
//     console.log(err);

//     return res.status(400).json({ message: "something Went Wrong" });
//   }
// };

// const DeleteTheme = async (req, res) => {
//   try {
//     console.log(req.body);

//     let Fetch = await Thema.deleteOne({
//       $and: [
//         { symptons_id: ObjectId(req.body.Id) },
//         { userId: ObjectId(req.body.userId) },
//       ],
//     });

//     return res.status(200).json({ status: true, data: "deleted" });
//   } catch (err) {
//     console.log(err);

//     return res.status(400).json({ message: "something Went Wrong" });
//   }
// };

// const getThemeByUserId = async (req, res) => {
//   try {
//     console.log(req.params);

//     let Fetch = await Thema.aggregate([
//       {
//         $match: { userId: ObjectId(req.params.userId) },
//       },

//       { $sort: { _id: -1 } },
//       // {
//       //   $lookup: {
//       //     from: "users",
//       //     localField: "userId",
//       //     foreignField: "_id",
//       //     as: "user",
//       //   },
//       // },

//       // { $unwind: "$user" },

//       {
//         $lookup: {
//           from: "diseases",
//           localField: "symptons_id",
//           foreignField: "_id",
//           as: "symptons",
//         },
//       },

//       { $unwind: "$symptons" },
//     ]);

//     return res.status(200).json({ status: true, data: Fetch });
//   } catch (err) {
//     console.log(err);

//     return res.status(400).json({ message: "something Went Wrong" });
//   }
// };
module.exports = { updateLike, updateAffected };
