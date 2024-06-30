import { Request } from "express";

export interface IRequestWithUser extends Request {
    user?: {
        token?: string;
        // другие поля пользователя
    };
}