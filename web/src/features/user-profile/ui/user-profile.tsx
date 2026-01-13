'use client';

import {signOut} from '@/shared/api/auth/sign-out.api';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/shared/ui';
import {Avatar, AvatarImage, AvatarFallback} from '@/shared/ui/avatar';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';

const UserProfile = () => {
    const router = useRouter();

    async function handleSignOut() {
        const result = await signOut();

        if (!result) {
            toast.error('Could not sign out');
            return;
        }

        router.push('/auth');
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild={true}>
                <Avatar className='w-12 h-12 rounded-md cursor-pointer'>
                    <AvatarImage src='' alt='@shadcn' />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export {UserProfile};
