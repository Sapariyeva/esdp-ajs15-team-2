import { Router } from "express";
import { SurveyController } from "@/controllers/survey.controller";

export class SurveyRoute {
    public path = '/surveys';
    public router = Router();
    private controller: SurveyController;

    constructor() {
        this.controller = new SurveyController();
        this.init();
    }

    private init() {
        this.router.post('/', this.controller.createSurvey);
    }
}