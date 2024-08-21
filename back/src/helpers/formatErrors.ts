import { ValidationError } from 'class-validator';
import i18next from 'i18next';

export const formatErrors = (errors: ValidationError[], lang: string) => {
    const updatedErrors: { type: string; messages: string[] }[] = [];

    errors.forEach((e) => {
        if (e.constraints) {
            const error = {
                type: e.property,
                messages: Object.values(e.constraints).map(message => i18next.t(message, { lng: lang })),
            };
            updatedErrors.push(error);
        }
    });
    return updatedErrors;
};
