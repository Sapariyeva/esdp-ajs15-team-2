// Импортируем методы
const { startScheduler, createTask } = require("./taskScheduler");

// Пример использования:
const task1 = createTask(async () => {
  console.log("Task 1 executed at", new Date().toLocaleTimeString());
  // Вывод в консоль заменить на вашу асинхронную задачу
});

const task2 = createTask(async () => {
  console.log("Task 2 executed at", new Date().toLocaleTimeString());
  // Вывод в консоль заменить на вашу асинхронную задачу
});

// Запуск планировщика с заданиями каждые 5 секунд
startScheduler([task1, task2], "*/5 * * * * *");
