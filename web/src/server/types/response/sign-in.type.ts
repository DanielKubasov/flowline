import {UserType} from '@/entities/user';

type SignInResponse = UserType & {accessToken: string};

export type {SignInResponse};
