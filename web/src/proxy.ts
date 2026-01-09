import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';

import type {NextRequest} from 'next/server';

export async function proxy(request: NextRequest) {
    const cookieStore = await cookies();
    const accessToken = await cookieStore.get('accessToken')?.value;

    if (!accessToken) {
        return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|auth|_next/static|_next/image|favicon.ico).*)']
};
