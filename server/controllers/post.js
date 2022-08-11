const { ObjectId } = require('mongodb');
const { sendEmail } = require('../services/mailJetEmail');
const {
  Post,
  Thema,
  Expereince,
  subexpereince,
  Bid,
  Upvote,
  Downvote,
  UpvoteComment,
  DownvoteComment,
} = require('../model');

const moment = require('moment-timezone');

const uploadPost = async (req, res) => {
  try {
    let pic = req.files != '' ? req.files[0].filename : '';

    req.body.pic = pic;

    req.body.loc = {
      type: 'Point',
      coordinates: [parseFloat(req.body.long), parseFloat(req.body.lat)],
    };

    console.log(req.body);

    const post = await Post.create(req.body);

    return res.status(200).json({ status: true, data: post });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: 'something Went Wrong' });
  }
};

const uploadParentComment = async (req, res) => {
  try {
    console.log(req.body);

    const {
      userId,
      postId,

      own_experience,
    } = req.body;

    const post = await Post.findOne({ _id: ObjectId(postId) });

    const filter = { _id: ObjectId(postId) };
    const update = {
      comments: post.comments + 1,
    };

    let doc = await Post.findOneAndUpdate(filter, update);

    const ex = await Expereince.create({
      userId: ObjectId(req.body.userId),

      postId: ObjectId(postId),

      expereince: own_experience,
    });
    return res.status(200).json({ status: true, data: ex });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: 'something Went Wrong' });
  }
};

const bidOnPost = async (req, res) => {
  try {
    console.log(req.body);

    const {
      userId,
      postId,

      amount,

      timeZone,
    } = req.body;

    let dateTime = moment.tz(req.body.dateTime, timeZone);

    let preBid = await Bid.findOne({
      $and: [
        {
          postId: ObjectId(postId),
        },
        {
          userId: ObjectId(userId),
        },
      ],
    });

    console.log(preBid);

    if (preBid) {
      const filter = { _id: ObjectId(preBid._id) };

      const update = {
        amount: preBid.amount + amount,
      };

      let doc = await Bid.findOneAndUpdate(filter, update);

      return res.status(200).json({ status: true, data: doc, isNew: false });
    } else {
      const post = await Post.findOne({ _id: ObjectId(postId) });

      const filter = { _id: ObjectId(postId) };
      const update = {
        bidder: post.bidder + 1,
      };

      let doc = await Post.findOneAndUpdate(filter, update);

      const ex = await Bid.create({
        userId: ObjectId(req.body.userId),

        postId: ObjectId(postId),

        amount: amount,
        dateTime: dateTime,
        timeZone: timeZone,
      });
      return res.status(200).json({ status: true, data: ex, isNew: true });
    }
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: 'something Went Wrong' });
  }
};

const upvoteOnPost = async (req, res) => {
  try {
    console.log(req.body);

    const { userId, postId, timeZone } = req.body;
    let dateTime = moment.tz(req.body.dateTime, timeZone);

    let preBid = await Upvote.findOne({
      $and: [
        {
          postId: ObjectId(postId),
        },
        {
          userId: ObjectId(userId),
        },
      ],
    });

    console.log('pre upvote-------------', preBid);

    const post = await Post.findOne({ _id: ObjectId(postId) });

    if (preBid) {
      const filter = { _id: ObjectId(postId) };
      const update = {
        upVote: post.upVote - 1,
      };

      let doc = await Post.findOneAndUpdate(filter, update);

      const ex = await Upvote.deleteOne({
        $and: [
          {
            postId: ObjectId(postId),
          },
          {
            userId: ObjectId(userId),
          },
        ],
      });
    } else {
      let checkDownVote = await Downvote.findOne({
        $and: [
          {
            postId: ObjectId(postId),
          },
          {
            userId: ObjectId(userId),
          },
        ],
      });

      let update;
      if (checkDownVote) {
        let deleteDownVote = await Downvote.deleteOne({
          $and: [
            {
              postId: ObjectId(postId),
            },
            {
              userId: ObjectId(userId),
            },
          ],
        });

        update = {
          upVote: post.upVote + 1,
          downVote: post.downVote - 1,
        };
      } else {
        update = {
          upVote: post.upVote + 1,
        };
      }

      const filter = { _id: ObjectId(postId) };

      let doc = await Post.findOneAndUpdate(filter, update);

      const ex = await Upvote.create({
        userId: ObjectId(req.body.userId),

        postId: ObjectId(postId),
        dateTime: dateTime,
        timeZone: timeZone,
      });
    }

    const refreshpost = await Post.findOne({ _id: ObjectId(postId) });

    return res.status(200).json({ status: true, data: refreshpost });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: 'something Went Wrong' });
  }
};

