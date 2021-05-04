import { Module } from '@nestjs/common';
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { PrismaModule } from "../prisma/prisma.module";
import { UserValidator } from "./user.validator";
import { AuthModule } from "../auth/auth.module";
import { UserController } from './user.controller';

@Module({
    imports: [PrismaModule, AuthModule],
    providers: [UserService, UserResolver, UserValidator],
    controllers: [UserController]
})
export class UserModule {}
