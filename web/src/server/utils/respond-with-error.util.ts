import {NextResponse} from 'next/server';

function respondWithError() {
    return NextResponse.json(
        {
            message: 'Error reaching the server.',
            statusCode: 500
        },
        {status: 500}
    );
}

export {respondWithError};
