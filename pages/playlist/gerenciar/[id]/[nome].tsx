import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import nProgress from 'nprogress';
import { Fragment, useEffect, useState } from 'react';
import { Fetch } from '../../../../utils/api/fetch';
import CONSTS_PLAYLISTS from '../../../../utils/consts/data/constPlaylists';
import CONSTS_ERROS from '../../../../utils/consts/outros/erros';
import CONSTS_SISTEMA from '../../../../utils/consts/outros/sistema';
import CONSTS_TELAS from '../../../../utils/consts/outros/telas';
import { Auth } from '../../../../utils/context/usuarioContext';
import iPlaylist from '../../../../utils/types/iPlaylist';

export default function Playlist() {

    const router = useRouter();
    const { id } = router.query;
    const usuarioId = Auth?.get()?.usuarioId ?? 0;

    const [playlist, setPlaylist] = useState<iPlaylist>();
    useEffect(() => {
        async function getPlaylist(playlistId: string) {
            nProgress.start();
            const url = `${CONSTS_PLAYLISTS.API_URL_GET_BY_ID}/${playlistId}`;
            const playlist = await Fetch.getApi(url) as iPlaylist ?? null;

            if (playlist.erro || playlist.usuarioId !== usuarioId) {
                Router.push({ pathname: CONSTS_TELAS.ERRO, query: { erro: CONSTS_ERROS.SEM_ACESSO } });
                return false;
            }

            setPlaylist(playlist);
            nProgress.done();
        }

        if (id) {
            getPlaylist(id.toString());
        }
    }, [id]);


    // SAIR DA TELA SE A PLAYLIST NAO FOR SUA!!!!!!!

    return (
        <Fragment>
            <Head>
                <title>{(playlist?.nome ? `Gerenciar • ${playlist?.nome} • ${CONSTS_SISTEMA.NOME_SISTEMA}` : CONSTS_SISTEMA.NOME_SISTEMA)}</title>
            </Head>

            <section className='container-padrao margem1'>
                <h1>GERENCIAR ID: {id}</h1>
            </section>
        </Fragment>
    )
} 