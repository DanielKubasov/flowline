import {NextRequest, NextResponse} from 'next/server';

import {ErrorResponse} from '@/server/errors';
import {respondWithError, signIn} from '@/server/utils';

async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = await signIn(body);

        const res = NextResponse.json(data, {status: 200});

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
