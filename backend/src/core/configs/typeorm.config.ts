import {TypeOrmModuleOptions} from '@nestjs/typeorm';

import {ProjectEntity} from '@/domain/project/entities/project.entity';
import {StatusEntity} from '@/domain/status/entities/status.entity';
import {TaskEntity} from '@/domain/task/entities/task.entity';
import {UserEntity} from '@/domain/user/entities/user.entity';
import {WorkspaceEntity} from '@/domain/workspace/entities/workspace.entity';
import {configService} from '@/infrastructure/config/config.service';

function getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: parseInt(configService.get<string>('POSTGRES_PORT')),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DATABASE'),
        entities: [
            UserEntity,
            WorkspaceEntity,
            ProjectEntity,
            TaskEntity,
            StatusEntity
        ],
        migrationsTableName: 'migration',
        migrations: [__dirname + '/src/migrations/*.ts'],
        autoLoadEntities: true,
        synchronize: true,
        ssl: false // configService.isProduction()
    };
}

export {getTypeOrmConfig};
