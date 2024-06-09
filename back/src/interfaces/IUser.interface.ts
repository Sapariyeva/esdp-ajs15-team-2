import { UserRole } from "../entities/user.entity";

export interface IUser {
  id: number;
  mail: string;
  password?: string;
  token?: string;
  role: UserRole;
}