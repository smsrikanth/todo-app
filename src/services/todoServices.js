import Todo from '../models/todo.js';

const createTodoService = async function (todo) {
  await todo.save();
};

const deleteTodoService = async function (todoId) {
  await Todo.deleteOne({ _id: todoId });
};

const updateTodoService = async function (todoId, todo) {
  const options = {
    new: true,
  };
  const condition = { _id: todoId };
  const rec = await Todo.findOneAndUpdate(condition, { ...todo }, options);
  console.log({ rec });
  return rec;
};

export { createTodoService, deleteTodoService, updateTodoService };
