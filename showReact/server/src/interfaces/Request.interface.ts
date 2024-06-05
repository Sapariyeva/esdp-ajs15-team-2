import { IUser } from "./IUser.interface";
import { Request } from "express";

export interface RequestWithUser extends Request {
    user?: IUser;
}