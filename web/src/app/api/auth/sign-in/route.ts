import {API_URL} from '@/shared/constants';
import {NextRequest, NextResponse} from 'next/server';

async function signIn(data: any): Promise<any> {
    const res = await fetch(`${API_URL}/auth/sign-in`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        const body = await res.json();

        return body;
    }

    return res.json();
}

async function POST(req: NextRequest) {
    const body = await req.json();

    console.log(body);

    const data = await signIn(body);

    console.log(data);

    const res = NextResponse.json(JSON.stringify(data));
    res.cookies.set('accessToken', data?.accessToken);

    return res;
}

export {POST};
