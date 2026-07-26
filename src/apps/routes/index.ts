/* eslint-disable no-undef */
import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { PostRoutes } from '../modules/post/post.routes';
import { NoteRoutes } from '../modules/note/note.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/notes',
    route: NoteRoutes,
  },
  {
    path: '/post',
    route: PostRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
