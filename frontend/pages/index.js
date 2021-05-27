import axios from 'axios';
import Head from 'next/head'

import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home(props) {
    const router = useRouter()
    useEffect( () => {
        console.log(props.logged)
       if( props.logged.status === "failed" ) {
            router.push('/login')
       }else{
           router.push('/board')
       }
    });
    // jsx react
    return (
        <div>
            <Head>
                <title>Create Next App</title>
            </Head>
            <main>
                <p> Redirecting ... </p>
            </main>
        </div>
    );
}

export async function getStaticProps(context) {
    const URI = process.env.URI || "";
    let logged =  await axios.get(URI + '/user')
                        .then(res => {return res.data});

return {
        props : {logged},
    }
}
