import {Module} from '@nestjs/common';
import {APP_GUARD} from '@nestjs/core';

import {UserModule} from '@/domain/user/user.module';
import {AuthGuard} from '@/shared/guards/auth.guard';

import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ]
})
export class AuthModule {}
