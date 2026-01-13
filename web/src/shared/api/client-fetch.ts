'use client';

import {API_URL} from '@/shared/constants';

import {getCookie} from '@/shared/utils';

async function $preInterceptor(config?: RequestInit): Promise<RequestInit> {
    return {
        ...config,
        headers: {Authorization: `Bearer ${getCookie('accessToken')}`}
    };
}

async function $postInterceptor(res: Response): Promise<Response> {
    switch (res.status) {
        case 401:
            await fetch('/api/auth/sign-out', {
                method: 'POST'
            });
    }

    return res;
}

const $clientFetch = async (
    url: string,
    options?: RequestInit
): Promise<Response> => {
    return $postInterceptor(
        await fetch(API_URL + url, await $preInterceptor(options))
    );
};

export {$clientFetch};
