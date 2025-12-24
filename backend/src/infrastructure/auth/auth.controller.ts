import {Body, Controller, Delete, Post} from '@nestjs/common';

import {UserEntity} from '@/domain/user/user.entity';
import {Public} from '@/shared/decorators/public.decorator';
import {User} from '@/shared/decorators/user.decorator';

import {AuthService} from './auth.service';
import {SignInDto} from './dto/sign-in.dto';
import {SignUpDto} from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('/sign-in')
    public signIn(@Body() dto: SignInDto): Promise<UserEntity> {
        return this.authService.signIn(dto);
    }

    @Public()
    @Post('/sign-up')
    public signUp(@Body() dto: SignUpDto): Promise<UserEntity> {
        return this.authService.signUp(dto);
    }

    @Delete('/deactivate')
    public deactivateAccount(@User() user: UserEntity): Promise<boolean> {
        return this.authService.deactivateAccount(user);
    }
}
