import Head from 'next/head';
import { Fragment, useContext } from 'react';
import Playlists from '../components/playlists/playlists';
import Styles from '../styles/index.module.scss';
import { Fetch } from '../utils/api/fetch';
import HabilitarHttp from '../utils/api/habilitarHttp';
import CONSTS_PLAYLISTS from '../utils/consts/data/constPlaylists';
import CONSTS_SISTEMA from '../utils/consts/outros/sistema';
import { UsuarioContext } from '../utils/context/usuarioContext';
import emojiAleatorio from '../utils/outros/gerarEmojiAleatorio';
import gerarOla from '../utils/outros/gerarOla';
import iPlaylist from '../utils/types/iPlaylist';

interface iParametros {
    listaPlaylists: iPlaylist[];
}

export default function Index({ listaPlaylists }: iParametros) {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    return (
        <Fragment>
            <Head>
                <title>{CONSTS_SISTEMA.NOME_SISTEMA} — Início</title>
            </Head>

            <section className={Styles.container}>
                <span className={Styles.bomDia}>{gerarOla()}</span>

                <div className={Styles.div}>
                    <span className='titulo'>Playlists disponíveis no momento {emojiAleatorio()}</span>
                    <Playlists listaPlaylists={listaPlaylists} />
                </div>

                <div className={Styles.div}>
                    <span className='titulo'>Outras playlists</span>
                    <span className='texto margem0_5'>Novas playlists serão criadas e, mais para frente, será permitido criar suas proprias!</span>

                    {
                        isAuth && (
                            <span className='texto margem0_5'>Para “renovar” sua playlist por completo, clique no botão abaixo.</span>
                        )
                    }
                </div>
            </section>
        </Fragment>
    )
}

export async function getStaticProps() {
    HabilitarHttp();
    const url = CONSTS_PLAYLISTS.API_URL_GET_TODOS;
    const listaPlaylists = await Fetch.getApi(url) as iPlaylist[] ?? null;
    // console.log(listaPlaylists);

    return {
        props: {
            listaPlaylists
        },
    }
}