const downvoteOnPost = async (req, res) => {
  try {
    console.log(req.body);

    const { userId, postId, timeZone } = req.body;

    let dateTime = moment.tz(req.body.dateTime, timeZone);

    let preBid = await Downvote.findOne({
      $and: [
        {
          postId: ObjectId(postId),
        },
        {
          userId: ObjectId(userId),
        },
      ],
    });

    console.log(preBid);

    const post = await Post.findOne({ _id: ObjectId(postId) });

    if (preBid) {
      ////withdraw
      const filter = { _id: ObjectId(postId) };
      const update = {
        downVote: post.downVote - 1,
      };

      let doc = await Post.findOneAndUpdate(filter, update);

      const ex = await Downvote.deleteOne({
        $and: [
          {
            postId: ObjectId(postId),
          },
          {
            userId: ObjectId(userId),
          },
        ],
      });
    } else {
      let checkUpVote = await Upvote.findOne({
        $and: [
          {
            postId: ObjectId(postId),
          },
          {
            userId: ObjectId(userId),
          },
        ],
      });

      let update;
      if (checkUpVote) {
        let deletdownVote = await Upvote.deleteOne({
          $and: [
            {
              postId: ObjectId(postId),
            },
            {
              userId: ObjectId(userId),
            },
          ],
        });

        update = {
          upVote: post.upVote - 1,
          downVote: post.downVote + 1,
        };
      } else {
        update = {
          downVote: post.upVote + 1,
        };
      }

      const filter = { _id: ObjectId(postId) };

      let doc = await Post.findOneAndUpdate(filter, update);

      const ex = await Downvote.create({
        userId: ObjectId(req.body.userId),

        postId: ObjectId(postId),
        dateTime: dateTime,
        timeZone: timeZone,
      });
    }
    const refreshpost = await Post.findOne({ _id: ObjectId(postId) });

    return res.status(200).json({ status: true, data: refreshpost });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: 'something Went Wrong' });
  }
};


async function getExpereinceById(Id) {
  let Fetch = await Expereince.aggregate([
    {
      $match: { _id: ObjectId(Id) },
    },

    { $sort: { _id: 1 } },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $lookup: {
        from: 'upvotecomments',
        localField: '_id',
        foreignField: 'expId',
        as: 'upvotecomments',
      },
    },
    {
      $lookup: {
        from: 'downvotecomments',
        localField: '_id',
        foreignField: 'expId',
        as: 'downvotecomments',
      },
    },
  ]);

  return Fetch;
}

const getComments = async (req, res) => {
  try {
    const { Id } = req.params;

    let Fetch = await Expereince.aggregate([
      {
        $match: { postId: ObjectId(Id) },
      },

      { $sort: { _id: 1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $lookup: {
          from: 'upvotecomments',
          localField: '_id',
          foreignField: 'expId',
          as: 'upvotecomments',
        },
      },
      {
        $lookup: {
          from: 'downvotecomments',
          localField: '_id',
          foreignField: 'expId',
          as: 'downvotecomments',
        },
      },
    ]);

    return res.status(200).json({ status: true, data: Fetch });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: 'something Went Wrong' });
  }
};

const getbidder = async (req, res) => {
  try {
    const { Id } = req.params;

    let Fetch = await Bid.aggregate([
      {
        $match: { postId: ObjectId(Id) },
      },

      { $sort: { _id: -1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },

      { $unwind: '$user' },
    ]);

    return res.status(200).json({ status: true, data: Fetch });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: 'something Went Wrong' });
  }
};

const getUpvoterList = async (req, res) => {
  try {
    const { Id } = req.params;

    let Fetch = await Upvote.aggregate([
      {
        $match: { postId: ObjectId(Id) },
      },

      { $sort: { _id: -1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },

      { $unwind: '$user' },
    ]);

    return res.status(200).json({ status: true, data: Fetch });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: 'something Went Wrong' });
  }
};

const getUpvoterListComments = async (req, res) => {
  try {
    const { Id } = req.params;

    let Fetch = await UpvoteComment.aggregate([
      {
        $match: { expId: ObjectId(Id) },
      },

      { $sort: { _id: -1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },

      { $unwind: '$user' },
    ]);

    console.log('-------------', Fetch);
    return res.status(200).json({ status: true, data: Fetch });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: 'something Went Wrong' });
  }
};

