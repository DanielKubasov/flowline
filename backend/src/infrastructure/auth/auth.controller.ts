import {Body, Controller, Post} from '@nestjs/common';

import {UserEntity} from '@/domain/user/user.entity';
import {Public} from '@/shared/decorators/public.decorator';

import {AuthService} from './auth.service';
import {SignInDTO} from './dto/sign-in.dto';
import {SignUpDTO} from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('/sign-in')
    public signIn(@Body() dto: SignInDTO): Promise<UserEntity> {
        return this.authService.signIn(dto);
    }

    @Public()
    @Post('/sign-up')
    public signUp(@Body() dto: SignUpDTO): Promise<UserEntity> {
        return this.authService.signUp(dto);
    }
}
