'use strict';

import { userService } from '../services/user.service.js';
import { Controller } from '../types';
import { validationResult } from 'express-validator/src/validation-result.js';

class UserController {
  private static instance: UserController | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance() {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }

    return UserController.instance;
  }

  createUser: Controller = async (req, res) => {
    const {email, password, lastName, firstName} = req.body;
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({message: errors});
        return;
      }

      const userData = await userService.createUser(email, password, lastName, firstName);

      // that for future
      // res.cookie('token', userData.token, {
      //   maxAge: 24 * 60 * 60, httpOnly: true,
      // });

      res.status(201).json(userData);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({message: `${error.message}`});
      }
    }
  };

  loginUser: Controller = async (req, res) => {
    const {email, password} = req.body;
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({message: errors});
        return;
      }
      const userData = await userService.loginUser(email, password);

      // that for future
      // res.cookie('token', userData.token, {
      //   maxAge: 24 * 60 * 60, httpOnly: true,
      // });

      res.status(200).json(userData);

    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({message: `${error.message}`});
      }
    }
  };

  logout: Controller = async (req, res) => {
    try {
      const {token} = req.cookies;
      console.log(token);

      res.clearCookie(token);
      res.status(200).json('logout');
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({message: 'something went wrong'});
      }
    }
  };

  test: Controller = async(req, res) => {
    res.status(200).json('test');
  };
}

export const userController = UserController.getInstance();
