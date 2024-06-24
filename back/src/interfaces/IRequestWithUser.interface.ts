import { IUser } from "./IUser.interface";
import { Request } from "express";

export interface IRequestWithUser extends Request {
    user?: IUser;
}