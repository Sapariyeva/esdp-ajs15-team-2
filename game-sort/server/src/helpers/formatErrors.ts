import { ValidationError } from "class-validator";

export interface IUpdatedError {
  type: string; 
  message: string[];
}

export function formatErrors(errors: ValidationError[]) {
  const updatedErrors: IUpdatedError[] = [];

  errors.forEach(error => {
    if(error.constraints) {
      const updatedError: IUpdatedError = {
        type: error.property,
        message: Object.values(error.constraints),
      };
      updatedErrors.push(updatedError);
    }
  });

  return updatedErrors;
}