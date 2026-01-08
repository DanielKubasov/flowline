import type {Metadata} from 'next';

// @ts-expect-error - This line will contain an error
import '@/core/styles/index.css';

import {Toaster} from 'sonner';

export const metadata: Metadata = {
    title: 'Flowline',
    description: ''
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body>
                {children}

                <Toaster />
            </body>
        </html>
    );
}
