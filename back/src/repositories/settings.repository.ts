import { appDataSource } from "../dataSource/dataSource";
import { SettingsDto } from "../dto/settings.dto";
import { Settings } from "../entities/settings.entity";
import { Repository } from "typeorm";

export class SettingsRepository extends Repository<Settings> {
    constructor() {
        super(Settings, appDataSource.createEntityManager());
    }

    async createOptions(options: SettingsDto): Promise<Settings> {
        return await this.save(options);
    }

}