const { Router } = require('express');

const upload = require('../middleware/upload');
module.exports = (PostController) => {
  const postRouter = new Router();

  postRouter.post(
    '/uploadPost',

    upload.array('pics'),
    PostController.uploadPost
  );

  postRouter.post(
    '/uploadComment',

    PostController.uploadParentComment
  );

  postRouter.post(
    '/bidOnPost',

    PostController.bidOnPost
  );

  postRouter.post(
    '/upVote',

    PostController.upvoteOnPost
  );

  postRouter.post(
    '/downVote',

    PostController.downvoteOnPost
  );

  postRouter.post(
    '/upVoteonComment',

    PostController.upvoteOnComment
  );

  postRouter.post(
    '/downVoteonComment',

    PostController.downvoteOnComment
  );


  postRouter.get(
    '/getComments/:Id',

    PostController.getComments
  );

  postRouter.get(
    '/getBidders/:Id',

    PostController.getbidder
  );

  postRouter.get(
    '/getUpvoterList/:Id',

    PostController.getUpvoterList
  );

  postRouter.get(
    '/getDownvoterList/:Id',

    PostController.getDownvoterList
  );


  postRouter.get(
    '/getUpvoterListComments/:Id',

    PostController.getUpvoterListComments
  );

  postRouter.get(
    '/getDownvoterListComments/:Id',

    PostController.getDownvoterListComments
  );

  postRouter.post(
    '/uploadChildComment',

    PostController.uploadChildComment
  );

  postRouter.post(
    '/addthema',

    PostController.addTheme
  );

  postRouter.post(
    '/sendReport',

    PostController.sendReport
  );

  postRouter.post(
    '/deleteThema',

    PostController.DeleteTheme
  );

  postRouter.get(
    '/getAllPost/:counter/:lat/:long',

    PostController.getAllPosts
  );

  postRouter.get(
    '/getAllMostPopularPost/:counter',

    PostController.getAllMostPopularPost
  );

  postRouter.get(
    '/getOneSuggestion/:Id',

    PostController.getOneSuggestion
  );

  postRouter.get(
    '/verify-post/:Id',

    PostController.approvePostByadmin
  );



  postRouter.get(
    '/getAllPost/:diseaseId',

    PostController.getAllPostsByDiseaseId
  );

  postRouter.get(
    '/getThemeByUserid/:userId',

    PostController.getThemeByUserId
  );

  return postRouter;
};
