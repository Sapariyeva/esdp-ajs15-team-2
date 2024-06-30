import { RequestHandler } from "express";
import { LoginDto, ResetPasswordRequestDto, UserDto, UsernameDto } from "../dto/user.dto";
import { validate } from "class-validator";
import { UserService } from "../services/user.service";
import { formatErrors } from "../helpers/formatErrors";
import { plainToInstance } from "class-transformer";
import { IRequestWithUser } from "../interfaces/IRequestWithUser.interface";
import passport from 'passport';

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  // Регистрация пользователя
  register: RequestHandler = async (req, res): Promise<void> => {
    const userDto = new UserDto();
    userDto.email = req.body.email;
    userDto.password = req.body.password;

    const errors = await validate(userDto, { 
      whitelist: true, 
      validationError: { target: false, value: false } 
    });
    if (errors.length > 0) {
      res.status(400).send(formatErrors(errors));
      return;
    }

    try {
      const newUser = await this.service.registerUser(
        userDto.email,
        userDto.password
      );
      res.send(newUser);
    } catch (e) {
      if ((e as { message: string }).message === 'Email уже используется') {
        res.status(401).send({ error: { message: 'Пользователь уже существует' } });
      } else {
        res.status(500).send({ error: { message: 'Упс, что-то пошло не так' } });
      }
    }
  }

  // Аутентификация пользователя
  loginUser: RequestHandler = async (req, res): Promise<void> => {
    try {
        const loginUserDto = plainToInstance(LoginDto, req.body);
        const user = await this.service.loginUser(loginUserDto);
        if (user) {
          res.send(user);
          return;
        }
        res.status(401).send({ error: { message: 'Ошибка данных' } });
    } catch (e) {
        res.status(401).send({ error: { message: (e as Error).message}});
    }
  };

  // Выход пользователя
  logoutUser: RequestHandler = async (req: IRequestWithUser, res) => {
    // Проверяем, есть ли токен у пользователя
    if(!req.user?.token) return res.send( { message: 'success' } );
    try {
      // Получаем токен пользователя из запроса
      const { token } = req.user;

      // Вызываем сервис для логаута пользователя
      await this.service.logoutUser(token);
    } catch (e) {
      return res.status(500).send({ error: { message: 'Внутренняя ошибка сервера' } });
    }
    return res.send({ message: `success ` });
  }

  // Подтверждение регистрации по электронной почте
  confirmEmail: RequestHandler = async (req, res): Promise<void> => {
    const { token } = req.params;
    
    try {
      const user = await this.service.confirmEmail(token);
      if (user) {
        res.send({message: "Регистрация прошла успешно"});
      } else {
        res.status(400).send({ error: { message: `Неверный токен` }});
      }
    } catch (error) {
      res.status(500).send({ error: { message: 'Ошибка подтверждения электронной почты' } });
    }
  }

  // Повторная отправка письма для подтверждения регистрации
  resendConfirmationEmail: RequestHandler = async (req, res) => {
    const email = req.body.email;
    try {
        await this.service.resendConfirmationEmail(email);
        res.status(200).send({ message: "Подтверждение повторно отправлено на вашу почту." });
    } catch (error) {
        res.status(400).send({ error: { message: "Неверный адрес электронной почты." } });
    }
  };

  // Изменение имени
  setUsername: RequestHandler = async (req, res): Promise<void> => {
    if (!req.headers.authorization) {
      res.status(401).send({ error: { message: 'Unauthorized' } });
      return;
    }
    const usernameDto = new UsernameDto();
    usernameDto.username = req.body.username;
    usernameDto.token = req.headers.authorization;

    const errors = await validate(usernameDto, { 
      whitelist: true, 
      validationError: { target: false, value: false } 
    });
    if (errors.length > 0) {
      res.status(400).send(formatErrors(errors));
      return;
    }

    try {
      const user = await this.service.setUsername(
        usernameDto.token,
        usernameDto.username
      );
      if (user) {
        res.send(user);
      } else {
        res.status(400).send({ error: { message: "Неверный токен или адрес электронной почты не подтвержден." }});
      }
    } catch (error) {
      res.status(500).send({ error: { message: 'Ошибка установки имени пользователя' } });
    }
  }

  // Поиск пользователя по почте
  findByEmail: RequestHandler = async (req, res): Promise<void> => {
    try {
      const user = await this.service.findByEmail(req.params.email);
      
      if (user) {
        res.send(user);
      } else {
        res.status(400).send({ error: { message: "Неверный адрес электронной почты." }});
      }
    } catch (error) {
      res.status(500).send({ error: { message: 'Ошибка поиска пользователя' } });
    }
  }

  // Отправка письма для сброса пароля
  sendResetPasswordEmail: RequestHandler = async (req, res): Promise<void> => {
    const resetPasswordRequestDto = new ResetPasswordRequestDto();
    resetPasswordRequestDto.email = req.body.email;
    try {
      await this.service.sendResetPasswordEmail(resetPasswordRequestDto.email);
      res.send({ message: 'Ссылка для сброса пароля отправлена на ваш email' });
    } catch (e) {
      res.status(500).send({ error: { message: (e as Error).message}});
    }
  }

  // Google OAuth
  googleAuth: RequestHandler = passport.authenticate('google', { scope: ['profile', 'email'] });

  googleAuthCallback: RequestHandler = passport.authenticate('google', { failureRedirect: '/' }, (req, res) => {
    if (req.user) {
      res.redirect('/dashboard');
    } else {
      res.status(400).send({ error: { message: 'Ошибка аутентификации через Google' }});
    }
  });
}