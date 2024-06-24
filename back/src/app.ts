import express from 'express';
import { Application, RequestHandler } from 'express';
import { AppInit } from './interfaces/AppInit.interface';
import { IRoute } from './interfaces/IRoute.interface';
import { appDataSource } from './dataSource/dataSource';
import session from 'express-session';
import passport from 'passport';
import './config/passportConfig';

class App {
    public app: Application;
    public port: number;
    constructor(appInit: AppInit) {
        this.app = express();
        this.port = appInit.port;

        this.initAssets();
        this.initMiddlewares(appInit.middlewares);
        this.initRoutes(appInit.controllers);

        this.app.get('/api', (req, res) => {
            res.json({ hello: 'Hello World!'});
        });
    }
    private initMiddlewares(middlewares: RequestHandler[]) {
        middlewares.forEach((middleware) => {
            this.app.use(middleware);
        });
        this.app.use(session({
            secret: 'your-secret-key',
            resave: false,
            saveUninitialized: false
        }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }
    private initRoutes(routes: IRoute[]) {
        routes.forEach((route) => {
            this.app.use(route.path, route.router);
        });
    }
    private initAssets() {
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }
    public async listen() {
        await appDataSource.initialize();
        this.app.listen(this.port, () => {
            console.log(`App listening  on the http://localhost:${this.port}`);
            process.on('exit', () => {
                appDataSource.destroy();
            })
        });
    }
}

export default App;