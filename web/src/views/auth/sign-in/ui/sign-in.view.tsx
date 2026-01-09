import {SignInForm} from '@/features/auth';
import {Heading2} from '@/shared/ui/typography/heading-2';
import {Paragraph} from '@/shared/ui/typography/paragraph';
import Link from 'next/link';

const SignInView = () => {
    return (
        <div className='w-112.5 bg-background p-12 rounded-xl'>
            <div className='mb-12 text-center'>
                <Heading2 className='text-3xl!'>Sign in</Heading2>
                <Paragraph>Sign in to start using the app</Paragraph>
                <div className='w-full h-0.5 bg-muted my-8'></div>
            </div>
            <SignInForm />
            <div className='w-full h-0.5 bg-muted my-8'></div>
            <Paragraph className='text-center'>
                Don&apos;t have an account?{' '}
                <Link className='text-primary' href='/auth/sign-up'>
                    Sign up.
                </Link>
            </Paragraph>
        </div>
    );
};

export {SignInView};
