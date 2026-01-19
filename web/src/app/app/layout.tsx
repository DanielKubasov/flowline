import type {Metadata} from 'next';

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

            <main className='w-full p-8 pl-72'>{children}</main>

            <Toaster />
        </>
    );
}
