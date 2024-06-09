import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { RequestHandler } from "express";
import { SignInUserDto } from "@/dto/sign-in-user.dto";
import { RegisterUserDto } from "@/dto/register-user.dto";
import { formatErrors } from "@/helpers/formatErrors";
import { AuthService } from "@/services/auth.service";

export class AuthController {
  private service: AuthService;

  constructor() {
    this.service = new AuthService();
  }

  signIn: RequestHandler = async (req, res) => {
    try {
      const signInDto = plainToInstance(SignInUserDto, req.body);
      const user = await this.service.signIn(signInDto);
      return res.setHeader("Authorization", user.token || '').send(user);
    } catch(e) {
      return res.status(401).send((e as Error).message);
    }
  };

  register: RequestHandler = async (req, res) => {
    try {
      const registerUserDto = plainToInstance(RegisterUserDto, req.body);

      const errors = await validate(registerUserDto, { whitelist: true, validationError: { target: false, value: false } });
      if (errors.length > 0) {
        return res.status(400).send(formatErrors(errors));
      }

      const user = await this.service.register(registerUserDto);
      return res.setHeader("Authorization", user.token || '').send(user);
    } catch(e) {
      if ((e as {code: string}).code === 'ER_DUP_ENTRY'){
        return res.send({error: { message: 'User already exists'}});
      } else {
        return res.status(500).send({error: { message: 'Oops something went wrong'}});
      }
    }
  };

  logout: RequestHandler = async (req, res) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.send({ message: 'success' });
    }
    try {
      await this.service.logout(token);
    } catch(e) {
      console.log(e);
      return res.send(500).send({ error: { message: 'Internal server error'} });
    }
    return res.send({ message: 'success' });
  };
}