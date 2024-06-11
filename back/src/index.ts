import cors from 'cors';
import App from './app';
import logger from './middlewares/logger';
import { AuthRoute } from './routes/auth.route';
import { FoundOutTypeRoute } from './routes/foundOutType.route';
import { WhereFoundOutRoute } from './routes/whereFoundOut.route';
import { OrganizationRoute } from './routes/organization.route';
import { ClassRoute } from './routes/class.route';

const app = new App({
    port: 8000,
    middlewares: [logger(), cors()],
    controllers: [
        new AuthRoute(),
        new FoundOutTypeRoute(),
        new WhereFoundOutRoute(),
        new OrganizationRoute(),
        new ClassRoute(),
    ],
});

app.listen();