import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { IUser } from "@/interfaces/IUser.interface";

import { SettingsDto } from '@/dto/settings.dto';
import { SettingsService } from '@/services/settings.service';


export interface RequestWithUser extends Request {
    user?: IUser;
}

export class SettingsController {
    private service: SettingsService;

    constructor() {
        this.service = new SettingsService();
    }

    createOptions: RequestHandler = async (req, res) => {
        try {
            const optionDto = plainToInstance(SettingsDto, req.body);
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            if (files.image) optionDto.image = files.image[0].filename;
            if (files.video) optionDto.video = files.video[0].filename;

            const option = await this.service.createOptions(optionDto);
            res.send(option);
        } catch (error) {
            console.error('Error in createOptions:', error);
            res.status(500).send('An error occurred while processing your request.');
        }
    }

}