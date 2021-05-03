import { Injectable } from "@nestjs/common";
import User from "./user.type";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {
    }

    async findAll() {
        return this.prisma.user.findMany();
    }
}
