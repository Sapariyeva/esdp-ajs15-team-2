import cors from 'cors';
import App from './app';
import logger from './middlewares/logger';
import { UserRoute } from './routes/user.route';

const app = new App({
    port: 8000,
    middlewares: [logger(), cors()],
    controllers: [ new UserRoute() ],
});

app.listen();