# API-документация

<details>
    <summary><h2>POST</h2></summary>
    
<details>
<summary>
    <h3><code>/users/register</code> - регистрация (создание) нового пользователя.</h3>
</summary>
    Тело запроса должно содержать поля в формате JSON:
    <ul>
        <li><b><code>email</code></b></li>
        <li><b><code>password</code></b></li>
    </ul>

**Возвращаемый ответ**
```json
{
    "success": true,
    "payload": {
        email: "exampe@gmail.com",
        id: 6,
        isEmailConfirmed: false,
        resetPasswordToken: null,
        role: "specialist", // Роль "specialist", назначается по умолчанию при регистрации
        token: "1ea13e66-1ff1-4c25-993f-7968a46d075c",
        username: "Специалист" // Имя пользователя по умолчанию "Специалист"
    }
}
```
</details>
<details>
<summary>
    <h3><code>/users/set_username</code> - изменение имени пользователя.</h3>
</summary>
    Этот запрос изменяет имя пользователя.

**Аутентификация:**
    Требуется заголовок авторизации с токеном.

<p>Тело запроса должно содержать поля в формате JSON:<p>
<ul>
  <li><b><code>username</code></b>: строка, содержащее новое имя пользователя. Не должно содержать цифр.</li>
</ul>

**Возможные ответы:**

**200 OK**: Успешное изменение имени пользователя.
```json
{
  "id": 1,
  "username": "Новое Имя",
  "email": "user@example.com",
  "role": "specialist"
}
```
- **400 Bad Request**: Неверный токен или неполные/некорректные данные.
```json
{
  "error": {
    "message": "Неверный токен или адрес электронной почты не подтвержден."
  }
}
```
- **401 Unauthorized**: Токен не предоставлен.
```json
{
  "error": {
    "message": "Unauthorized"
  }
}
```
- **500 Internal Server Error**: Ошибка на сервере при изменении имени пользователя.
```json
{
  "error": {
    "message": "Ошибка установки имени пользователя"
  }
}
```
</details>

<details>
<summary>
    <h3><code>/users/resend_confirmation</code> - повторная отправка письма для подтверждения регистрации.</h3>
</summary>
    Этот запрос повторно отправляет письмо для подтверждения регистрации на указанный email.

    Тело запроса должно содержать поля в формате JSON:
<ul>
  <li><b><code>email</code></b>: строка, содержащая email пользователя.</li>
</ul>

**Возможные ответы:**
- **200 OK**: Успешная повторная отправка письма.
```json
{
  "message": "Подтверждение повторно отправлено на вашу почту."
}
```
- **400 Bad Request**: Неверный адрес электронной почты.
```json
{
  "error": {
    "message": "Неверный адрес электронной почты."
  }
}
```
</details>

<details>
    <summary>
      <h3><code>/users/login</code> - аутентификация пользователя.</h3>
    </summary>

    Этот запрос выполняет аутентификацию пользователя по email и паролю.

Тело запроса должно содержать поля в формате JSON:
<ul>
  <li><b><code>email</code></b>: строка, содержащая email пользователя.</li>
  <li><b><code>password</code></b>: строка, содержащая пароль пользователя (минимум 8 символов).</li>
</ul>

**Возможные ответы:**
- **200 OK**: Успешная аутентификация пользователя.
```json
{
  "id": 1,
  "username": "User1",
  "email": "user1@example.com",
  "role": "specialist",
  "token": "some-jwt-token"
}
```
- **401 Unauthorized**: Неверные данные для входа.
```json
{
  "error": {
    "message": "Ошибка данных"
  }
}
```
- **500 Internal Server Error**: Ошибка на сервере при аутентификации пользователя.
```json
{
  "error": {
    "message": "Произошла ошибка при аутентификации"
  }
}
```
</details>

<details>
    <summary>
      <h3><code>/users/request_password_reset</code> - отправка ссылки для подтверждения сброса пароля.</h3>
    </summary>

    Этот запрос отправляет ссылку для сброса пароля на указанный email.

**Тело запроса:**
<ul>
  <li><b><code>email</code></b>: строка, содержащая email пользователя.</li>
</ul>

**Возможные ответы:**
- **200 OK**: Успешная отправка ссылки для сброса пароля.
```json
{
  "message": "Ссылка для сброса пароля отправлена на ваш email"
}
```
- **500 Internal Server Error**: Ошибка на сервере при отправке письма.
```json
{
  "error": {
    "message": "Сообщение об ошибке"
  }
}
```
</details>
<details>
    <summary>
      <h3><code>/users/resend_password_reset</code> - повторная отправка письма для сброса пароля.</h3>
    </summary>

    Этот запрос повторно отправляет ссылку для сброса пароля на указанный email.

