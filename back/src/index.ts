import cors from 'cors';
import App from './app';
import logger from './middlewares/logger';
import { AuthRoute } from './routes/auth.route';

const app = new App({
    port: 8000,
    middlewares: [logger(), cors()],
    controllers: [ new AuthRoute() ],
});

app.listen();