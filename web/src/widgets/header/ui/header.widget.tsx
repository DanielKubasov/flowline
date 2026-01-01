import Link from 'next/link';

const Header = () => {
    return (
        <header className='container flex py-4 justify-between'>
            <div className='flex ml-auto items-center gap-4'>
                <Link href='/auth'>Sign in</Link>
                <Link href='/auth/sign-up'>Sign up</Link>
            </div>
        </header>
    );
};

export {Header};
