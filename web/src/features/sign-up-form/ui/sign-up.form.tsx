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

import {signUpFormSchema} from '../schemas/sign-up.schema';
import Link from 'next/link';
import {toast} from 'sonner';
import {API_URL} from '@/shared/constants';
import {redirect} from 'next/navigation';
import {AuthAlter, Github, Google, TermsOfService} from '@/shared/ui';

const SignUpForm = () => {
    const form = useForm<z.infer<typeof signUpFormSchema>>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            email: '',
            username: '',
            firstName: '',
            lastName: '',
            password: ''
        }
    });

    const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
        const res = await fetch(`${API_URL}/auth/sign-up`, {
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

        toast.success('You have successfully created an account!');

        redirect('/');
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='w-[400px] space-y-6'
            >
                <FormField
                    control={form.control}
                    name='firstName'
                    render={({field}) => (
                        <FormItem className='w-full'>
                            <FormLabel>Fist name</FormLabel>
                            <FormControl>
                                <Input placeholder='Daniel' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='lastName'
                    render={({field}) => (
                        <FormItem className='w-full'>
                            <FormLabel>Fist name</FormLabel>
                            <FormControl>
                                <Input placeholder='Kubasov' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='email'
                    render={({field}) => (
                        <FormItem className='w-full'>
                            <FormLabel>Email address</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='user@gmail.com'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='username'
                    render={({field}) => (
                        <FormItem className='w-full'>
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

                <AuthAlter>Or continue with</AuthAlter>

                <div className='flex flex-col gap-2'>
                    <Github />
                    <Google />
                </div>

                <div className='flex items-center justify-between gap-8'>
                    <Button type='submit'>Continue</Button>
                    <Link className='text-gray-400' href='/auth/sign-in'>
                        Already have an account?
                    </Link>
                </div>
                <TermsOfService />
            </form>
        </Form>
    );
};

export {SignUpForm};
