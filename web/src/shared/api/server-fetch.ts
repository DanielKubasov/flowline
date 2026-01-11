'use server';

import {API_URL} from '@/shared/constants';

import {cookies} from 'next/headers';

const $serverFetch = async <T>(
    url: string,
    options?: RequestInit
): Promise<Response> => {
    const store = await cookies();
    const token = store.get('accessToken')?.value;

    const apiUrl = API_URL + url;
    const headers = {Authorization: `Bearer ${token}`};
    const config = {
        headers,
        ...options
    };

    return fetch(apiUrl, config);
};

export {$serverFetch};