const getDownvoterList = async (req, res) => {
  try {
    const { Id } = req.params;

    let Fetch = await Downvote.aggregate([
      {
        $match: { postId: ObjectId(Id) },
      },

      { $sort: { _id: -1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },

      { $unwind: '$user' },
    ]);
    console.log('-------------', Fetch);

    return res.status(200).json({ status: true, data: Fetch });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: 'something Went Wrong' });
  }
};

const getDownvoterListComments = async (req, res) => {
  try {
    const { Id } = req.params;

    let Fetch = await DownvoteComment.aggregate([
      {
        $match: { expId: ObjectId(Id) },
      },

      { $sort: { _id: -1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },

      { $unwind: '$user' },
    ]);

    return res.status(200).json({ status: true, data: Fetch });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: 'something Went Wrong' });
  }
};

const uploadChildComment = async (req, res) => {
  try {
    console.log(req.body);

    const {
      Isincognito,
      userId,

      Id,
      own_experience,

      timeZone,
      dateTime,
    } = req.body;

    const ex = await subexpereince.create({
      userId: ObjectId(req.body.userId),
      Isincognito: Isincognito,
      expereinceId: ObjectId(Id),
      expereince: own_experience,

      timeZone: timeZone,
      dateTime: req.body.dateTime,
    });

    return res.status(200).json({ status: true, data: ex });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: 'something Went Wrong' });
  }
};

const getAllPostsByDiseaseId = async (req, res) => {
  // console.log(req.params);

  // console.log(req.params);

  // let match =
  //   req.params.diseaseId == null || req.params.diseaseId == "null"
  //     ? {}
  //     : { symptons_id: ObjectId(req.params.diseaseId) };

  try {
    let Fetch = await Post.aggregate([
      {
        $match: { symptons_id: ObjectId(req.params.diseaseId) },
      },

      { $sort: { _id: -1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },

      { $unwind: '$user' },

      {
        $lookup: {
          from: 'diseases',
          localField: 'symptons_id',
          foreignField: '_id',
          as: 'symptons',
        },
      },

      { $unwind: '$symptons' },

      {
        $lookup: {
          from: 'treatments',
          localField: 'means_thearay_id',
          foreignField: '_id',
          as: 'means_thearay',
        },
      },

      {
        $lookup: {
          from: 'expereinces',
          localField: '_id',
          foreignField: 'postId',

          pipeline: [
            {
              $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',

                as: 'user',
              },
            },

            {
              $lookup: {
                from: 'subexpereinces',
                localField: '_id',
                foreignField: 'expereinceId',

                pipeline: [
                  {
                    $lookup: {
                      from: 'users',
                      localField: 'userId',
                      foreignField: '_id',

                      as: 'user',
                    },
                  },
                ],

                as: 'subcomments',
              },
            },
          ],
          as: 'expereince',
        },
      },

      { $unset: ['user.pass'] },
    ]);

    return res.status(200).json({ status: true, data: Fetch });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: 'something Went Wrong' });
  }
};

const getAllMostPopularPost = async (req, res) => {
  try {
    console.log(req.params.counter);
    let Fetch = await Post.aggregate([
      {
        $match: {},
      },
      { $sort: { upVote: -1 } },

      {
        $lookup: {
          from: 'upvotes',
          localField: '_id',
          foreignField: 'postId',
          as: 'upvotes',
        },
      },
      {
        $lookup: {
          from: 'downvotes',
          localField: '_id',
          foreignField: 'postId',
          as: 'downvotes',
        },
      },

      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },

      { $unwind: '$user' },

      { $unset: ['user.pass'] },
    ]);

    return res.status(200).json({ status: true, data: Fetch });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: 'something Went Wrong' });
  }
};

async function getLatestPostsWithoutGeoLocation(req, res) {
  console.log(req.params);

  try {
    let Fetch = await Post.aggregate([
      {
        $match: {},
      },
      { $sort: { _id: -1 } },

      { $skip: parseInt(req.params.counter) },
      { $limit: 1 },

      {
        $lookup: {
          from: 'upvotes',
          localField: '_id',
          foreignField: 'postId',
          as: 'upvotes',
        },
      },
      {
        $lookup: {
          from: 'downvotes',
          localField: '_id',
          foreignField: 'postId',
          as: 'downvotes',
        },
      },

      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },

      { $unwind: '$user' },

      { $unset: ['user.pass'] },
    ]);

    return res.status(200).json({ status: true, data: Fetch });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: 'something Went Wrong' });
  }
}

