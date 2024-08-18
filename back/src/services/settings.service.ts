import { SettingsDto } from "../dto/settings.dto";
import { SettingsRepository } from "../repositories/settings.repository";
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { formatErrors } from "../helpers/formatErrors";

interface ISettings {
    id: number,
    title: string,
    image: string,
    video: string,
}

export class SettingsService {
    private repository: SettingsRepository;

    constructor() {
        this.repository = new SettingsRepository();
    }

    async createOptions(data: SettingsDto): Promise<ISettings> {
        const errors = await validate(plainToInstance(SettingsDto, data), {
            whitelist: true,
            validationError: { target: false, value: false },
        });

        if (errors.length > 0) {
            throw formatErrors(errors);
        }
        return await this.repository.createOptions(data);
    }

}