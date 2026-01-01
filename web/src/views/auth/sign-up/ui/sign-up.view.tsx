import {SignUpForm} from '@/features/sign-up-form';
import {Heading1} from '@/shared/ui/typorgraphy/heading-1.ui';
import {Paragraph} from '@/shared/ui/typorgraphy/paragraph.ui';

const SignUpView = () => {
    return (
        <>
            <hgroup className='text-center mb-8'>
                <Heading1 className='mb-4'>Sign up</Heading1>
                <Paragraph>
                    Enter your information to create an account
                </Paragraph>
            </hgroup>
            <SignUpForm />
        </>
    );
};

export {SignUpView};
