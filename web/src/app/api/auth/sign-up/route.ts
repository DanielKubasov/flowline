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
}

export default async function POST(req: NextRequest) {
    const body = req.json();
    const data = await signIn(body);

    const res = NextResponse.json(data);
    res.cookies.set('accessToken', data?.accessToken);

    return res;
}
