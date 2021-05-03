import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    handleError(e: any) {
        let res = {
            error: "Invalid error",
            statusCode: "400",
            message: "Invalid error happened",
        }

        if (e.code === "P2002") res = {
            error: "Unique error",
            statusCode: "400",
            message: `The problem fields is ${e.meta.target.join("")}`,
        }

        return res;
    }
}
