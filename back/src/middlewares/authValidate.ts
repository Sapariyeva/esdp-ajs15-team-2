import { NextFunction, Request, Response } from "express";
import i18next from "i18next";
import { IRequestWithUser } from "@/interfaces/IRequestWithUser.interface";
import { IUser } from "@/interfaces/IUser.interface";
import { UserService } from "@/services/user.service";

export const authValidate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");

  if (!token) {
    const lang = req.language || "en";
    return res.status(401).send({ error: { message: i18next.t("no_token_present", { lng: lang }) } });
  }

  const service = new UserService();
  const lang = req.language || "en";
  const user = await service.findByToken(token, lang);

  if (!user) {
    return res.status(401).send({ error: { message: i18next.t("invalid_token", { lng: lang }) } });
  }

  (req as IRequestWithUser).user = user as unknown as IUser;
  next();
  return;
};
