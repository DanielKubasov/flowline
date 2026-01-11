import {ApiError} from '@/shared/errors';
import type {PaginatedApiResponse, PaginatedMeta} from '@/shared/api/types';

import {userApi, type UserOptions, type UserType} from '@/entities/user';

type GetAllUsersOptions = Pick<PaginatedMeta, 'page' | 'take' | 'search'> &
    UserOptions;

function assigneeFilterApi() {
    const getAllAssignees = async ({
        page,
        take,
        search
    }: GetAllUsersOptions): Promise<PaginatedApiResponse<UserType>> => {
        const {getAllUsers} = userApi();

        try {
            const users = await getAllUsers({page, take, search});
            return users;
        } catch (err: unknown) {
            throw new ApiError();
        }
    };

    return {getAllAssignees};
}

export {assigneeFilterApi};
