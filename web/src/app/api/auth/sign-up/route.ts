import {UserType} from '@/entities/user';
import {ErrorResponse} from '@/shared/api/errors';
import {API_URL} from '@/shared/constants';
import {respondWithError} from '@/shared/utils';
import {NextRequest, NextResponse} from 'next/server';

type SignUpPayload = {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
};

type SignUpResponse = UserType & {accessToken: string};

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

async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = await signUp(body);

        const res = NextResponse.json(data);

        res.cookies.set('accessToken', data.accessToken);

        return res;
    } catch (err: unknown) {
        if (err instanceof ErrorResponse) {
            return NextResponse.json(err, {status: err.statusCode});
        }

        return respondWithError();
    }
}

export {POST};
