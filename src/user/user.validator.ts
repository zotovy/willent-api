import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as Joi from "joi";

@Injectable()
export class UserValidator {

    private readonly passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    private validateOrThrow(data: any, schema: Joi.Schema) {
        const result = schema.validate(data);
        if (result.error) {
            throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
        }
    }

    private readonly signupSchema = Joi.object({
        name: Joi.string().min(1).max(255),
        email: Joi.string().email().required().max(255),
        password: Joi.string().regex(this.passwordRegex).required().min(0).max(255),
    });

    public validateSignupData = (data: any) => this.validateOrThrow(data, this.signupSchema);
}
