import {SignInForm} from '@/features/sign-in-form';
import {Heading1} from '@/shared/ui/typorgraphy/heading-1.ui';
import {Paragraph} from '@/shared/ui/typorgraphy/paragraph.ui';

const SignInView = () => {
    return (
        <>
            <hgroup className='text-center mb-8'>
                <Heading1 className='mb-4'>Sign in</Heading1>
                <Paragraph>Enter your username / email and password</Paragraph>
            </hgroup>
            <SignInForm />
        </>
    );
};

export {SignInView};
