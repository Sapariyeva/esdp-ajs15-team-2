import { Request } from "express";
import { IUser } from "./IUser.interface";

export interface IRequestWithUser extends Request {
    user?: IUser & { lastActivity?: Date };
}