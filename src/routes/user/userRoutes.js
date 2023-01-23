import express from 'express';
import { createUser } from '../../controllers/user/userController.js';
import { verifyToken } from '../../middleware/auth.js';
import todoRoutes from '../todo/todoRoutes.js';

const router = express.Router();

router.get('/', createUser);

// get other user todos
router.use(
  '/:userId/todos',
  verifyToken,
  (req, res, next) => {
    try {
      if (req.method === 'GET') return next();
      throw new Error(
        JSON.stringify({ message: ' UnAuthorised!! ', status: 403 })
      );
    } catch (err) {
      // console.log(err);
      next(err);
    }
  },
  todoRoutes
);

export default router;
