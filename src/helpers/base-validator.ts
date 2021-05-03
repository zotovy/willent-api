import * as Joi from "joi";
import { HttpException, HttpStatus } from "@nestjs/common";

export default class BaseValidator {
    protected validateOrThrow(data: any, schema: Joi.Schema) {
        const result = schema.validate(data);
        if (result.error) {
            throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
        }
    }
}
