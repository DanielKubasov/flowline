import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {UserEntity} from './user.entity';

@Injectable()
export class UserService {
    public constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    public async getAllUsers(): Promise<UserEntity[]> {
        const users = await this.userRepository.find();

        return users;
    }
}
