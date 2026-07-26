import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { PostValidation } from './note.validation';
import { PostController } from './note.controller';
import { TokenRoleAccess } from '../../middlewares/TokenRoleAccess';

const router = express.Router();

router.post(
  '/create',
  validateRequest(PostValidation.createPostZodSchema),
  TokenRoleAccess(['admin', 'user']),
  PostController.postCreate
);
router.get('/', TokenRoleAccess(['admin', 'user']), PostController.AllPost);

router.patch(
  '/update/:id',
  TokenRoleAccess(['admin', 'user']),
  PostController.updateSinglePost
);
router.delete(
  '/delete/:id',
  TokenRoleAccess(['admin', 'user']),
  PostController.deletePost
);

export const NoteRoutes = router;
