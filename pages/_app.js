import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        // We can't use router.query because it's delayed.
        // So we do it manually:
        const query = new URLSearchParams(router?.asPath?.split(/\?/)?.[1]);

        if (query?.get('auth_key')) {
            Cookies.set('authorization', query?.get('auth_key'), {
                // expires: 10000,
                secure: true,
                sameSite: 'strict',
            });
            router.replace(router.pathname);
        }
    }, [router?.asPath?.split(/\?/)?.[1]]);

    return <Component {...pageProps} />
}