**Тело запроса:**
<ul>
  <li><b><code>email</code></b>: строка, содержащая email пользователя.</li>
</ul>

**Возможные ответы:**
- **200 OK**: Успешная повторная отправка ссылки для сброса пароля.
```json
{
  "message": "Ссылка для сброса пароля повторно отправлена на ваш email"
}
```
- **500 Internal Server Error**: Ошибка на сервере при повторной отправке письма.
```json
{
  "error": {
    "message": "Сообщение об ошибке"
  }
}
```
</details>
<details>
    <summary>
      <h3><code>/reset_password/:token</code> - сброс пароля.</h3>
    </summary>

    Этот запрос выполняет сброс пароля пользователя по указанному токену.

**Параметры URL:**
<ul>
  <li><b><code>token</code></b>: строка, содержащая токен для сброса пароля.</li>
</ul>

**Тело запроса:**
<ul>
  <li><b><code>password</code></b>: строка, содержащая новый пароль пользователя.</li>
</ul>

**Возможные ответы:**
- **200 OK**: Успешный сброс пароля.
```json
{
  "message": "Пароль успешно изменен"
}
```
- **400 Bad Request**: Ошибка валидации данных запроса.
```json
{
  "errors": [
    {
      "property": "password",
      "constraints": {
        "isString": "Пароль должен быть строкой",
        "isNotEmpty": "Укажите пароль",
        "isStrongPassword": "Пароль должен иметь длину не менее 8 символов, содержать хотя бы одну заглавную букву, одну строчную букву, одну цифру и один специальный символ."
      }
    },
    {
      "property": "resetPasswordToken",
      "constraints": {
        "isString": "Токен должен быть строкой",
        "isNotEmpty": "Укажите токен"
      }
    }
  ]
}
```
- **500 Internal Server Error**: Ошибка на сервере при сбросе пароля.
```json
{
  "error": {
    "message": "Сообщение об ошибке"
  }
}
```
</details>

<details>
    <summary>
      <h3><code>/surveys</code> - создание нового опроса.</h3>
    </summary>

    Этот запрос создает новый опрос на основе предоставленных данных.

**Тело запроса:**
```json
{
  "userId": 1,
  "source": "example source" // не обязательное поле
}
```

**Возможные ответы:**
- **200 OK**: Успешное создание опроса, возвращает созданный опрос.
```json
{
  "id": 123,
  "userId": 1,
  "source": "example source",
  "createdAt": "2024-07-25T00:00:00.000Z"
}
```
- **400 Bad Request**: Неверные данные запроса.
```json
{
  "error": {
    "message": "Ошибка валидации данных"
  }
}
```
- **500 Internal Server Error**: Ошибка сервера при создании опроса.
```json
{
  "error": {
    "message": "Ошибка создания опроса"
  }
}
```
</details>

<details>
    <summary>
      <h3><code>/statistic/create</code> - создание новой статистики.</h3>
    </summary>

    Создает новую статистику на основе предоставленных данных.

**Тело запроса:**
```json
{
  "userId": 1,
  "datetime": "2024-07-25T00:00:00.000Z",
  "successCriteria": 80
}
```

**Возможные ответы:**
- **200 OK**: Успешное создание статистики.
```json
{
  "id": 1,
  "userId": 1,
  "datetime": "2024-07-25T00:00:00.000Z",
  "successCriteria": 80
}
```
- **400 Bad Request**: Неверные данные запроса.
```json
{
  "message": "Ошибка валидации данных",
  "detailedMessage": "Подробное сообщение об ошибке"
}
```
- **500 Internal Server Error**: Ошибка сервера при создании статистики.
```json
{
  "message": "Ошибка создания статистики",
  "detailedMessage": "Подробное сообщение об ошибке"
}
```
</details>

<details>
    <summary>
      <h3><code>/cards</code> - Создание новой карточки.</h3>
    </summary>

    Создает новую карточку. Поддерживает загрузку изображения и видео.

**Форма запроса:**
- `image` (файл): Изображение карточки.
- `video` (файл): Видео карточки.

**Тело запроса:**
```json
{
  "title": "Название карточки",
  "category": "Категория карточки"
}
```

