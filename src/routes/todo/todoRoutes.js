import express from 'express';
import {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} from '../../controllers/todos/todosController.js';
import { verifyToken, pagination } from '../../middleware/auth.js';
import { todoAuthorize } from '../../middleware/authorisation.js';

const router = express.Router({ mergeParams: true });
//     console.log(req.path, req.params);
router.use('/', verifyToken);
router.post('/', createTodo);
router.get('/', pagination, getTodos);
router.get('/:todoId', pagination, getTodos);
router.delete('/:todoId', todoAuthorize, deleteTodo);
router.patch('/:todoId', todoAuthorize, updateTodo);

export default router;
