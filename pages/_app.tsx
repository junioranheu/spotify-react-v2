import 'animate.css/animate.min.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import 'nprogress/nprogress.css';
import { Fragment, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LayoutPadrao from '../layouts/layoutPadrao';
import '../styles/globals.scss';
import CONSTS_SISTEMA from '../utils/consts/outros/sistema';
import { UsuarioProvider } from '../utils/context/usuarioContext';

export default function App({ Component, pageProps }: AppProps) {

    const { asPath } = useRouter();
    const [url, setUrl] = useState<string>('');
    useEffect(() => {
        setUrl(asPath);
    }, [asPath]);

    // Scrollar pro top automaticamente;
    useEffect(() => {
        // console.log('useEffect fired!', {asPath: router.asPath});
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        console.clear();
    }, [asPath]);

    function verificarLayout() {
        // console.log(`Url: ${url}`);

        // if (url.includes('/yyy') || url.includes('/usuario/xxx')) {
        //     return <LayoutDisciplinas Component={Component} pageProps={pageProps} />
        // } if (url.includes('/zzz')) {
        //     return <LayoutPosts Component={Component} pageProps={pageProps} />
        // } else {
        //     return <LayoutPadrao Component={Component} pageProps={pageProps} />
        // }

        return <LayoutPadrao Component={Component} pageProps={pageProps} />
    }

    return url ?
        (
            <Fragment>
                <Head>
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                    <meta name='description' content={`${CONSTS_SISTEMA.NOME_SISTEMA} — ${CONSTS_SISTEMA.SLOGAN}`} />
                    <meta name='keywords' content='spotify, música, anheu, junioranheu' />
                    <meta name='author' content='@junioranheu' />
                    <meta name='theme-color' content='#1DD05E' />
                </Head>

                <UsuarioProvider>
                    {/* Toaster de aviso */}
                    <ToastContainer className='semHighlight' />

                    {/* Conteúdo */}
                    {verificarLayout()}
                </UsuarioProvider>
            </Fragment>
        ) : null
}
