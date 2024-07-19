import { NextFunction, Request, Response } from "express";
import { IRequestWithUser } from "@/interfaces/IRequestWithUser.interface";
import { IUser } from "@/interfaces/IUser.interface";
import { UserService } from "@/services/user.service";

export const authValidate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send({ error: { message: "No token present" } });
  }

  const service = new UserService();
  const user = await service.findByToken(token);

  if (!user) {
    return res.status(401).send({ error: { message: "Invalid token" } });
  }

  (req as IRequestWithUser).user = user as unknown as IUser;
  next();
  return;
};
