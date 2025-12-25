import {Toaster} from '@/shared/ui/toast.ui';

export default function AuthLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='w-full h-screen rounded-xl bg-gray-200'>
            <div className='grid place-content-center w-1/2 h-full ml-auto p-8 rounded-xl bg-background'>
                {children}
            </div>
            <Toaster />
        </div>
    );
}
