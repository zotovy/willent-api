import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from "@nestjs/graphql";

export const UserId = createParamDecorator((data, context: ExecutionContext)  => {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.userId;
});
