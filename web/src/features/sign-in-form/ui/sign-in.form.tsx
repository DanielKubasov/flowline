'use client';

import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import z from 'zod';

import {Button} from '@/shared/ui/button.ui';
import {Input} from '@/shared/ui/input.ui';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from '@/shared/ui/form.ui';

import {signInFormSchema} from '../schemas/sign-in.schema';
import Link from 'next/link';
import {toast} from 'sonner';
import {redirect} from 'next/navigation';

const SignInForm = () => {
    const form = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
        const res = await fetch(`/api/auth/sign-in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });

        if (!res.ok) {
            const body = await res.json();

            if (Array.isArray(body?.message)) {
                for (const m of body?.message) {
                    toast.error(m);
                }

                return;
            }

            toast.error(body?.message);

            return;
        }

        toast.success('Welcome!');

        redirect('/');
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='max-w-[500px] space-y-8'
            >
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
                <div className='flex items-center gap-8'>
                    <Button type='submit'>Sign in</Button>
                    <Link className='text-blue-600' href='/auth/sign-up'>
                        Don&apos;t have an account?
                    </Link>
                </div>
            </form>
        </Form>
    );
};

export {SignInForm};
