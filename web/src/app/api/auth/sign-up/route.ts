import {NextRequest, NextResponse} from 'next/server';

import {ErrorResponse} from '@/server/errors';
import {respondWithError, signUp} from '@/server/utils';

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
