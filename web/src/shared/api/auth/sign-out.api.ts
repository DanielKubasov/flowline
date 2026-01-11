async function signOut(): Promise<boolean> {
    const res = await fetch('/api/auth/sign-out', {
        method: 'POST'
    });

    if (!res.ok) {
        return false;
    }

    return true;
}

export {signOut};
