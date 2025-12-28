import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import dotenv from 'dotenv';

import {ProjectEntity} from '@/domain/project/entities/project.entity';
import {TaskEntity} from '@/domain/task/entities/task.entity';
import {UserEntity} from '@/domain/user/entities/user.entity';
import {WorkspaceEntity} from '@/domain/workspace/entities/workspace.entity';

dotenv.config();

class ConfigService {
    constructor(private env: any) {}

    public get<T>(key: string, throwOnMissing = true): T {
        const value = this.env[key];

        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }

        return value as T;
    }

    public ensureValues(keys: string[]) {
        keys.forEach(k => this.get<string>(k, true));
        return this;
    }

    public getPort() {
        return this.get<number>('PORT', true);
    }

    public isProduction(): boolean {
        const mode = this.get('MODE', false);
        return mode != 'dev';
    }

    public getTypeOrmConfig(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.get<string>('POSTGRES_HOST'),
            port: parseInt(this.get<string>('POSTGRES_PORT')),
            username: this.get<string>('POSTGRES_USER'),
            password: this.get<string>('POSTGRES_PASSWORD'),
            database: this.get<string>('POSTGRES_DATABASE'),
            entities: [UserEntity, WorkspaceEntity, ProjectEntity, TaskEntity],
            migrationsTableName: 'migration',
            migrations: [__dirname + '/src/migrations/*.ts'],
            autoLoadEntities: true,
            synchronize: true,
            ssl: this.isProduction()
        };
    }
}

const configService = new ConfigService(process.env).ensureValues([
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DATABASE'
]);

export {configService};
