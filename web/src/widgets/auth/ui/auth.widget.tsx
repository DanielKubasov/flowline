import {Heading1} from '@/shared/ui/typorgraphy/heading-1.ui';

import {SignInForm} from '@/features/sign-in-form';

const AuthWidget = () => {
    return (
        <div className='w-full h-full rounded-xl bg-gray-200 text-cen'>
            <div className='grid place-content-center w-1/2 h-full ml-auto p-8 rounded-xl bg-background'>
                <Heading1 className='mb-12'>Welcome screen</Heading1>
                <SignInForm />
            </div>
        </div>
    );
};

export {AuthWidget};
