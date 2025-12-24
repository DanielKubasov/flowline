import {Controller, Get, HttpCode, HttpStatus, Query} from '@nestjs/common';

import {PageOptionsDto} from '@/shared/dto/page-options.dto';

import {UserService} from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    public async getAll(@Query() query: PageOptionsDto) {
        const users = await this.userService.getAllUsers(query);

        return users;
    }
}
