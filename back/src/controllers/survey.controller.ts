import { RequestHandler } from "express";
import { plainToInstance } from "class-transformer";
import { SurveyService } from "../services/survey.service";
import { SurveyDto } from "../dto/survey.dto";

export class SurveyController {
    private service: SurveyService;

    constructor() {
        this.service = new SurveyService();
    }

    createSurvey: RequestHandler = async (req, res): Promise<void> => {
        const surveyDto = plainToInstance(SurveyDto, req.body);
        const survey = await this.service.createSurvey(surveyDto);
        res.send(survey);
    };

}