import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import { TokenRoleAccess } from '../../middlewares/TokenRoleAccess';
const router = express.Router();

router.post('/login', UserController.login);
router.post(
  '/create',
  validateRequest(UserValidation.createUserZodSchema),
  TokenRoleAccess(['admin']),
  UserController.userCreate
);
router.get('/', TokenRoleAccess(['admin']), UserController.AllUser);
router.delete(
  '/delete/:id',
  TokenRoleAccess(['admin']),
  UserController.deleteUser
);
router.get(
  '/singel-user/:id',
  TokenRoleAccess(['user', 'admin']),
  UserController.getSingelUser
);
router.patch(
  '/update/:id',
  TokenRoleAccess(['admin']),
  UserController.updateSingleUser
);
router.patch(
  '/profile/:id',
  TokenRoleAccess(['user', 'admin']),
  UserController.updateUserProfile
);
router.get(
  '/group-by-interests',
  TokenRoleAccess(['admin']),
  UserController.groupByInterests
);
router.get(
  '/:id/notes',
  TokenRoleAccess(['user', 'admin']),
  UserController.getUserNote
);
router.get(
  '/:id/posts',
  TokenRoleAccess(['user', 'admin']),
  UserController.getUserPosts
);

export const UserRoutes = router;
