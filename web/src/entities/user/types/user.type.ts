import {EntityType} from '@/shared/types/entity.type';

export type UserType = EntityType & {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
};
