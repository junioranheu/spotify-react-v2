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
import { MusicaProvider } from '../utils/context/musicaContext';
import { UsuarioProvider } from '../utils/context/usuarioContext';

export default function App({ Component, pageProps }: AppProps) {

    const { asPath } = useRouter();
    const [url, setUrl] = useState<string>('');
    useEffect(() => {
        setUrl(asPath);

        // Scrollar pro top automaticamente;
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

    // Não permitir F12 e clicar com o direito para inspecionar elemento;
    useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            document.addEventListener('contextmenu', function (e) {
                e.preventDefault();
            });

            document.onkeydown = function (e) {
                if (e.keyCode == 123) {
                    return false;
                }

                if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
                    return false;
                }

                if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
                    return false;
                }

                if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
                    return false;
                }

                if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
                    return false;
                }
            }
        }
    }, []);

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
                    <MusicaProvider>
                        {/* Toaster de aviso */}
                        <ToastContainer className='semHighlight' />

                        {/* Conteúdo */}
                        {verificarLayout()}
                    </MusicaProvider>
                </UsuarioProvider>
            </Fragment>
        ) : null
}
