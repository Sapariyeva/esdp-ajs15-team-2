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
        Возвращаемый ответ
        ```
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
</details>

<details>
    <summary><h2>GET</h2></summary>
    <details>
        <summary>
            <h3><code>/users</code> - возвращает список пользователей.</h3>
        </summary>
        Этот запрос возвращает список всех пользователей.
        <summary>
            Возможные ответы:
            <p>200 OK: Успешное получение списка пользователей.</p>
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
        </summary>
    </details>
    <details>
        <summary>
            <h3><code>/confirm/:token</code> - подтверждение email пользователя.</h3>
        </summary>
        <h4>Этот запрос подтверждает email пользователя по токену.<h4>
        <summary>
            Параметры URL:
            <b><code>token</code></b> - токен, отправленный на email пользователя.
        </summary>
        <summary>
            Возможные ответы:
        </summary>
        <summary>
            <ul>
                <li>
                    <b><code>**200 OK**:</code> Успешное подтверждение email.</b>
                </li>
                <li>
                    <b><code>**400 Bad Request**:</code> Недействительная ссылка подтверждения.</b>
                </li>
                <li>
                    <b><code>**500 Internal Server Error**:</code> 
                        Ошибка на сервере при подтверждении email.
                        <p>json
                            {
                                "error": { "message": "Ошибка подтверждения электронной почты" }
                            }
                        </p>
                    </b>
                </li>
            </ul>
        </summary>
    </details>
</details>


<details>
    <summary><h2>DELETE</h2></summary>
</details>