**Возможные ответы:**
- **200 OK**: Успешное создание карточки.
```json
{
  "id": 1,
  "title": "Название карточки",
  "image": "filename.jpg",
  "video": "filename.mp4",
  "category": "Категория карточки"
}
```
- **400 Bad Request**: Ошибка валидации данных.
```json
{
  "message": "Ошибка валидации данных",
  "detailedMessage": "Подробное сообщение об ошибке"
}
```
- **500 Internal Server Error**: Ошибка при создании карточки.
```json
{
  "message": "Ошибка создания карточки",
  "detailedMessage": "Подробное сообщение об ошибке"
}
```
</details>

</details>

<details>
<summary><h2>GET</h2></summary>
<details>
<summary>
    <h3><code>/users</code> - возвращает список пользователей.</h3>
</summary>
    Этот запрос возвращает список всех пользователей.
    
**Возможные ответы:**

- **200 OK**: Успешное получение списка пользователей.
```json
    [
      {
        "id": 1,
        "username": "User1",
        "email": "user1@example.com",
        "role": "specialist"
      },
      {
        "id": 2,
        "username": "User2",
        "email": "user2@example.com",
        "role": "admin"
      }
      // Пример структуры возвращаемых данных
    ]
```
</details>

<details>
<summary>
    <h3><code>/users/confirm/:token</code> - подтверждение email пользователя.</h3>
</summary>
        
    Этот запрос подтверждает email пользователя по токену.
<summary>
    Параметры URL:
    <b><code>token</code></b> - токен, отправленный на email пользователя.
</summary>
        
**Возможные ответы:**
<summary>

**200 OK**: Успешное подтверждение email.

**400 Bad Request**: Недействительная ссылка подтверждения.

**500 Internal Server Error**: Ошибка на сервере при подтверждении email.
```json
{
    "error": { "message": "Ошибка подтверждения электронной почты" }
}
```
</details>
<details>
    <summary>
      <h3><code>/users/find_by_email/:email</code> - поиск пользователя по почте.</h3>
    </summary>

    Этот запрос выполняет поиск пользователя по указанному email.

**Параметры URL:**
<ul>
  <li><b><code>email</code></b>: строка, содержащая email пользователя для поиска.</li>
</ul>

**Возможные ответы:**
- **200 OK**: Успешное получение данных пользователя.
```json
{
  "id": 1,
  "username": "Специалист",
  "email": "user1@example.com",
  "role": "specialist",
  "isEmailConfirmed": false, // Значение по дефолту - меняется на true после подтверждения почты пользователем
  "token": "1ea13e66-1ff1-4c25-993f-7968a46d075c",
  "resetPasswordToken": null
}
```
- **400 Bad Request**: Неверный адрес электронной почты.
```json
{
  "error": {
    "message": "Неверный адрес электронной почты."
  }
}
```
- **500 Internal Server Error**: Ошибка на сервере при поиске пользователя.
```json
{
  "error": {
    "message": "Ошибка поиска пользователя"
  }
}
```
</details>

<details>
    <summary>
      <h3><code>/users/find_by_reset_password_token/:token</code> - поиск пользователя по токену сброса пароля.</h3>
    </summary>
    
    Этот запрос выполняет поиск пользователя по указанному токену для сброса пароля.

**Параметры URL:**
<ul>
  <li><b><code>token</code></b>: строка, содержащая токен сброса пароля для поиска пользователя.</li>
</ul>

**Возможные ответы:**
- **200 OK**: Успешное получение данных пользователя.
```json
{
  "id": 1,
  "username": "Специалист",
  "email": "user1@example.com",
  "role": "specialist",
  "isEmailConfirmed": false,
  "token": "1ea13e66-1ff1-4c25-993f-7968a46d075c",
  "resetPasswordToken": "699adba5-fecc-4237-ae06-eeda8c63dcaa"
}
```
- **200 OK**: Пользователь с указанным токеном не найден.
```json
null
```
- **500 Internal Server Error**: Ошибка на сервере при поиске пользователя.
```json
{
  "error": {
    "message": "Ошибка поиска пользователя"
  }
}
```
</details>

<details>
    <summary>
      <h3><code>/users/auth/google</code> - аутентификация через Google.</h3>
    </summary>

    Этот запрос перенаправляет пользователя на страницу аутентификации Google для получения доступа к профилю и email.

**Возможные ответы:**
- **302 Found**: Перенаправление на страницу аутентификации Google.
</details>

<details>
    <summary>
      <h3><code>/users/auth/google/callback</code> - обработка обратного вызова после аутентификации через Google.</h3>
    </summary>

    Этот запрос обрабатывает ответ от Google после аутентификации.

