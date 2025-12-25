import axios from 'axios';
import {API_URL} from '../constants';

import {cookies} from 'next/headers';

const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

$api.interceptors.request.use(async config => {
    const store = await cookies();
    const token = await store.get('accessToken')?.value;

    console.log(token);

    config.headers.set('Authorization', `Bearer ${token}`);

    return config;
});

export {$api};
