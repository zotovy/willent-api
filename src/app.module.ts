import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApiVersionGuard } from "@nestjsx/api-version";
import { APP_GUARD } from "@nestjs/core";
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLFormattedError } from "graphql";

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: true,
            context: ({ req }) => ({ ...req }),
            debug: process.env.NODE_ENV !== "production",
            formatError: error => {
                if (error.message === 'VALIDATION_ERROR') {
                    const extensions = {
                        code: 'VALIDATION_ERROR',
                        errors: [],
                    };

                    Object.keys(error.extensions.invalidArgs).forEach((key) => {
                        const constraints = [];
                        Object.keys(error.extensions.invalidArgs[key].constraints).forEach(
                            (_key) => {
                                constraints.push(
                                    error.extensions.invalidArgs[key].constraints[_key],
                                );
                            },
                        );

                        extensions.errors.push({
                            field: error.extensions.invalidArgs[key].property,
                            errors: constraints,
                        });
                    });

                    const graphQLFormattedError: GraphQLFormattedError = {
                        message: 'VALIDATION_ERROR',
                        extensions: extensions,
                    };

                    return graphQLFormattedError;
                } else {
                    return error;
                }
            }
        }),
        UserModule,
        PrismaModule,
        PostModule,
        AuthModule,
    ]
})
export class AppModule {
}
