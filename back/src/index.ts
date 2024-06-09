import cors from 'cors';
import App from './app';
import logger from './middlewares/logger';




const app = new App({
    port: 5000,
    middlewares: [logger(), cors()],
    controllers: [],
});

app.listen();
