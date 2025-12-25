import {$api} from '@/shared/api';

const HomeView = async () => {
    const response = await $api.get('/users');
    const data = response.data;

    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export {HomeView};
