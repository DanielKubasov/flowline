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
                destination: '/app',
                permanent: true
            },
            {
                source: '/app',
                destination: '/app/dashboard',
                permanent: true
            }
        ];
    }
};

export default nextConfig;
