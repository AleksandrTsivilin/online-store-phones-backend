'use strict';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class TokenService {
  private static instance: TokenService | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance() {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService();
    }

    return TokenService.instance;
  }

  generateToken( email: string, lastName: string, firstName: string ) {
    const tokenSecret = process.env.TOKEN_SECRET_KEY;

    if (!tokenSecret) {
      throw new Error('secret key is not defined');
    }

    return jwt.sign({
      email, lastName, firstName
    }, tokenSecret, {
      expiresIn: '24h'
    });
  }

  validateToken(token: string) {
    try {
      const secretKey = process.env.TOKEN_SECRET_KEY;
      if (!secretKey) {
        throw new Error('secret key is not defined');
      }
      const userData = jwt.verify(token, secretKey);
      console.log('val token', userData);
      return userData;
    } catch (error) {
      if (error instanceof Error) {
        return null;
      }
    }
  }
}

export const tokenService = TokenService.getInstance();
