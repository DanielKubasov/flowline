import {API_URL} from '@/shared/constants';

import {SignUpPayload, SignUpResponse} from '../types';
import {ErrorResponse} from '../errors';

async function signUp(data: SignUpPayload): Promise<SignUpResponse> {
    const res = await fetch(`${API_URL}/auth/sign-up`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        const body = await res.json();

        throw new ErrorResponse(body);
    }

    return res.json();
}

export {signUp};
