import {
  createTodoService,
  deleteTodoService,
  updateTodoService,
} from '../../services/todoServices.js';
import CONSTANTS from '../../constants.js';
import Todos from '../../models/todo.js';

const createTodo = async function (req, res, error) {
  try {
    console.log('create Todo controller');
    const todo = new Todos();
    const { title } = req.body;
    todo.title = title;
    todo.userId = req.userId;
    console.log(req.userId);
    await createTodoService(todo);
    return res.json({ message: CONSTANTS.TODO_CREATED_SUCCESS });
  } catch (err) {
    res.status(400).send({ msg: `${err._message}` });
    console.log(err);
  }
};

const getTodos = async function (req, res, next) {
  console.log({ params: req.params });
  const otherUserId = req.params.userId;
  const todoId = req.params.todoId;
  let filterCondition = {};
  if (otherUserId) {
    filterCondition = { ...filterCondition, userId: otherUserId };
  } else {
    filterCondition = { ...filterCondition, userId: req.userId };
  }
  if (todoId) {
    filterCondition = { ...filterCondition, _id: todoId };
  }
  const todos = [...(await Todos.find({ ...filterCondition }))];
  console.log(typeof todos);
  return res.send({ size: todos.length, todos });
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