async function getWithGeolocation(req, res) {
  console.log(req.params);

  try {
    let Fetch = await Post.aggregate([
      // {
      //   $geoNear: {
      //     near: {
      //       type: 'Point',
      //       coordinates: [req.params.long, req.params.lat],
      //     },
      //     key: 'loc',
      //     distanceField: 'dist.calculated',
      //     //// maxDistance: 15000,
      //   },
      // },

      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [
              parseFloat(req.params.long),
              parseFloat(req.params.lat),
            ],
          },
          distanceField: 'dist.calculated',
          /// maxDistance: 2,
          //// query: { category: "Parks" },
          /// includeLocs: "dist.location",
          spherical: true,
        },
      },

      {
        $match: {},
      },
      { $skip: parseInt(req.params.counter) },
      { $limit: 1 },

      /////  { $sort: { _id: -1 } },

      {
        $lookup: {
          from: 'upvotes',
          localField: '_id',
          foreignField: 'postId',
          as: 'upvotes',
        },
      },
      {
        $lookup: {
          from: 'downvotes',
          localField: '_id',
          foreignField: 'postId',
          as: 'downvotes',
        },
      },

      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },

      { $unwind: '$user' },

      { $unset: ['user.pass'] },
    ]);

    return res.status(200).json({ status: true, data: Fetch });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: 'something Went Wrong' });
  }
}

const getAllPosts = async (req, res) => {
  try {
    if (req.params.lat == 'false') {
      getLatestPostsWithoutGeoLocation(req, res);
    } else {
      ///////with geolocation
      getWithGeolocation(req, res);
    }
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: 'something Went Wrong' });
  }
};

const addTheme = async (req, res) => {
  try {
    console.log(req.body);

    req.body.userId = ObjectId(req.body.userId);

    req.body.symptons_id = ObjectId(req.body.symptons_id);

    const user = await Thema.create(req.body);

    return res.status(200).json({ status: true, data: user });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: 'something Went Wrong' });
  }
};

const DeleteTheme = async (req, res) => {
  try {
    console.log(req.body);

    let Fetch = await Thema.deleteOne({
      $and: [
        { symptons_id: ObjectId(req.body.Id) },
        { userId: ObjectId(req.body.userId) },
      ],
    });

    return res.status(200).json({ status: true, data: 'deleted' });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: 'something Went Wrong' });
  }
};

const getThemeByUserId = async (req, res) => {
  try {
    console.log(req.params);

    let Fetch = await Thema.aggregate([
      {
        $match: { userId: ObjectId(req.params.userId) },
      },

      { $sort: { _id: -1 } },
      // {
      //   $lookup: {
      //     from: "users",
      //     localField: "userId",
      //     foreignField: "_id",
      //     as: "user",
      //   },
      // },

      // { $unwind: "$user" },

      {
        $lookup: {
          from: 'diseases',
          localField: 'symptons_id',
          foreignField: '_id',
          as: 'symptons',
        },
      },

      { $unwind: '$symptons' },
    ]);

    return res.status(200).json({ status: true, data: Fetch });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: 'something Went Wrong' });
  }
};

const getOnePetition = async (req, res) => {
  try {
    let Fetch = await Post.aggregate([
      {
        $match: { _id: ObjectId(req.params.Id) },
      },

      {
        $lookup: {
          from: 'upvotes',
          localField: '_id',
          foreignField: 'postId',
          as: 'upvotes',
        },
      },
      {
        $lookup: {
          from: 'downvotes',
          localField: '_id',
          foreignField: 'postId',
          as: 'downvotes',
        },
      },

      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },

      { $unwind: '$user' },

      { $unset: ['user.pass'] },
    ]);

    return res.status(200).json({ status: true, data: Fetch });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: 'something Went Wrong' });
  }
};

const sendReport = async (req, res) => {
  try {
    console.log(req.body);
    var emailParameters = {
      post: req.body.link,
    };

    let emailToSend = [
      {
        Email: 'it@localpetition.org',
      },
    ];

    sendEmail(
      emailToSend,
      'User Response ',
      emailParameters,
      'Report_Email_Body'
    );

    return res.status(200).json({ status: true });
  } catch (err) {
    return res.status(400).json({ message: 'something Went Wrong' });
  }
};

