import type {Metadata} from 'next';

import {Header} from '@/widgets/header';

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
            <Header
                pageIndicator={{
                    pageName: 'Dashboard',
                    pageDescription: 'View essential information'
                }}
            />
            <div className='p-6'>{children}</div>
        </>
    );
}
