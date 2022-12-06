import Head from 'next/head';
import Router from 'next/router';
import { Fragment, useContext, useEffect, useState } from 'react';
import MusicaRow from '../../components/playlists/musicaRow';
import CONSTS_ERROS from '../../utils/consts/outros/erros';
import CONSTS_SISTEMA from '../../utils/consts/outros/sistema';
import CONSTS_TELAS from '../../utils/consts/outros/telas';
import { MusicaContext } from '../../utils/context/musicaContext';
import { UsuarioContext } from '../../utils/context/usuarioContext';
import iPlaylistMusica from '../../utils/types/iPlaylistMusica';

export default function Index() {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    const _musicaContext = useContext(MusicaContext); // Contexto da música;
    const [musicaContext, setMusicaContext] = [_musicaContext?._musicaContext[0], _musicaContext?._musicaContext[1]];
    const [filaMusicasContext, setFilaMusicasContext] = [_musicaContext?._filaMusicasContext[0], _musicaContext?._filaMusicasContext[1]];

    const [filaMusicasContextFiltrarIsJaTocadaFalse, setFilaMusicasContextFiltrarIsJaTocadaFalse] = useState<iPlaylistMusica[]>();
    useEffect(() => {
        if (filaMusicasContext) {
            setFilaMusicasContextFiltrarIsJaTocadaFalse(filaMusicasContext.filter(x => x.musicaId !== musicaContext?.musicaId && x.isJaTocada === false));
        }
    }, [filaMusicasContext]);

    if (!isAuth) {
        Router.push({ pathname: CONSTS_TELAS.ERRO, query: { erro: CONSTS_ERROS.SEM_ACESSO } });
        return false;
    }

    return (
        <Fragment>
            <Head>
                <title>{CONSTS_SISTEMA.NOME_SISTEMA} — Fila</title>
            </Head>

            <section className='container-padrao'>
                {/* Atual */}
                <div className='div-padrao'>
                    <span className='titulo'>Fila</span>
                    <span className='subtitulo'>Em reprodução</span>

                    <div>
                        {
                            musicaContext && musicaContext?.musicaId > 0 ? (
                                <MusicaRow
                                    key={1}
                                    musicaId={musicaContext?.musicaId ?? 0}
                                    i={1} // Começa no 1;   
                                    // @ts-ignore;
                                    foto={musicaContext?.musicasBandas[0]?.bandas?.foto}
                                    titulo={musicaContext?.nome}
                                    // @ts-ignore;
                                    banda={musicaContext?.musicasBandas[0]?.bandas?.nome}
                                    // @ts-ignore;
                                    album={musicaContext?.albunsMusicas[0]?.albuns?.nome}
                                    tempo={musicaContext?.duracaoSegundos}
                                    isDesativarUm={true}
                                    setIsMusicaClicadaParaSetarLista={null}
                                />
                            ) : (
                                <div>
                                    <span className='texto'>Nenhuma música em reprodução agora</span>
                                </div>
                            )
                        }
                    </div>
                </div>

                {/* Próximas na fila */}
                <div className='div-padrao'>
                    <span className='titulo'>Próximas</span>

                    <div>
                        {
                            filaMusicasContextFiltrarIsJaTocadaFalse && filaMusicasContextFiltrarIsJaTocadaFalse?.length > 0 ? (
                                <Fragment>
                                    {
                                        // Exibir todas as músicas que não foram tocadas ainda;
                                        filaMusicasContextFiltrarIsJaTocadaFalse.map((m, i) => (
                                            <MusicaRow
                                                key={m?.musicaId}
                                                musicaId={m?.musicaId ?? 0}
                                                i={(i + 2)} // Começa no x + 2;
                                                // @ts-ignore;
                                                foto={m?.musicas.musicasBandas[0]?.bandas.foto}
                                                titulo={m?.musicas?.nome}
                                                // @ts-ignore;
                                                banda={m.musicas?.musicasBandas[0]?.bandas.nome}
                                                // @ts-ignore;
                                                album={m?.musicas?.albunsMusicas[0]?.albuns?.nome}
                                                tempo={m?.musicas?.duracaoSegundos}
                                                isDesativarUm={false}
                                                setIsMusicaClicadaParaSetarLista={null}
                                            />
                                        ))
                                    }
                                </Fragment>
                            ) : (
                                <div>
                                    <span className='texto'>Sem músicas na sua fila de reprodução</span>
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
