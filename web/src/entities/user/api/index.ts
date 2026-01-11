import {$clientFetch} from '@/shared/api';
import {ApiError} from '@/shared/errors';

import type {PaginatedApiResponse, PaginatedMeta} from '@/shared/api/types';
import type {UserType} from '../types/user.type';
import type {UserOptions} from '../types/user-options.type';

type GetAllUsersOptions = Pick<PaginatedMeta, 'page' | 'take' | 'search'> &
    UserOptions;

function userApi() {
    const getAllUsers = async ({
        page,
        take,
        search,
        assigneeId
    }: GetAllUsersOptions): Promise<PaginatedApiResponse<UserType>> => {
        try {
            const url = `/users?take=${take}&page=${page}&assigneeId=${assigneeId}&search=${search}`;

            const res = await $clientFetch(url.toString(), {
                next: {
                    tags: ['users']
                }
            });
            const data = await res.json();

            if (!res.ok) {
                throw new ApiError(data?.message, data?.statusCode);
            }

            return data;
        } catch (err: unknown) {
            throw new ApiError('Internal server error', 500);
        }
    };

    const getUserById = (id: string) => {};

    return {getAllUsers, getUserById};
}

export {userApi};
