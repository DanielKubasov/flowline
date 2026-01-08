import {Toaster} from '@/shared/ui/toast.ui';

export default function AuthLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='flex items-center justify-center flex-col w-full h-screen bg-background-dark'>
            {children}
            <Toaster />
        </div>
    );
}
