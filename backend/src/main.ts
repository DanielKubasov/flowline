import {Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './core/app.module';
import {configService} from './infrastructure/config/config.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const logger = new Logger();

    const config = {
        port: configService.getPort()
    };

    app.setGlobalPrefix('/api/v1');
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(config.port, () => {
        logger.verbose(
            `The application has been started on port: ${config.port}`
        );
    });
}

void bootstrap();
