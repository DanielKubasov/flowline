import {SignUpForm} from '@/features/auth';
import {Heading2} from '@/shared/ui/typography/heading-2';
import {Paragraph} from '@/shared/ui/typography/paragraph';
import Link from 'next/link';

const SignUpView = () => {
    return (
        <div className='w-[450px] bg-background p-12 rounded-xl'>
            <div className='mb-12 text-center'>
                <Heading2 className='!text-3xl'>Sign up</Heading2>
                <Paragraph>Sign in to start using the app</Paragraph>
                <div className='w-full h-0.5 bg-muted my-8'></div>
            </div>
            <SignUpForm />
            <div className='w-full h-0.5 bg-muted my-8'></div>
            <Paragraph className='text-center'>
                Already have an account?{' '}
                <Link className='text-primary' href='/auth/sign-in'>
                    Sign in.
                </Link>
            </Paragraph>
        </div>
    );
};

export {SignUpView};
