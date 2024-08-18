import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import App from './app';
import logger from './middlewares/logger';
import { UserRoute } from './routes/user.route';
import { updateLastActivity } from './middlewares/updateLastActivity';
import { CardRoute } from './routes/card.route';
import { SurveyRoute } from './routes/survey.route';
import { StatisticRoute } from './routes/statistic.route';
import { SettingsRoute } from './routes/settings.route';

const app = new App({
    port: 8000,
    middlewares: [logger(), cors(), updateLastActivity],
    controllers: [ new UserRoute(), new CardRoute(), new StatisticRoute(), new SurveyRoute(),new SettingsRoute() ],
});

console.log('PROCESS_ENV=====' ,process.env);


app.listen();