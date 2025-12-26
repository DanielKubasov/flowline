// src/decorators/get-user.decorator.ts
import {ExecutionContext, createParamDecorator} from '@nestjs/common';

import {UserEntity} from '@/domain/user/entities/user.entity';

export const User = createParamDecorator(
    (data: keyof UserEntity, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        if (data) {
            return request?.user?.[data] as keyof UserEntity;
        }

        return request?.user as UserEntity;
    }
);