**Возможные ответы:**
- **302 Found**: Перенаправление на страницу успеха с данными пользователя.
```json
{
  "redirect": "http://localhost:5173/auth/google/success?user=<USER_DATA>"
}
```
- **302 Found**: Перенаправление на главную страницу при ошибке аутентификации.
```json
{
  "redirect": "/"
}
```
</details>

<details>
    <summary>
      <h3><code>/statistic</code> - получение всех статистик.</h3>
    </summary>

    Возвращает список всех статистик.

**Возможные ответы:**
- **200 OK**: Успешное получение списка статистик.
```json
[
  {
    "id": 1,
    "userId": 1,
    "datetime": "2024-07-25T00:00:00.000Z",
    "successCriteria": 80
  },
  {
    "id": 2,
    "userId": 2,
    "datetime": "2024-07-25T00:00:00.000Z",
    "successCriteria": 90
  }
]
```
- **500 Internal Server Error**: Ошибка сервера при получении статистик.
```json
{
  "error": {
    "message": "Ошибка получения статистик"
  }
}
```
</details>

<details>
    <summary>
      <h3><code>/statistic/:id</code> - получение статистики по идентификатору.</h3>
    </summary>

    Возвращает статистику по заданному идентификатору.

**Параметры запроса:**
- `id` (number, обязательный): Идентификатор статистики.

**Возможные ответы:**
- **200 OK**: Успешное получение статистики.
```json
{
  "id": 1,
  "userId": 1,
  "datetime": "2024-07-25T00:00:00.000Z",
  "successCriteria": 80
}
```
- **400 Bad Request**: Статистика не найдена.
```json
{
  "message": "Statistic not found",
  "detailedMessage": "Подробное сообщение об ошибке"
}
```
- **500 Internal Server Error**: Ошибка сервера при получении статистики.
```json
{
  "message": "Ошибка получения статистики",
  "detailedMessage": "Подробное сообщение об ошибке"
}
```
</details>

<details>
    <summary>
      <h3><code>/cards</code> - Получение всех карточек по категории.</h3>
    </summary>

    Возвращает карточки, относящиеся к указанной категории.

**Параметры запроса:**
- `category` (string, обязательный): Категория карточек.

**Возможные ответы:**
- **200 OK**: Успешное получение карточек.
```json
[
  {
    "id": 1,
    "title": "Карточка 1",
    "image": "image1.jpg",
    "video": "video1.mp4",
    "category": "Категория 1"
  }
]
```
- **500 Internal Server Error**: Ошибка при получении карточек.
```json
{
  "message": "Ошибка получения карточек"
}
```
</details>

<details>
    <summary>
      <h3><code>/cards/all</code> - Получение всех карточек.</h3>
    </summary>

    Возвращает все карточки без фильтрации по категории.

**Возможные ответы:**
- **200 OK**: Успешное получение всех карточек.
```json
[
  {
    "id": 1,
    "title": "Карточка 1",
    "image": "image1.jpg",
    "video": "video1.mp4",
    "category": "Категория 1"
  }
]
```
- **500 Internal Server Error**: Ошибка при получении карточек.
```json
{
  "message": "Ошибка получения карточек"
}
```
</details>

 <details>
    <summary>
      <h3><code>/cards/show</code> - Получение карточек для игры "покажи".</h3>
    </summary>

    Возвращает карточки для игры "покажи", фильтруя по указанным категориям.

**Параметры запроса:**
- `category` (string[]): Массив категорий.

**Возможные ответы:**
- **200 OK**: Успешное получение карточек.
```json
[
  {
    "id": 1,
    "title": "Карточка 1",
    "image": "image1.jpg",
    "video": "video1.mp4",
    "category": "Категория 1"
  }
]
```
- **500 Internal Server Error**: Ошибка при получении карточек.
```json
{
  "message": "Ошибка получения карточек"
}
```
</details>

<details>
    <summary>
      <h3><code>/cards/:id</code> - Получение карточки по идентификатору.</h3>
    </summary>

    Возвращает карточку по указанному идентификатору.

**Параметры запроса:**
- `id` (number, обязательный): Идентификатор карточки.

**Возможные ответы:**
- **200 OK**: Успешное получение карточки.
```json
{
  "id": 1,
  "title": "Карточка 1",
  "image": "image1.jpg",
  "video": "video1.mp4",
  "category": "Категория 1"
}
```
- **400 Bad Request**: Карточка не найдена.
```json
{
  "message": "Card not found",
  "detailedMessage": "Подробное сообщение об ошибке"
}
```
- **500 Internal Server Error**: Ошибка при получении карточки.
```json
{
  "message": "Ошибка получения карточки",
  "detailedMessage": "Подробное сообщение об ошибке"
}
```
</details>

