import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: true
        }),
        UserModule,
        PrismaModule,
    ],
})
export class AppModule {
}
