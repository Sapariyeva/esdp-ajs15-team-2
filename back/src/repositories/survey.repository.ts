import { Repository } from "typeorm";
import { Survey } from "../entities/survey.entity";
import { appDataSource } from "../dataSource/dataSource";
import { SurveyDto } from "../dto/survey.dto";

export class SurveyRepository extends Repository<Survey> {
    constructor() {
        super(Survey, appDataSource.createEntityManager());
    }

    async createSurvey(survey: SurveyDto): Promise<Survey> {
        return await this.save(survey);
    }
}