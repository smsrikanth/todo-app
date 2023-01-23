import Comment from '../models/comment.js';
import Post from '../models/post.js';

const createPostService = async function (post) {
  await post.save();
};

const deletePostService = async function (postId) {
  await Comment.deleteMany({ postId });
  await Post.deleteOne({ _id: postId });
};

const updatePostService = async function (todoId, post) {
  const options = {
    new: true,
  };
  const condition = { _id: todoId };
  const rec = await Post.findOneAndUpdate(condition, { ...post }, options);
  // console.log({ rec });
  return rec;
};

const addCommentToAPostService = async function (comment) {
  await comment.save();
};

const getCommentsForAPostService = async function (postId) {
  const aggregateCondition = [
    { $addFields: { postId: { $toString: '$_id' } } },
    { $match: { postId } },
    {
      $lookup: {
        from: 'comments',
        localField: 'postId',
        foreignField: 'postId',
        as: 'comments',
      },
    },
  ];
  const post = await Post.aggregate(aggregateCondition);

  // console.log({ post, a: 'c' });
  return post;
};

const getPostsService = async function (filterCondition, options) {
  return [...(await Post.find({ ...filterCondition }, null, { ...options }))];
};

export {
  createPostService,
  deletePostService,
  updatePostService,
  addCommentToAPostService,
  getCommentsForAPostService,
  getPostsService,
};
