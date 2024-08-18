import { NextFunction, Response } from "express";
import { IRequestWithUser } from "../interfaces/IRequestWithUser.interface";
import { IUser } from "../interfaces/IUser.interface";

export const updateLastActivity = (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    req.user = {} as IUser;
  }
  // Обновление времени последней активности пользователя (при каждом обращении к бэкенду)
  req.user.lastActivity = new Date();

  console.log(
    `Last activity time updated: ${req.user.lastActivity}`
  );
  next();
};
