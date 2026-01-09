'use client';

import {Button} from '@/shared/ui/button';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from '@/shared/ui/form';
import {Input} from '@/shared/ui/input';
import {useForm} from 'react-hook-form';
import z from 'zod';
import {signInSchema} from '../schema/sign-in';
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from 'sonner';
import {useRouter} from 'next/navigation';

const SignInForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            username: '',
            password: ''
        }
    });

    async function onSubmit(data: z.infer<typeof signInSchema>): Promise<void> {
        const res = await fetch('/api/auth/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            toast.error('Could not sign in');
            return;
        }

        toast.success('You have signed in!');
        router.push('/');
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='username'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder='shadcn' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder='********' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className='w-full' type='submit' size='lg'>
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export {SignInForm};
