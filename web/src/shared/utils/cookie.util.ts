function getCookie(name: string): string | undefined {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith(`${name}=`))
        ?.split('=')[1];

    return cookieValue;
}

function deleteCookie(name: string) {
    if (getCookie(name)) {
        document.cookie = name + '=; Max-Age=-99999999;';
    }
}

export {getCookie, deleteCookie};
