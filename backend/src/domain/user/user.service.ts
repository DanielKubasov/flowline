import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {PageMetaDto} from '@/shared/dto/page-meta.dto';
import {PageOptionsDto} from '@/shared/dto/page-options.dto';
import {PageDto} from '@/shared/dto/page.dto';

import {UserEntity} from './entities/user.entity';

@Injectable()
export class UserService {
    public constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    public async getAllUsers(
        pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<UserEntity>> {
        const users = await this.userRepository.find({
            take: pageOptionsDto.take,
            skip: pageOptionsDto.skip,
            order: {
                createdAt: pageOptionsDto.order
            },
            where: [{isActive: true, isArchived: false}]
        });

        const itemCount = await this.userRepository.count({
            where: [{isActive: true}, {isArchived: false}]
        });
        const pageMetaDto = new PageMetaDto({itemCount, pageOptionsDto});

        return new PageDto(users, pageMetaDto);
    }

    public async getUserById(id: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: [{isActive: true, isArchived: false, id}]
        });

        if (!user) {
            throw new NotFoundException('User not found.');
        }

        return user;
    }
}
