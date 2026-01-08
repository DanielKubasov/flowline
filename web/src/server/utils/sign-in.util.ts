import {API_URL} from '@/shared/constants';
import {SignInPayload, SignInResponse} from '../types';
import {ErrorResponse} from '@/server/errors';

async function signIn(data: SignInPayload): Promise<SignInResponse> {
    const res = await fetch(`${API_URL}/auth/sign-in`, {
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

export {signIn};
