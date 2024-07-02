const cron = require("node-cron");

/**
 * Валидация строки расписания cron.
 * @param {string} schedule - расписание задач в формате cron
 * @returns {boolean} - true если расписание валидно, иначе false
 */
// @example
// Проверка валидного расписания
// console.log(validateCronSchedule("*/5 * * * * *")); // true
//
// Проверка невалидного расписания
// console.log(validateCronSchedule("invalid-schedule")); // false
function validateCronSchedule(schedule) {
  return cron.validate(schedule);
}

/**
 * Инициализация и запуск задач по расписанию
 * @param {Array} tasks - массив задач для выполнения по расписанию
 * @throws {Error} - Если расписание не валидно
 * @param {string} schedule - расписание задач в формате cron:
 * ┌────────────── секунды (опционально)
 * │ ┌──────────── минуты
 * │ │ ┌────────── часы
 * │ │ │ ┌──────── день месяца
 * │ │ │ │ ┌────── месяц
 * │ │ │ │ │ ┌──── день недели
 * │ │ │ │ │ │
 * │ │ │ │ │ │
 * * * * * * *
 *
 * Возможные значения:
 * секунды	0-59
 * минуты	0-59
 * часы	0-23
 * день месяца	1-31
 * месяц	1-12 (или названия, например Jan или January)
 * день недели	0-7 (или названия, например Sun или Sunday; 0 или 7 это воскресенье)
 *
 * За дополнительной информацией можно обратиться к документации
 * библиотеки node-cron: https://www.npmjs.com/package/node-cron
 */
// @example
// const task1 = () => console.log("Task 1 executed");
// const task2 = () => console.log("Task 2 executed");
// startScheduler([task1, task2], "*/5 * * * * *");
function startScheduler(tasks, schedule) {
  if (!validateCronSchedule(schedule)) {
    throw new Error("Invalid cron schedule");
  }

  console.log("Scheduler initialized with schedule:", schedule);

  // Расписание задач, используя системное время сервера
  cron.schedule(schedule, async () => {
    console.log("Running scheduled tasks at", new Date().toLocaleTimeString());

    for (const task of tasks) {
      try {
        await task();
        console.log(
          `Task executed successfully at ${new Date().toLocaleTimeString()}`
        );
      } catch (err) {
        console.error(
          `Error executing task at ${new Date().toLocaleTimeString()}:`,
          err
        );
      }
    }
  });

  console.log("Scheduler started");
}

/**
 * Функция для создания новой задачи
 * @param {Function} task - функция, представляющая задачу
 * @returns {Function} - Возвращает функцию задачи
 * @example
 * const task = createTask(() => console.log("Task executed"));
 * task(); // "Task executed"
 */
function createTask(task) {
  return task;
}

module.exports = {
  startScheduler,
  createTask,
};
