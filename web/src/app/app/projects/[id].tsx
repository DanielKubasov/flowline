import {useRouter} from 'next/navigation';

function Page() {
    const router = useRouter();

    const id = router.query.id;

    return <div>Project {id}</div>;
}

export default Page;
