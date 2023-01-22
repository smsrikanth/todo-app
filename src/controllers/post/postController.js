import {
  createPostService,
  deletePostService,
  updatePostService,
  addCommentToAPostService,
  getCommentsForAPostService,
} from '../../services/postService.js';
import CONSTANTS from '../../constants.js';
import Posts from '../../models/post.js';
import Comment from '../../models/comment.js';

const createPost = async function (req, res, error) {
  try {
    console.log('create Post controller');
    const post = new Posts();
    const { title, body } = req.body;
    if (!title) {
      return res.send({ message: CONSTANTS.POST_TITLE_REQUIRED_FAILURE });
    }
    if (!body) {
      return res.send({ message: CONSTANTS.POST_BODY_REQUIRED_FAILURE });
    }
    post.title = title;
    post.body = body;
    post.userId = req.userId;
    console.log(req.userId);
    await createPostService(post);
    return res.json({ message: CONSTANTS.POST_CREATED_SUCCESS });
  } catch (err) {
    res.status(400).send({ msg: `${err._message}` });
    console.log(err);
  }
};

const getPosts = async function (req, res, next) {
  try {
    console.log('Get Posts');
    console.log({ params: req.params });
    const otherUserId = req.params.userId;
    const postId = req.params.postId;
    let filterCondition = {};
    if (otherUserId) {
      filterCondition = { ...filterCondition, userId: otherUserId };
    } else {
      filterCondition = { ...filterCondition, userId: req.userId };
    }
    if (postId) {
      filterCondition = { ...filterCondition, _id: postId };
    }
    const posts = [...(await Posts.find({ ...filterCondition }))];
    console.log(typeof posts);
    return res.send({ size: posts.length, posts });
  } catch (err) {
    next(err);
  }
};

const deletePost = async function (req, res, next) {
  try {
    console.log('Delete Post');
    const { postId } = req.params;
    const record = await deletePostService(postId);
    res.json({ message: CONSTANTS.POST_DELETED_SUCCESS, record });
  } catch (err) {
    next(err);
  }
};

const updatePost = async function (req, res, next) {
  try {
    console.log('Update Post');
    const { postId } = req.params;
    const record = await updatePostService(postId, req.body);
    res.json({ message: CONSTANTS.POST_UPDATED_SUCCESS, record });
    next();
  } catch (err) {
    next(err);
  }
};

const addComment = async function (req, res, next) {
  try {
    console.log('Add comment');
    const { postId } = req.params;
    const post = await Posts.findOne({ _id: postId });
    if (!post) {
      return res
        .status(404)
        .send({ message: `${CONSTANTS.POST_DOES_NOT_EXIST}` });
    }
    const { body } = req.body;
    if (!body) {
      res.send({ message: `Body ${CONSTANTS.REQUIRED_FAILURE} ` });
    }
    const comment = new Comment();
    comment.postId = postId;
    comment.userId = req.userId;
    comment.body = body;
    console.log({ comment });
    await addCommentToAPostService(comment);
    res.send({ message: 'Comment Added Successfully' });
  } catch (err) {
    res.status(500).send({ message: CONSTANTS.SOMETHING_WENT_WRONG });
    next(err);
  }
};

const getCommentsForAPost = async function (req, res, next) {
  try {
    const post = await getCommentsForAPostService();
    res.send({ post });
  } catch (err) {
    next(err);
  }
};

export {
  createPost,
  getPosts,
  deletePost,
  updatePost,
  addComment,
  getCommentsForAPost,
};
