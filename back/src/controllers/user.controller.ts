import { RequestHandler } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import passport from 'passport';
import { LoginDto, ResetPasswordDto, ResetPasswordRequestDto, UserDto, UsernameDto } from "@/dto/user.dto";
import { UserService } from "@/services/user.service";
import { formatErrors } from "@/helpers/formatErrors";
import { IRequestWithUser } from "@/interfaces/IRequestWithUser.interface";

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  // Получение списка пользователей
  getUsers: RequestHandler = async (req, res): Promise<void> => {
    const users = await this.service.getUsers();
    res.send(users);
  }

  // Регистрация пользователя
  register: RequestHandler = async (req, res): Promise<void> => {
    const userDto = new UserDto();
    // projections - оставляем только необходимые поля
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
      console.log(e);
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
        res.status(200).send(`<h1 
          style="text-align: center; margin-top: 20%; color: #9069cd;"
        >Регистрация пройдена успешно!</h1>
        <script>
          setTimeout(() => {
            window.closed = true;
            window.close();
          }, 3000);
        </script>`);
      } else {
        res.status(400).send(`<h1 
          style="text-align: center; margin-top: 20%; color: #9069cd;"
        >Ссылка недействительна</h1>
        <script>
          setTimeout(() => {
            window.closed = true;
            window.close();
          }, 3000);
        </script>`);
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
  resetPasswordEmail: RequestHandler = async (req, res): Promise<void> => {
    const resetPasswordRequestDto = new ResetPasswordRequestDto();
    resetPasswordRequestDto.email = req.body.email;
    try {
      await this.service.resetPasswordEmail(resetPasswordRequestDto.email);
      res.send({ message: 'Ссылка для сброса пароля отправлена на ваш email' });
    } catch (e) {
      res.status(500).send({ error: { message: (e as Error).message}});
    }
  }

  // Повторная отправка письма для сброса пароля
  resendResetPasswordEmail: RequestHandler = async (req, res): Promise<void> => {
    const email = req.body.email;
    try {
      await this.service.resendResetPasswordEmail(email);
      res.send({ message: 'Ссылка для сброса пароля повторно отправлена на ваш email' });
    } catch (e) {
      res.status(500).send({ error: { message: (e as Error).message}});
    }
  }

  // Поиск пользователя по токену для сброса пароля
  findByResetPasswordToken: RequestHandler = async (req, res): Promise<void> => {
    try {
      const user = await this.service.findByResetPasswordToken(req.params.token);
      
      if (user) {
        res.send(user);
      } else {
        res.send(null);
      }
    } catch (error) {
      res.status(500).send({ error: { message: 'Ошибка поиска пользователя' } });
    }
  }

  // Функция для сброса пароля
  resetPassword: RequestHandler = async (req, res): Promise<void> => {
    const resetPasswordDto = new ResetPasswordDto();
    resetPasswordDto.resetPasswordToken = req.params.token;
    resetPasswordDto.password = req.body.password;
    
    const errors = await validate(resetPasswordDto, { 
      whitelist: true, 
      validationError: { target: false, value: false } 
    });
    if (errors.length > 0) {
      res.status(400).send(formatErrors(errors));
      return;
    }

    try {
      await this.service.resetPassword(resetPasswordDto);
      res.send({ message: 'Пароль успешно изменен' });
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