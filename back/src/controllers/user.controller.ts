import { RequestHandler } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import passport from 'passport';
import i18next from "i18next";
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
  };

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
      const lang = req.language || 'en';
      res.status(400).send(formatErrors(errors, lang));
      return;
    }

    try {
      const newUser = await this.service.registerUser(
        userDto.email,
        userDto.password,
        req.language
      );
      res.send(newUser);
    } catch (e) {
      const lang = req.language || 'en';
      if ((e as { message: string }).message === "Email уже используется") {
        res.status(401).send({
          error: { message: i18next.t("user_already_exists", { lng: lang }) },
        });
      } else {
        res.status(500).send({
          error: {
            message: i18next.t("something_went_wrong", { lng: lang }),
          },
        });
      }
    }
  };

  // Аутентификация пользователя
  loginUser: RequestHandler = async (req, res): Promise<void> => {
    try {
      const loginUserDto = plainToInstance(LoginDto, req.body);
      const user = await this.service.loginUser(loginUserDto, req.language);
      if (user) {
        res.send(user);
        return;
      }
      const lang = req.language;
      res
        .status(401)
        .send({ error: { message: i18next.t("data_error", { lng: lang }) } });
    } catch (e) {
      res.status(401).send({ error: { message: (e as Error).message } });
    }
  };

  // Выход пользователя
  logoutUser: RequestHandler = async (req: IRequestWithUser, res) => {
    // Проверяем, есть ли токен у пользователя
    if(!req.user?.token) return res.send({ message: "success" });
    try {
      // Получаем токен пользователя из запроса
      const { token } = req.user;

      // Вызываем сервис для логаута пользователя
      await this.service.logoutUser(token);
    } catch (e) {
      const lang = req.language;
      return res.status(500).send({
        error: { message: i18next.t("internal_server_error", { lng: lang }) },
      });
    }
    return res.send({ message: `success ` });
  }

  // Подтверждение регистрации по электронной почте
  confirmEmail: RequestHandler = async (req, res): Promise<void> => {
    const { token } = req.params;
    
    try {
      const user = await this.service.confirmEmail(token, req.language);
      const lang = req.language || 'en';
      if (user) {
        res.status(200).send(`<h1 
          style="text-align: center; margin-top: 20%; color: #9069cd;"
        >${i18next.t('registration_successful_message', { lng: lang })}</h1>
        <script>
          setTimeout(() => {
            window.closed = true;
            window.close();
          }, 3000);
        </script>`);
      } else {
        res.status(400).send(`<h1 
          style="text-align: center; margin-top: 20%; color: #9069cd;"
        >${i18next.t('invalid_link_message', { lng: lang })}</h1>
        <script>
          setTimeout(() => {
            window.closed = true;
            window.close();
          }, 3000);
        </script>`);
      }
    } catch (error) {
      const lang = req.language;
      res.status(500).send({
        error: {
          message: i18next.t("email_confirmation_error", { lng: lang }),
        },
      });
    }
  };

  // Повторная отправка письма для подтверждения регистрации
  resendConfirmationEmail: RequestHandler = async (req, res) => {
    const email = req.body.email;
    try {
      await this.service.resendConfirmationEmail(email, req.language);
      const lang = req.language;
      res
        .status(200)
        .send({ message: i18next.t("confirmation_resent", { lng: lang }) });
    } catch (error) {
      const lang = req.language;
      res.status(400).send({
        error: { message: i18next.t("invalid_email_address", { lng: lang }) },
      });
    }
  };

  // Изменение имени
  setUsername: RequestHandler = async (req, res): Promise<void> => {
    if (!req.headers.authorization) {
      res.status(401).send({ error: { message: "Unauthorized" } });
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
      const lang = req.language;
      res.status(400).send(formatErrors(errors, lang));
      return;
    }

    try {
      const user = await this.service.setUsername(
        usernameDto.token,
        usernameDto.username,
        req.language
      );
      if (user) {
        res.send(user);
      } else {
        const lang = req.language;
        res.status(400).send({
          error: {
            message: i18next.t("invalid_token_or_email_not_confirmed", {
              lng: lang,
            }),
          },
        });
      }
    } catch (error) {
      const lang = req.language;
      res.status(500).send({
        error: { message: i18next.t("username_error", { lng: lang }) },
      });
    }
  }

  // Поиск пользователя по почте
  findByEmail: RequestHandler = async (req, res): Promise<void> => {
    try {
      const user = await this.service.findByEmail(
        req.params.email,
        req.language
      );
      
      if (user) {
        res.send(user);
      } else {
        const lang = req.language;
        res.status(400).send({
          error: {
            message: i18next.t("invalid_email_address", { lng: lang }),
          },
        });
      }
    } catch (error) {
      const lang = req.language;
      res
        .status(500)
        .send({
          error: { message: i18next.t("user_search_error", { lng: lang }) },
        });
    }
  };

  // Отправка письма для сброса пароля
  resetPasswordEmail: RequestHandler = async (req, res): Promise<void> => {
    const resetPasswordRequestDto = new ResetPasswordRequestDto();
    resetPasswordRequestDto.email = req.body.email;
    try {
      await this.service.resetPasswordEmail(
        resetPasswordRequestDto.email,
        req.language
      );
      const lang = req.language;
      res.send({
        message: i18next.t("password_reset_link_sent", { lng: lang }),
      });
    } catch (e) {
      res.status(500).send({ error: { message: (e as Error).message } });
    }
  }

  // Повторная отправка письма для сброса пароля
  resendResetPasswordEmail: RequestHandler = async (req, res): Promise<void> => {
    const email = req.body.email;
    try {
      await this.service.resendResetPasswordEmail(email, req.language);
      const lang = req.language;
      res.send({
        message: i18next.t("password_reset_link_resent", { lng: lang }),
      });
    } catch (e) {
      res.status(500).send({ error: { message: (e as Error).message } });
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
      const lang = req.language;
      res
        .status(500)
        .send({
          error: { message: i18next.t("user_search_error", { lng: lang }) },
        });
    }
  };

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
      const lang = req.language;
      res.status(400).send(formatErrors(errors, lang));
      return;
    }

    try {
      await this.service.resetPassword(resetPasswordDto, req.language);
      const lang = req.language;
      res.send({ message: i18next.t("password_successfully_changed", { lng: lang }) });
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
      const lang = req.language;
      res
        .status(400)
        .send({ error: { message: i18next.t("google_auth_error", { lng: lang }) } });
    }
  });
};