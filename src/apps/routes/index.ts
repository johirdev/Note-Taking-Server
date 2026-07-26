/* eslint-disable no-undef */
import express from 'express';


const router = express.Router();

const moduleRoutes = [
  // {
  //   path: '/test',
  //   route: test,
  // },
 
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
