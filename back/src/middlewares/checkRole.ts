import { NextFunction, Response } from 'express';
import { IRequestWithUser } from '../interfaces/IRequestWithUser.interface';

export function checkRole(...allowedRoles: string[]) {
  return (req: IRequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user && user.role && allowedRoles.includes(user.role)) {
      return next();
    } else {
      return res.status(403).send({ error: 'Permission denied' });
    }
  };
}
