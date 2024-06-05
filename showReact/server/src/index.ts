import cors from 'cors';
import App from './app';
import logger from './middlewares/logger';
import { CardRoute } from './routes/card.route';

const app = new App({
  port: 8000,
  middlewares: [logger(), cors({
    exposedHeaders: 'Authorization',
  })],
  controllers: [
    new CardRoute(),
  ],
});

app.listen();
