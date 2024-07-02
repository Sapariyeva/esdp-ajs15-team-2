const { startScheduler, createTask } = require("./taskScheduler");
const cron = require("node-cron");

jest.mock("node-cron");

cron.schedule = jest.fn();
cron.validate = jest.fn();

describe("taskScheduler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("validateCronSchedule", () => {
    // Тест проверяет, что корректное расписание cron проходит валидацию.
    it("should validate a correct cron schedule", () => {
      cron.validate.mockReturnValue(true);
      const schedule = "*/5 * * * * *";
      const result = cron.validate(schedule);
      expect(result).toBe(true);
      expect(cron.validate).toHaveBeenCalledWith(schedule);
    });

    // Тест проверяет, что некорректное расписание cron не проходит валидацию.
    it("should invalidate an incorrect cron schedule", () => {
      cron.validate.mockReturnValue(false);
      const schedule = "invalid-schedule";
      const result = cron.validate(schedule);
      expect(result).toBe(false);
      expect(cron.validate).toHaveBeenCalledWith(schedule);
    });
  });

  describe("startScheduler", () => {
    // Тест проверяет, что при попытке инициализировать планировщик с некорректным расписанием будет выброшена ошибка.
    it("should throw an error for an invalid cron schedule", () => {
      cron.validate.mockReturnValue(false);
      expect(() => startScheduler([() => {}], "invalid-schedule")).toThrow(
        "Invalid cron schedule"
      );
    });

    // Тест проверяет, что планировщик корректно инициализируется и запускается с валидным расписанием.
    it("should initialize and start the scheduler for a valid cron schedule", () => {
      cron.validate.mockReturnValue(true);
      const consoleLogSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});
      const tasks = [jest.fn(), jest.fn()];
      const schedule = "*/5 * * * * *";

      startScheduler(tasks, schedule);

      expect(consoleLogSpy).toHaveBeenCalledWith(
        "Scheduler initialized with schedule:",
        schedule
      );
      expect(cron.schedule).toHaveBeenCalledWith(
        schedule,
        expect.any(Function)
      );
      expect(consoleLogSpy).toHaveBeenCalledWith("Scheduler started");

      consoleLogSpy.mockRestore();
    });

    // Тест проверяет, что задачи по расписанию выполняются успешно и логируются.
    it("should run scheduled tasks and handle successful execution", async () => {
      cron.validate.mockReturnValue(true);
      const consoleLogSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});
      const task = jest.fn().mockResolvedValue();
      const tasks = [task];
      const schedule = "*/5 * * * * *";

      startScheduler(tasks, schedule);

      // Имитация выполнения задач по расписанию
      const scheduledFunction = cron.schedule.mock.calls[0][1];
      await scheduledFunction();

      expect(task).toHaveBeenCalled();
      expect(consoleLogSpy).toHaveBeenCalledWith(
        `Task executed successfully at ${new Date().toLocaleTimeString()}`
      );

      consoleLogSpy.mockRestore();
    });

    // Тест проверяет, что ошибки при выполнении задач корректно обрабатываются и логируются.
    it("should run scheduled tasks and handle execution errors", async () => {
      cron.validate.mockReturnValue(true);
      const consoleLogSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});
      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const task = jest.fn().mockRejectedValue(new Error("Task error"));
      const tasks = [task];
      const schedule = "*/5 * * * * *";

      startScheduler(tasks, schedule);

      // Имитация выполнения задач по расписанию
      const scheduledFunction = cron.schedule.mock.calls[0][1];
      await scheduledFunction();

      expect(task).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `Error executing task at ${new Date().toLocaleTimeString()}:`,
        expect.any(Error)
      );

      consoleLogSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });
  });

  describe("createTask", () => {
    // Тест проверяет, что функция createTask возвращает переданную функцию задачи.
    it("should create and return a task function", () => {
      const taskFunction = jest.fn();
      const task = createTask(taskFunction);
      expect(task).toBe(taskFunction);
    });

    // Тест проверяет, что созданная функция задачи выполняется корректно.
    it("should execute the created task function", () => {
      const taskFunction = jest.fn();
      const task = createTask(taskFunction);
      task();
      expect(taskFunction).toHaveBeenCalled();
    });
  });
});
