import type {Metadata} from 'next';
import {Google_Sans_Flex} from 'next/font/google';

// @ts-expect-error - This line will contain an error
import '@/shared/styles/globals.css';

import {Toaster} from 'sonner';

const googleSansFlex = Google_Sans_Flex({
    variable: '--font-google-sans-flex',
    subsets: ['latin']
});

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
            <body className={googleSansFlex.className}>
                {children}

                <Toaster />
            </body>
        </html>
    );
}
