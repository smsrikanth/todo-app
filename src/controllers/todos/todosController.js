import {
  createTodoService,
  deleteTodoService,
  updateTodoService,
  getTodosService,
} from '../../services/todoServices.js';
import CONSTANTS from '../../constants.js';
import Todos from '../../models/todo.js';

const createTodo = async function (req, res, next) {
  try {
    // console.log('create Todo controller');
    const todo = new Todos();
    const { title } = req.body;
    if (!title) {
      return res
        .status(401)
        .send({ message: CONSTANTS.TITLE_REQUIRED_FAILURE });
    }
    todo.title = title;
    todo.userId = req.userId;
    // console.log(req.userId);
    await createTodoService(todo);
    return res.json({ message: CONSTANTS.TODO_CREATED_SUCCESS });
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

const getTodos = async function (req, res, next) {
  // /todos/:todoId, /todos?limit=10,last=<last todoid>, /user/:userId/todos/:todoId
  try {
    // console.log({ params: req.params, locals: req.locals });
    const otherUserId = req.params.userId;
    const todoId = req.params.todoId;
    let { last, limit } = req.locals;
    let filterCondition = {};
    if (otherUserId) {
      filterCondition = { ...filterCondition, userId: otherUserId };
    } else {
      filterCondition = { ...filterCondition, userId: req.userId };
    }
    if (last) {
      filterCondition = { ...filterCondition, _id: { $gt: last } };
    }
    if (todoId) {
      filterCondition = { ...filterCondition, _id: { $gt: todoId } };
    }

    const todos = await getTodosService({ ...filterCondition }, { limit });
    if (todos.length > 0) last = todos[todos.length - 1]._id;
    // console.log(typeof todos);
    return res.send({ size: todos.length, todos, last });
  } catch (err) {
    next(err);
  }
};

const deleteTodo = async function (req, res, next) {
  try {
    const { todoId } = req.params;
    const record = await deleteTodoService(todoId);
    res.json({ message: CONSTANTS.TODO_DELETED_SUCCESS, record });
  } catch (err) {
    next(err);
  }
};

const updateTodo = async function (req, res, next) {
  try {
    const { todoId } = req.params;
    const record = await updateTodoService(todoId, req.body);
    res.json({ message: CONSTANTS.TODO_UPDATED_SUCCESS, record });
    next();
  } catch (err) {
    next(err);
  }
};

export { createTodo, getTodos, deleteTodo, updateTodo };
