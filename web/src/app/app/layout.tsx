import type {Metadata} from 'next';

// @ts-expect-error - This line will contain an error
import '@/core/styles/index.css';

import {Toaster} from 'sonner';
import {Sidebar} from '@/widgets/sidebar';

export const metadata: Metadata = {
    title: 'Flowline',
    description: 'Modern and lightweight task manager application.'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Sidebar />

            <main className='w-full'>{children}</main>

            <Toaster />
        </>
    );
}
