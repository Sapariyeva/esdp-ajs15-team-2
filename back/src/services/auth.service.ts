import { RegisterUserDto } from "@/dto/register-user.dto";
import { SignInUserDto } from "@/dto/sign-in-user.dto";
import { IUser } from "@/interfaces/IUser.interface";
import { UserRepository } from "@/repositories/user.repository";

export class AuthService{
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async signIn(signInUserDto: SignInUserDto): Promise<IUser> {
    return await this.repository.signIn(signInUserDto);
  }

  async register(registerUserDto: RegisterUserDto): Promise<IUser> {
    return await this.repository.register(registerUserDto);
  }

  async getUserByToken (token: string): Promise<IUser | null> {
    return await this.repository.getUserByToken(token);
  };

  async logout (token: string) {
    await this.repository.clearToken(token);
  }
}