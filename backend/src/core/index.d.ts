import {UserEntity} from '@/domain/user/entities/user.entity';

declare namespace express {
    type Request = {
        user: Pick<UserEntity, 'id'>;
    };
}
