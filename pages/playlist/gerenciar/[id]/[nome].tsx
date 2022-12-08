import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

export default function Playlist() {

    const router = useRouter();
    const { id } = router.query;

    return (
        <Fragment>
            <Head>
                {/* <title>{(playlist?.nome ? `${playlist?.nome} — ${CONSTS_SISTEMA.NOME_SISTEMA}` : CONSTS_SISTEMA.NOME_SISTEMA)}</title> */}
            </Head>

            <section className='container-padrao margem1'>
                <h1>GERENCIAR ID: {id}</h1>
            </section>
        </Fragment>
    )
}