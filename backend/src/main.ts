import {Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

import {AppModule} from './core/app.module';
import {configService} from './infrastructure/config/config.service';
import {HttpExceptionFilter} from './shared/filters/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const logger = new Logger();

    const config = {
        port: configService.getPort()
    };

    const swagger = new DocumentBuilder()
        .setTitle('Flowline')
        .setDescription(
            'Flowline is a modern, lightweight task and project management platform inspired by tools like YouTrack and Asana. It helps teams organize work, track progress, collaborate efficiently, and keep projects flowing smoothly '
        )
        .setVersion('1.0')
        .build();

    const documentFactory = () => SwaggerModule.createDocument(app, swagger);

    SwaggerModule.setup('documentation', app, documentFactory);

    app.setGlobalPrefix('/api/v1');
    app.useGlobalPipes(new ValidationPipe({transform: true}));
    app.useGlobalFilters(new HttpExceptionFilter());

    await app.listen(config.port, () => {
        logger.verbose(
            `The application has been started on port: ${config.port}`
        );
    });
}

void bootstrap();
