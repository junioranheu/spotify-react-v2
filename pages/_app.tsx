import useInstrucoesPadroes from '@hooks/outros/useInstrucoesPadroes';
import CONSTS_SISTEMA from '@utils/consts/outros/sistema';
import { MusicaProvider } from '@utils/context/musicaContext';
import { UsuarioProvider } from '@utils/context/usuarioContext';
import pegarNomeNavegador from '@utils/outros/pegarNomeNavegador';
import 'animate.css/animate.min.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import 'nprogress/nprogress.css';
import { Fragment, useEffect, useState } from 'react';
import { CookieWidget } from 'react-cookie-gpdr';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LayoutPadrao from '../layouts/layoutPadrao';
import '../styles/globals.scss';
import '../utils/fonts/NanumPenScript/NanumPenScript.css';

export default function App({ Component, pageProps }: AppProps) {

    useInstrucoesPadroes();

    const { asPath } = useRouter();
    const [url, setUrl] = useState<string>('');

    useEffect(() => {
        async function handleAvisoNavegador() {
            if (await pegarNomeNavegador() !== 'Chrome') {
                // Aviso.warn('Parece que seu navegador não é o <b>Google Chrome</b>! Isso talvez possa afetar negativamente em alguns pontos, como: imagens e até mesmo ao tocar alguma música!', 10000);
            }
        }

        handleAvisoNavegador();

        setUrl(asPath);
    }, [asPath]);

    function verificarLayout() {
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
                    <MusicaProvider>
                        {/* Toaster de aviso */}
                        <ToastContainer className='semHighlight' />

                        {/* Conteúdo */}
                        {verificarLayout()}

                        {/* Cookies */}
                        <section>
                            <CookieWidget
                                location='right'
                                color='var(--cor-principal)'
                                policyLink=''
                                policyLinkText=''
                                title={CONSTS_SISTEMA.NOME_SISTEMA}
                                subtitle='Um clone do Spotify (2022), feito com React.js e Next.js, desenvolvido por @junioranheu. Este projeto não é de forma alguma afiliado ao Spotify e não deve ser confundido com o produto real.'
                                text={`O ${CONSTS_SISTEMA.NOME_SISTEMA} usa cookies para oferecer uma experiência melhor. Ao continuar navegando, você concorda com o uso de cookies.`}
                                cookieSecurity={true}
                                hideOnScrollDown={false}
                                rejectButtonText='Rejeitar'
                                acceptButtonText='Aceitar cookies'
                                onAccept={() => null}
                                onReject={() => null}
                            />
                        </section>

                        {/* Elemento para os modais */}
                        <div id='modalWrapper'></div>
                    </MusicaProvider>
                </UsuarioProvider>
            </Fragment>
        ) : null
}
