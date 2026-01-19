'use server';

import {API_URL} from '@/shared/constants';

import {cookies} from 'next/headers';

async function $preInterceptor(config?: RequestInit): Promise<RequestInit> {
    const store = await cookies();
    const token = store.get('accessToken')?.value;

    return {
        ...config,
        headers: {
            Authorization: `Bearer ${token}`,
            ContentType: 'application/json'
        }
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

const $serverFetch = async <T>(
    url: string,
    options?: RequestInit
): Promise<Response> => {
    return $postInterceptor(
        await fetch(API_URL + url, await $preInterceptor(options))
    );
};

export {$serverFetch};
