import {SignInForm} from '@/features/auth';
import {$fetch} from '@/shared/api';

async function fetchUsers() {
    const data = await $fetch('/users');
    const json = await data.json();
    return json;
}

async function Page() {
    const data = await fetchUsers();

    console.log(data);

    return (
        <div className='container'>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default Page;
