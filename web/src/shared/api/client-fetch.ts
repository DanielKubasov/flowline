'use client';

import {API_URL} from '../constants';

export const getClientSideCookie = (name: string): string | undefined => {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith(`${name}=`))
        ?.split('=')[1];

    return cookieValue;
};

const $clientFetch = async <T>(
    url: string,
    options?: RequestInit
): Promise<Response> => {
    const token = getClientSideCookie('accessToken');
    const apiUrl = API_URL + url;
    const headers = {Authorization: `Bearer ${token}`};

    const config = {
        headers,
        ...options
    };

    return fetch(apiUrl, config);
};

export {$clientFetch};
