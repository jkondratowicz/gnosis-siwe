import { errorResponse } from '@/common/utils/httpHandlers.js';
import { Request, Response, NextFunction } from 'express';

export const onlyAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.siwe) {
    return errorResponse(401, 'Unauthorized', res);
  }

  next();
};
