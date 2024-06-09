import bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { User } from "@/entities/user.entity";
import { SignInUserDto } from "@/dto/sign-in-user.dto";
import { RegisterUserDto } from "@/dto/register-user.dto";
import { IUser } from "@/interfaces/IUser.interface";
import { appDataSource } from "@/dataSource/dataSource";
import _ from "lodash";

export class UserRepository extends Repository<User> {
  constructor() {
    super(User, appDataSource.createEntityManager());
  }

  async signIn(signInUserDto: SignInUserDto): Promise<IUser> {
    const user = await this.findOne({
      where: {mail: signInUserDto.mail}
    });
    if (!user) {
      throw new Error('Invalid username or password');
    }
    const isMatch = await user.comparePassword(signInUserDto.password);
    if (!isMatch) {
      throw new Error('Invalid username or password');
    }

    user.generateToken();
    const userWithToken: IUser = await this.save(user);

    const userWithoutPassword = _.omit(userWithToken, "password");
    return userWithoutPassword;
  }

  async register(registerUserDto: RegisterUserDto): Promise<IUser> {
    const salt = await bcrypt.genSalt(10);
    registerUserDto.password = await bcrypt.hash(registerUserDto.password, salt);
    const user = await this.create(registerUserDto);

    user.generateToken();
    const userWithToken: IUser = await this.save(user);

    const userWithoutPassword = _.omit(userWithToken, "password");
    return userWithoutPassword;
  }

  async getUserByToken(token: string): Promise<User|null> {
    return await this.findOneBy({ token });
  }

  async clearToken(token: string) {
    const user = await this.getUserByToken(token);
    if (user) {
      user.generateToken();
    }
  }
}