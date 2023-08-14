'use strict';

import express from 'express';
import { check } from 'express-validator';
import { userController } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export const userRouter = express.Router();

userRouter.post('/signup', [
  express.json(),
  check('email', 'email wrong').notEmpty(),
  check('password', 'password wrong').notEmpty(),
], userController.loginUser);

userRouter.post('/auth', [
  express.json(),
  check('email', 'email wrong').notEmpty(),
  check('password', 'password less 3').isLength({min: 3}),
  check('email', 'email is not email').isEmail(),
  check('lastName', 'lastName cannot be empty').notEmpty(),
  check('firstName', 'firstName cannot be empty').notEmpty(),
], userController.createUser);

userRouter.post('/logout', userController.logout);

userRouter.get('/', authMiddleware, userController.test);
