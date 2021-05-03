import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApiVersionGuard } from "@nestjsx/api-version";
import { APP_GUARD } from "@nestjs/core";
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: true,
            context: ({ req }) => ({ ...req }),
        }),
        UserModule,
        PrismaModule,
        PostModule,
        AuthModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ApiVersionGuard,
        },
    ]
})
export class AppModule {
}
