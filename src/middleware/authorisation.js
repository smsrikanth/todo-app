import Todos from '../models/todo.js';
import Posts from '../models/post.js';
import CONSTANTS from '../constants.js';

const todoAuthorize = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const todo = await Todos.findOne({ _id: todoId });
    // console.log(todo.userId, req.userId, req.userId === todo.userId);
    if (!todo) {
      res.status(404).send({ message: CONSTANTS.TODO_DOES_NOT_EXIST });
    }
    if (todo) {
      if (todo.userId === req.userId) {
        next();
      } else {
        res.status(401).send({ message: CONSTANTS.UNAUTHORISED });
        next(
          JSON.stringify({
            message: CONSTANTS.UNAUTHORISED,
          })
        );
      }
    }
  } catch (err) {
    next(err);
  }
};

const postAuthorize = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Posts.findOne({ _id: postId });
    if (!post) {
      res.status(404).send({ message: CONSTANTS.POST_DOES_NOT_EXIST });
    }
    if (post) {
      if (post.userId === req.userId) {
        next();
      } else {
        res.status(401).send({ message: CONSTANTS.UNAUTHORISED });
        next(
          JSON.stringify({
            message: CONSTANTS.UNAUTHORISED,
          })
        );
      }
    }
  } catch (err) {
    next(err);
  }
};

export { todoAuthorize, postAuthorize };
