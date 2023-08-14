'use strict';

import type { RequestHandler } from 'express';
import { tokenService } from '../services/token.service.js';

export const authMiddleware: RequestHandler = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const accessToken = authorizationHeader?.split(' ')[1];

    if (!accessToken) {
      next(new Error('user is unauthorized'));
    }

    const normalizeToken = String(accessToken);

    const userData = tokenService.validateToken(normalizeToken);

    if (!userData) {
      next(new Error('user is unauthorized'));
    }

    req.user = userData;
    next();
  } catch {
    next(new Error('user is unauthorized'));
  }
};
