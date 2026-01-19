import type {Metadata} from 'next';

import '@/core/styles/index.css';

import {Google_Sans_Flex} from 'next/font/google';

const googleSansFlex = Google_Sans_Flex({
    subsets: ['latin'],
    display: 'swap',
    fallback: ['system-ui']
});

export const metadata: Metadata = {
    title: 'Modern and lightweight task manager application.',
    description: ''
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' className={`antialiased ${googleSansFlex.className}`}>
            <body className='relative flex'>{children}</body>
        </html>
    );
}
