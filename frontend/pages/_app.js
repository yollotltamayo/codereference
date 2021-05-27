import '../styles/globals.css'
import Head from 'next/head';
import {useEffect} from 'react';

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        document.getElementById('preventFlashOfUnstyledContent')?.remove();
    }, []);
    return (
        <>
        <Head>
            <style
                id="preventFlashOfUnstyledContent"
                dangerouslySetInnerHTML={{
                    __html: `*, *::before, *::after { transition: none !important; }`,
                }}
            />
        </Head>
        <Component {...pageProps} />
        </>
    )
}

export default MyApp


