import cors from 'cors';
import App from './app';
import logger from './middlewares/logger';
import { UserRoute } from './routes/user.route';
import { updateLastActivity } from './middlewares/updateLastActivity';
import { CardRoute } from './routes/card.route';
import { SurveyRoute } from './routes/survey.route';

const app = new App({
    port: 8000,
    middlewares: [logger(), cors(), updateLastActivity],
    controllers: [ new UserRoute(), new CardRoute(), new SurveyRoute() ],
});

app.listen();