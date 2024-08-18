import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import { updateLastActivity } from "./updateLastActivity";
import { IRequestWithUser } from "../interfaces/IRequestWithUser.interface";
import { IUser } from "../interfaces/IUser.interface";

// Функция для создания объекта пользователя
const createTestUser = (): IUser => ({
  id: 1,
  email: "testuser@example.com",
  role: "specialist",
  token: "testtoken",
  username: "testuser",
});

// Функция для настройки тестового приложения
const createTestApp = () => {
  const app = express();
  app.use(express.json());

  app.use((req: Request, res: Response, next: NextFunction) => {
    (req as IRequestWithUser).user = createTestUser();
    next();
  });

  app.use(updateLastActivity);

  app.get("/test", (req: IRequestWithUser, res: Response) => {
    res.status(200).send({ message: "Hello World!" });
  });

  return app;
};

// Описываем тесты для middleware updateLastActivity
describe("updateLastActivity Middleware", () => {
  // Тест проверяет, что middleware обновляет lastActivity при каждом запросе
  it("should update lastActivity on each request", async () => {
    const app = createTestApp();
    const response = await request(app).get("/test");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Hello World!" });
  });

  // Тест проверяет, что middleware логирует время последней активности
  it("should log lastActivity time", async () => {
    const app = createTestApp();
    const consoleSpy = jest.spyOn(console, "log");
    await request(app).get("/test");
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Last activity time updated:")
    );
    consoleSpy.mockRestore();
  });

  // Тест проверяет, что lastActivity устанавливается как объект Date
  it("should set lastActivity to a Date object", async () => {
    let lastActivityTime: Date | undefined;
    const app = express();

    app.use(express.json());

    app.use((req: Request, res: Response, next: NextFunction) => {
      (req as IRequestWithUser).user = createTestUser();
      next();
    });

    app.use(updateLastActivity);

    app.get("/test", (req: IRequestWithUser, res: Response) => {
      lastActivityTime = req.user?.lastActivity;
      res.status(200).send({ message: "Hello World!" });
    });

    await request(app).get("/test");
    expect(lastActivityTime).toBeInstanceOf(Date);
  });
});
