'use strict';

import { User } from '../models/User.model.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { tokenService } from './token.service.js';

dotenv.config();

class UserService {
  private static instance: UserService | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }

    return UserService.instance;
  }

  async createUser (email: string, password: string, lastName: string, firstName: string) {

    const candidate = await User.findOne({where: { email }});

    if (candidate) {
      throw new Error('The email address is already associated with an existing account');
    }

    const hashPassword = await this.getHashPassword(password);

    const newUser = await User.create({
      email,
      hashPassword,
      lastName,
      firstName,
    });

    const normalizedUser = this.normalizeUser(newUser);

    const token = tokenService.generateToken(
      normalizedUser.email, normalizedUser.firstName, normalizedUser.lastName
    );

    return {user: normalizedUser, token};
  }

  async loginUser (email: string, password: string) {

    const foundedUser = await User.findOne({where: { email }});

    if (!foundedUser) {
      throw new Error('Either email or password is not correct');
    }

    const isEqualPassword = await bcrypt.compare(password, foundedUser.dataValues.hashPassword);

    if (!isEqualPassword) {
      throw new Error('Either email or password is not correct');
    }

    const normalizedUser = this.normalizeUser(foundedUser);

    const token = tokenService.generateToken(
      normalizedUser.email, normalizedUser.lastName, normalizedUser.firstName,
    );

    return {
      token,
      user: normalizedUser,
    };

  }

  async logout () {
    return 'logout works';
  }

  private normalizeUser(user: User){
    return {
      id: user.dataValues.id,
      email: user.dataValues.email,
      firstName: user.dataValues.firstName,
      lastName: user.dataValues.lastName,
    };
  }

  private async getHashPassword(password: string) {
    const salt = Number(process.env.SALT);
    return bcrypt.hash(password, salt);
  }
}

export const userService = UserService.getInstance();
