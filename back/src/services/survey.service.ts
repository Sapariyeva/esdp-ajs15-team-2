import { SurveyDto } from "@/dto/survey.dto";
import { Survey } from "@/entities/survey.entity";
import { SurveyRepository } from "@/repositories/survey.repository";

export class SurveyService {
    private repository: SurveyRepository;

    constructor() {
        this.repository = new SurveyRepository();
    }

    async createSurvey(survey: SurveyDto): Promise<Survey> {
        return await this.repository.createSurvey(survey);
    }
}