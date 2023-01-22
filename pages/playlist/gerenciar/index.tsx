import Playlists from '@components//playlists/playlists';
import usePlaylistsByUsuarioId from '@hooks//api/usePlaylistsByUsuarioId';
import CONSTS_ERROS from '@utils/consts/outros/erros';
import CONSTS_SISTEMA from '@utils/consts/outros/sistema';
import CONSTS_TELAS from '@utils/consts/outros/telas';
import { Auth, UsuarioContext } from '@utils/context/usuarioContext';
import iPlaylist from '@utils/types/iPlaylist';
import Head from 'next/head';
import Router from 'next/router';
import { Fragment, useContext } from 'react';
import StylesIndex from '../../../styles/index.module.scss';
import Styles from './gerenciar.module.scss';

export default function Index() {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];
    const usuarioId = Auth?.get()?.usuarioId ?? 0;

    const listaPlaylists = usePlaylistsByUsuarioId(usuarioId, false) as iPlaylist[];

    if (!isAuth) {
        Router.push({ pathname: CONSTS_TELAS.ERRO, query: { erro: CONSTS_ERROS.SEM_ACESSO } });
        return false;
    }

    return (
        <Fragment>
            <Head>
                <title>Gerenciar suas playlists • {CONSTS_SISTEMA.NOME_SISTEMA}</title>
            </Head>

            <section className={StylesIndex.container}>
                <div className={StylesIndex.div}>
                    <span className='titulo'>Suas playlists</span>

                    <div className={`${Styles.divPlaylists} ${listaPlaylists && listaPlaylists?.length > 0 ? '' : 'margem1_5'}`}>
                        <div className={Styles.divNovaPlaylist} onClick={() => Router.push(CONSTS_TELAS.CRIAR_PLAYLIST)}>
                            <span className={Styles.mais}>+</span>
                            <span className={Styles.texto}>Criar nova playlist</span>
                            <span className={Styles.textoPequeno}>Você atualmente tem {listaPlaylists?.length} {listaPlaylists?.length === 1 ? 'playlist' : 'playlists'}</span>
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