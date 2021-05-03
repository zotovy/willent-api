import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PrismaModule } from "../prisma/prisma.module";
import { PostResolver } from './post.resolver';
import { PostValidator } from "./post.validator";

@Module({
  imports: [PrismaModule],
  providers: [PostService, PostResolver, PostValidator]
})
export class PostModule {}
