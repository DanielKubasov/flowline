import {NextResponse} from 'next/server';

async function POST() {
    try {
        const res = NextResponse.json({ok: true});

        res.cookies.delete('accessToken');

        return res;
    } catch (err: unknown) {
        console.log(err);
        return NextResponse.json({statusCode: 500}, {status: 500});
    }
}

export {POST};
