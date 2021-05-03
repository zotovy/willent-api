import { Module } from '@nestjs/common';
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { PrismaModule } from "../prisma/prisma.module";
import { UserValidator } from "./user.validator";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [PrismaModule, AuthModule],
    providers: [UserService, UserResolver, UserValidator]
})
export class UserModule {}
