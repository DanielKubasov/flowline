import {UserType} from '@/entities/user';

type SignUpResponse = UserType & {accessToken: string};

export type {SignUpResponse};
