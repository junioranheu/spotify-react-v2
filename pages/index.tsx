import Styles from '@styles/index.module.scss';
import { Fetch } from '@utils/api/fetch';
import HabilitarHttp from '@utils/api/habilitarHttp';
import CONSTS_PLAYLISTS from '@utils/consts/data/constPlaylists';
import CONSTS_SISTEMA from '@utils/consts/outros/sistema';
import emojiAleatorio from '@utils/outros/gerarEmojiAleatorio';
import gerarOla from '@utils/outros/gerarOla';
import iPlaylist from '@utils/types/iPlaylist';
import Head from 'next/head';
import { Fragment, lazy, useEffect, useState } from 'react';
const Playlists = lazy(() => import('@components/playlists/playlists'));

interface iParametros {
    listaPlaylistsAdm: iPlaylist[];
}

export default function Index({ listaPlaylistsAdm }: iParametros) {

    const [listaPlaylistsNaoAdm, setListaPlaylistsNaoAdm] = useState<iPlaylist[]>();
    useEffect(() => {
        async function getPlaylistsNaoAdm() {
            const url = CONSTS_PLAYLISTS.API_URL_GET_TODOS_NAO_ADM;
            const listaPlaylistsNaoAdm = await Fetch.getApi(url) as iPlaylist[] ?? null;
            setListaPlaylistsNaoAdm(listaPlaylistsNaoAdm);
        }

        getPlaylistsNaoAdm();
    }, []);

    return (
        <Fragment>
            <Head>
                <title>Início • {CONSTS_SISTEMA.NOME_SISTEMA}</title>
            </Head>

            <section className={Styles.container}>
                <span className={Styles.bomDia}>{gerarOla()}</span>

                <div className={Styles.div}>
                    <span className='titulo'>Playlists oficiais {emojiAleatorio()}</span>
                    <Playlists listaPlaylists={listaPlaylistsAdm} />
                </div>

                {
                    listaPlaylistsNaoAdm && listaPlaylistsNaoAdm?.length > 0 && (
                        <div className={Styles.div}>
                            <span className='titulo'>Outras playlists</span>
                            <Playlists listaPlaylists={listaPlaylistsNaoAdm} />
                        </div>
                    )
                }
            </section>
        </Fragment>
    )
}

export async function getStaticProps() {
    HabilitarHttp();
    const idAdm = 1;
    const url = `${CONSTS_PLAYLISTS.API_URL_GET_BY_USUARIO_ID}/${idAdm}`;
    const listaPlaylistsAdm = await Fetch.getApi(url) as iPlaylist[] ?? null;
    // console.log(listaPlaylistsAdm);

    return {
        props: {
            listaPlaylistsAdm
        },
    }
}