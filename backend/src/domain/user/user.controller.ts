import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Query
} from '@nestjs/common';

import {Public} from '@/shared/decorators/public.decorator';
import {PageOptionsDto} from '@/shared/dto/page-options.dto';
import {PageDto} from '@/shared/dto/page.dto';

import {UserEntity} from './entities/user.entity';
import {UserService} from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    public async getAll(
        @Query() query: PageOptionsDto
    ): Promise<PageDto<UserEntity>> {
        const users = await this.userService.getAllUsers(query);

        return users;
    }

    @Get(':id')
    public async getOneById(@Param('id') id: string): Promise<UserEntity> {
        const user = await this.userService.getUserById(id);

        return user;
    }
}
