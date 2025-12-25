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

        toast.success('You have signed up');
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='max-w-[500px] space-y-8'
            >
                <div className='flex w-full gap-4'>
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
                </div>

                <div className='flex gap-4'>
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
                </div>

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
                    <Button type='submit'>Sign uo</Button>
                    <Link className='text-blue-600' href='/auth/sign-in'>
                        Already have an account?
                    </Link>
                </div>
            </form>
        </Form>
    );
};

export {SignUpForm};