const upvoteOnComment = async (req, res) => {
  try {
    console.log(req.body);

    const { userId, expId, timeZone } = req.body;
    let dateTime = moment.tz(req.body.dateTime, timeZone);

    let preBid = await UpvoteComment.findOne({
      $and: [
        {
          expId: ObjectId(expId),
        },
        {
          userId: ObjectId(userId),
        },
      ],
    });

    console.log('pre upvote-------------', preBid);

    const experience = await Expereince.findOne({ _id: ObjectId(expId) });

    if (preBid) {
      const filter = { _id: ObjectId(expId) };
      const update = {
        upVote: experience.upVote - 1,
      };

      let doc = await Expereince.findOneAndUpdate(filter, update);

      const ex = await UpvoteComment.deleteOne({
        $and: [
          {
            expId: ObjectId(expId),
          },
          {
            userId: ObjectId(userId),
          },
        ],
      });
    } else {
      let checkDownVote = await DownvoteComment.findOne({
        $and: [
          {
            expId: ObjectId(expId),
          },
          {
            userId: ObjectId(userId),
          },
        ],
      });

      let update;
      if (checkDownVote) {
        let deleteDownVote = await DownvoteComment.deleteOne({
          $and: [
            {
              expId: ObjectId(expId),
            },
            {
              userId: ObjectId(userId),
            },
          ],
        });

        update = {
          upVote: experience.upVote + 1,
          downVote: experience.downVote - 1,
        };
      } else {
        update = {
          upVote: experience.upVote + 1,
        };
      }

      const filter = { _id: ObjectId(expId) };

      let doc = await Expereince.findOneAndUpdate(filter, update);

      const ex = await UpvoteComment.create({
        userId: ObjectId(req.body.userId),

        expId: ObjectId(expId),
        dateTime: dateTime,
        timeZone: timeZone,
      });
    }

    const refreshpost = await getExpereinceById(expId);
    console.log('77777', refreshpost);
    /// const refreshpost = await Expereince.findOne({ _id: ObjectId(expId) });

    return res.status(200).json({ status: true, data: refreshpost });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: 'something Went Wrong' });
  }
};

const downvoteOnComment = async (req, res) => {
  try {
    console.log(req.body);

    const { userId, expId, timeZone } = req.body;
    let dateTime = moment.tz(req.body.dateTime, timeZone);

    let preBid = await DownvoteComment.findOne({
      $and: [
        {
          expId: ObjectId(expId),
        },
        {
          userId: ObjectId(userId),
        },
      ],
    });

    console.log('pre upvote-------------', preBid);

    const experience = await Expereince.findOne({ _id: ObjectId(expId) });

    if (preBid) {
      const filter = { _id: ObjectId(expId) };
      const update = {
        upVote: experience.upVote - 1,
      };

      let doc = await Expereince.findOneAndUpdate(filter, update);

      const ex = await DownvoteComment.deleteOne({
        $and: [
          {
            expId: ObjectId(expId),
          },
          {
            userId: ObjectId(userId),
          },
        ],
      });
    } else {
      let checkUpVote = await UpvoteComment.findOne({
        $and: [
          {
            expId: ObjectId(expId),
          },
          {
            userId: ObjectId(userId),
          },
        ],
      });

      let update;
      if (checkUpVote) {
        let deleteUpVote = await UpvoteComment.deleteOne({
          $and: [
            {
              expId: ObjectId(expId),
            },
            {
              userId: ObjectId(userId),
            },
          ],
        });

        update = {
          upVote: experience.upVote - 1,
          downVote: experience.downVote + 1,
        };
      } else {
        update = {
          upVote: experience.upVote + 1,
        };
      }

      const filter = { _id: ObjectId(expId) };

      let doc = await Expereince.findOneAndUpdate(filter, update);

      const ex = await DownvoteComment.create({
        userId: ObjectId(req.body.userId),

        expId: ObjectId(expId),
        dateTime: dateTime,
        timeZone: timeZone,
      });
    }

    const refreshpost = await getExpereinceById(expId);

    //const refreshpost = await Expereince.findOne({ _id: ObjectId(expId) });

    return res.status(200).json({ status: true, data: refreshpost });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: 'something Went Wrong' });
  }
};

module.exports = {
  uploadPost,
  bidOnPost,
  getAllPostsByDiseaseId,
  getAllPosts,
  getAllMostPopularPost,
  addTheme,
  getThemeByUserId,
  DeleteTheme,
  uploadParentComment,
  uploadChildComment,
  getComments,
  getbidder,
  upvoteOnPost,
  downvoteOnPost,
  getUpvoterList,
  getDownvoterList,

  getUpvoterListComments,
  getDownvoterListComments,
  getOnePetition,
  sendReport,
  upvoteOnComment,
  downvoteOnComment,
};
