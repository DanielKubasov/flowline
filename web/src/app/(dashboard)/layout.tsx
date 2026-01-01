import type {Metadata} from 'next';

import {Toaster} from 'sonner';
import {Header} from '@/widgets/header';
import {Sidebar} from '@/widgets/sidebar';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: ''
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className='flex'>
                <aside className='border-r-1 border-gray-200'>
                    <Sidebar />
                </aside>
                <main className='w-full h-screen overflow-y-auto'>
                    <Header />
                    <div className='h-full p-8'>{children}</div>
                </main>
            </div>

            <Toaster />
        </div>
    );
}
