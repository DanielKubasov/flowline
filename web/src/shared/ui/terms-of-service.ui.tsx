import Link from 'next/link';

const TermsOfService = () => {
    return (
        <p className='text-sm text-gray-400 text-center'>
            By clicking continue, you agree to our{' '}
            <Link className='underline' href=''>
                Terms of Service
            </Link>{' '}
            and{' '}
            <Link className='underline' href=''>
                Privacy Policy
            </Link>
            .
        </p>
    );
};

export {TermsOfService};
