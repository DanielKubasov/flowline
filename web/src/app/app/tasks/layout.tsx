import type {Metadata} from 'next';

// @ts-expect-error - This line will contain an error
import '@/core/styles/index.css';

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
                    pageName: 'Tasks',
                    pageDescription: 'Monitor your tasks'
                }}
            />
            <div className='p-6'>{children}</div>
        </>
    );
}
