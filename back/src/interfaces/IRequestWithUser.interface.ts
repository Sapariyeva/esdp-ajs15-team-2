import { Request } from "express";

export interface IRequestWithUser extends Request {
  user?: {
    token?: string;
    lastActivity?: Date;
    role?: string;
    // другие поля пользователя
  };
}