</details>

<details>
    <summary><h2>DELETE</h2></summary>
<details>
<summary>
  <h3><code>/users/logout</code> - выход пользователя.</h3>
</summary>

    Этот запрос выполняет выход пользователя из системы.

**Аутентификация:**
Требуется заголовок авторизации с токеном.

**Возможные ответы:**
- **200 OK**: Успешный выход пользователя из системы.
```json
{
  "message": "success"
}
```
- **500 Internal Server Error**: Ошибка на сервере при выходе пользователя.
```json
{
  "error": {
    "message": "Внутренняя ошибка сервера"
  }
}
```
</details>

<details>
    <summary>
      <h3><code>/statistic/delete/:id</code> - удаление статистики.</h3>
    </summary>

    Удаляет статистику по заданному идентификатору.
**Параметры запроса:**
- `id` (number, обязательный): Идентификатор статистики.

**Возможные ответы:**
- **200 OK**: Успешное удаление статистики.
```json
{
  "message": "Statistic deleted successfully"
}
```
- **400 Bad Request**: Статистика не найдена.
```json
{
  "message": "Statistic not found",
  "detailedMessage": "Подробное сообщение об ошибке"
}
```
- **500 Internal Server Error**: Ошибка сервера при удалении статистики.
```json
{
  "message": "Ошибка удаления статистики",
  "detailedMessage": "Подробное сообщение об ошибке"
}
```
</details>

<details>
    <summary>
      <h3><code>/cards/delete/:id</code> - Удаление карточки.</h3>
    </summary>

    Удаляет карточку по указанному идентификатору.

**Параметры запроса:**
- `id` (number, обязательный): Идентификатор карточки.

**Возможные ответы:**
- **200 OK**: Успешное удаление карточки.
```json
{
  "message": "Card deleted successfully"
}
```
- **400 Bad Request**: Карточка не найдена.
```json
{
  "message": "Card not found",
  "detailedMessage": "Подробное сообщение об ошибке"
}
```
- **500 Internal Server Error**: Ошибка при удалении карточки.
```json
{
  "message": "Ошибка удаления карточки",
  "detailedMessage": "Подробное сообщение об ошибке"
}
```
</details>

</details>

<details>
  <summary><h2>PUT</h2></summary>
<details>
    <summary>
      <h3><code>/statistic/update/:id</code> - обновление статистики.</h3>
    </summary>

    Обновляет статистику на основе предоставленных данных.

**Параметры запроса:**
- `id` (number, обязательный): Идентификатор статистики.

**Тело запроса:**
```json
{
  "userId": 1,
  "datetime": "2024-07-25T00:00:00.000Z",
  "successCriteria": 90
}
```

**Возможные ответы:**
- **200 OK**: Успешное обновление статистики.
```json
{
  "id": 1,
  "userId": 1,
  "datetime": "2024-07-25T00:00:00.000Z",
  "successCriteria": 90
}
```
- **400 Bad Request**: Неверные данные запроса или статистика не найдена.
```json
{
  "message": "Bad Request",
  "detailedMessage": "Подробное сообщение об ошибке"
}
```
- **500 Internal Server Error**: Ошибка сервера при обновлении статистики.
```json
{
  "message": "Ошибка обновления статистики",
  "detailedMessage": "Подробное сообщение об ошибке"
}
```
</details>

<details>
    <summary>
      <h3><code>/cards/update/:id</code> - Обновление карточки.</h3>
    </summary>

    Обновляет карточку по указанному идентификатору.

**Параметры запроса:**
- `id` (number, обязательный): Идентификатор карточки.

**Тело запроса:**
```json
{
  "title": "Новое название карточки",
  "category": "Новая категория карточки"
}
```

**Возможные ответы:**
- **200 OK**: Успешное обновление карточки.
```json
{
  "id": 1,
  "title": "Новое название карточки",
  "image": "filename.jpg",
  "video": "filename.mp4",
  "category": "Новая категория карточки"
}
```
- **400 Bad Request**: Ошибка валидации данных или карточка не найдена.
```json
{
  "message": "Bad Request",
  "detailedMessage": "Подробное сообщение об ошибке"
}
```
- **500 Internal Server Error**: Ошибка при обновлении карточки.
```json
{
  "message": "Ошибка обновления карточки",
  "detailedMessage": "Подробное сообщение об ошибке"
}
```
</details>

</details>