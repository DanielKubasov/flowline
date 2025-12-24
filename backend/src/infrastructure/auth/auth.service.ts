import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
    Logger
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import {Repository} from 'typeorm';

import {UserEntity} from '@/domain/user/user.entity';

import {SignInDto} from './dto/sign-in.dto';
import {SignUpDto} from './dto/sign-up.dto';

@Injectable()
export class AuthService {
    private logger = new Logger();

    public constructor(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService
    ) {}

    public async signIn(
        dto: SignInDto
    ): Promise<UserEntity & {access_token: string}> {
        const user = await this.userRepository.findOne({
            where: [
                {username: dto.username},
                {email: dto.username},
                {isActive: true},
                {isArchived: false}
            ]
        });

        const isPasswordCorrect = await argon2.verify(
            user?.password as string,
            dto.password
        );

        if (!isPasswordCorrect) {
            throw new BadRequestException('Invalid password.');
        }

        if (!user) {
            throw new BadRequestException('Invalid credentials.');
        }

        const payload = {sub: user.id};

        return {
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            access_token: await this.jwtService.signAsync(payload)
        } as UserEntity & {access_token: string};
    }

    public async signUp(
        dto: SignUpDto
    ): Promise<UserEntity & {access_token: string}> {
        const oldUser = await this.userRepository.findOne({
            where: [{username: dto.username}, {email: dto.email}]
        });

        if (dto.email === oldUser?.email) {
            throw new ConflictException('User with this email already exist.');
        }

        if (dto.username === oldUser?.username) {
            throw new ConflictException('User with this email already exist.');
        }

        const hashedPassword = await argon2.hash(dto.password);

        const newUser = this.userRepository.create({
            ...dto,
            password: hashedPassword
        });

        try {
            await this.userRepository.save(newUser);
        } catch (error: unknown) {
            this.logger.error(error);
            throw new InternalServerErrorException();
        }

        const payload = {sub: newUser.id};

        return {
            ...newUser,
            access_token: await this.jwtService.signAsync(payload)
        } as UserEntity & {access_token: string};
    }

    public async deactivateAccount(user: UserEntity): Promise<boolean> {
        const old = await this.userRepository.findOne({
            where: {id: user.id}
        });

        if (!old) {
            throw new InternalServerErrorException('Internal server error.');
        }

        await this.userRepository.save({
            ...old,
            isActive: false,
            isArchived: true
        });

        return true;
    }
}
