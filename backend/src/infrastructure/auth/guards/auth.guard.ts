import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {JwtService} from '@nestjs/jwt';
import type {Request} from 'express';

import {configService} from '@/infrastructure/config/config.service';
import {IS_PUBLIC_KEY} from '@/shared/decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    public constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()]
        );

        if (isPublic) return true;

        const token = this.extractToken(request);

        if (!token) throw new UnauthorizedException();

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: configService.get<string>('JWT_ACCESS_SECRET')
            });

            request['user'] = payload;
        } catch (err: unknown) {
            console.log(err);
            throw new UnauthorizedException('Invalid credentials.');
        }

        return true;
    }

    public extractToken(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
