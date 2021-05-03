import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApiVersionGuard } from "@nestjsx/api-version";
import { APP_GUARD } from "@nestjs/core";
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: true
        }),
        UserModule,
        PrismaModule,
        PostModule,
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
