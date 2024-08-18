import { SettingsController } from '../controllers/settings.controller';
import { IRoute } from '../interfaces/IRoute.interface';
import { Router } from 'express';
import { upload } from '../middlewares/upload';
export class SettingsRoute implements IRoute {
    public path = '/settings';
    public router = Router();
    private controller: SettingsController;

    constructor() {
        this.controller = new SettingsController();
        this.init();
    }

    private init() {
        this.router.post(
            '/',
            upload.fields([
                { name: 'image', maxCount: 1 },
                { name: 'video', maxCount: 1 }
            ]),
            this.controller.createOptions
        );
    }
}