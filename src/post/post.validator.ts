import { Injectable } from "@nestjs/common";
import * as Joi from "joi";
import BaseValidator from "../helpers/base-validator";

@Injectable()
export class PostValidator extends BaseValidator {

    private readonly createPostSchema = Joi.object({
        title: Joi.string().max(255).required(),
        content: Joi.string().required(),
        authorId: Joi.number().required(),
        coverImage: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required(),
        timeToRead: Joi.number().max(120).required(),
    });

    validatePostCreationData = (data: any) => this.validateOrThrow(data, this.createPostSchema);
}
