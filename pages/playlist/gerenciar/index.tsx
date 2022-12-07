import Head from 'next/head';
import Router from 'next/router';
import { Fragment, useContext, useEffect, useState } from 'react';
import Playlists from '../../../components/playlists/playlists';
import StylesIndex from '../../../styles/index.module.scss';
import { Fetch } from '../../../utils/api/fetch';
import CONSTS_PLAYLISTS from '../../../utils/consts/data/constPlaylists';
import CONSTS_ERROS from '../../../utils/consts/outros/erros';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import CONSTS_TELAS from '../../../utils/consts/outros/telas';
import { Auth, UsuarioContext } from '../../../utils/context/usuarioContext';
import iPlaylist from '../../../utils/types/iPlaylist';
import Styles from './gerenciar.module.scss';

export default function Index() {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];
    const usuarioId = Auth?.get()?.usuarioId ?? 0;

    const [listaPlaylists, setListaPlaylists] = useState<iPlaylist[]>();
    useEffect(() => {
        async function getPlaylists(usuarioId: number) {
            const url = `${CONSTS_PLAYLISTS.API_URL_GET_BY_USUARIO_ID}/${usuarioId}`;
            const listaPlaylists = await Fetch.getApi(url) as iPlaylist[] ?? null;
            console.log(listaPlaylists);
            setListaPlaylists(listaPlaylists);
        }

        if (usuarioId) {
            getPlaylists(usuarioId);
        }
    }, [usuarioId]);

    if (!isAuth) {
        Router.push({ pathname: CONSTS_TELAS.ERRO, query: { erro: CONSTS_ERROS.SEM_ACESSO } });
        return false;
    }

    return (
        <Fragment>
            <Head>
                <title>{CONSTS_SISTEMA.NOME_SISTEMA} — Gerenciar playlists</title>
            </Head>

            <section className={StylesIndex.container}>
                <div className={StylesIndex.div}>
                    <span className='titulo'>Suas playlists</span>

                    <div className={`${Styles.divPlaylists} ${listaPlaylists && listaPlaylists?.length > 0 ? '' : 'margem1_5'}`}>
                        <div className={Styles.divNovaPlaylist} onClick={() => Router.push(CONSTS_TELAS.CRIAR_PLAYLIST)}>
                            <span className={Styles.mais}>+</span>
                            <span className={Styles.texto}>Criar nova playlist</span>
                        </div>

                        {
                            listaPlaylists && listaPlaylists?.length > 0 && (
                                <Playlists listaPlaylists={listaPlaylists} />
                            )
                        }
                    </div>
                </div>
            </section>
        </Fragment>
    )
}