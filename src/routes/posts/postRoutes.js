import express from 'express';
import {
  createPost,
  getPosts,
  deletePost,
  updatePost,
  addComment,
  getCommentsForAPost,
} from '../../controllers/post/postController.js';
import { verifyToken } from '../../middleware/auth.js';
import { postAuthorize } from '../../middleware/authorisation.js';

const router = express.Router({ mergeParams: true });
//     console.log(req.path, req.params);
router.use('/', verifyToken);
router.post('/:postId/comments', addComment);
router.get('/:postId/comments', getCommentsForAPost);
router.post('/', createPost);
router.get('/', getPosts);
router.get('/:postId', getPosts);
router.delete('/:postId', postAuthorize, deletePost);
router.patch('/:postId', postAuthorize, updatePost);

export default router;
