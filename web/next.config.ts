import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    async redirects() {
        return [
            {
                source: '/auth',
                destination: '/auth/sign-in',
                permanent: true
            },
            {
                source: '/',
                destination: '/dashboard',
                permanent: true
            }
        ];
    }
};

export default nextConfig;
