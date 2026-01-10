import dotenv from 'dotenv';

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
}

const configService = new ConfigService(process.env).ensureValues([
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DATABASE'
]);

export {configService};
