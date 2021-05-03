import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from "fs";

async function bootstrap() {

    const httpsOptions = {
        cert: fs.readFileSync("./secrets/cert.cert"),
        key: fs.readFileSync("./secrets/cert.key"),
    }

    const app = await NestFactory.create(AppModule, {
        httpsOptions
    });
    await app.listen(process.env.PORT || 5000);
}

bootstrap();
