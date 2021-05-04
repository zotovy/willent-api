import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as Joi from "joi";
import BaseValidator from "../helpers/base-validator";

@Injectable()
export class UserValidator extends BaseValidator{

    private readonly passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    private readonly signupSchema = Joi.object({
        name: Joi.string().min(1).max(255).required(),
        email: Joi.string().email().required().max(255),
        password: Joi.string().regex(this.passwordRegex).required().min(0).max(255),
    });
    validateSignupData = (data: any) => this.validateOrThrow(data, this.signupSchema);

    private readonly updateSchema = Joi.object({
        name: Joi.string().min(1).max(255),
        email: Joi.string().email().max(255),
        password: Joi.string().regex(this.passwordRegex).min(0).max(255),
    });
    validateUpdateData = (data: any) => this.validateOrThrow(data, this.updateSchema);
}
