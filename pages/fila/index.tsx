import Head from 'next/head';
import { Fragment, useContext, useEffect, useState } from 'react';
import MusicaRow from '../../components/playlists/musicaRow';
import CONSTS_SISTEMA from '../../utils/consts/outros/sistema';
import { MusicaContext } from '../../utils/context/musicaContext';
import { UsuarioContext } from '../../utils/context/usuarioContext';

export default function Index() {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    const _musicaContext = useContext(MusicaContext); // Contexto da música;
    const [musicaContext, setMusicaContext] = [_musicaContext?._musicaContext[0], _musicaContext?._musicaContext[1]];
    const [filaMusicasContext, setFilaMusicasContext] = [_musicaContext?._filaMusicasContext[0], _musicaContext?._filaMusicasContext[1]];

    const [isMusicaClicadaParaSetarLista, setIsMusicaClicadaParaSetarLista] = useState<boolean>(false);
    
    useEffect(() => {
        console.log(musicaContext);
        console.log(filaMusicasContext);
    }, [musicaContext, filaMusicasContext]);

    return (
        <Fragment>
            <Head>
                <title>{CONSTS_SISTEMA.NOME_SISTEMA} — Fila</title>
            </Head>

            {
                !isAuth ? (
                    <div>
                        <span>Usuário não está autenticado</span>
                    </div>
                ) : (
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
                                            i={1} // A ordem tem que começar no 1;   
                                            // @ts-ignore;
                                            foto={musicaContext?.musicasBandas[0]?.bandas?.foto}
                                            titulo={musicaContext?.nome}
                                            // @ts-ignore;
                                            banda={musicaContext?.musicasBandas[0]?.bandas?.nome}
                                            // @ts-ignore;
                                            album={musicaContext?.albunsMusicas?.albuns?.nome}
                                            tempo={musicaContext?.duracaoSegundos}
                                            isDesativarUm={false}
                                            setIsMusicaClicadaParaSetarLista={setIsMusicaClicadaParaSetarLista}
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
                                    filaMusicasContext && filaMusicasContext?.length > 0 ? (
                                        <Fragment>
                                            {
                                                filaMusicasContext.filter(x => x.musicaId !== musicaContext?.musicaId).map((m, i) => (
                                                    // <MusicaRow
                                                    //     key={m.musicaId}
                                                    //     i={(i + 2)} // A ordem tem que começar no 2;
                                                    //     id={m.musicaId}
                                                    //     foto={m.musicasBandas[0]?.bandas.foto}
                                                    //     titulo={m.nome}
                                                    //     banda={m.musicasBandas[0]?.bandas.nome}
                                                    //     album={m.albunsMusicas[0]?.albuns.nome}
                                                    //     tempo={m.duracaoSegundos}
                                                    //     setarMusica={setarMusica}
                                                    //     isDesativarUm={true}
                                                    // />

                                                    <MusicaRow
                                                        key={m?.musicaId}
                                                        musicaId={musicaContext?.musicaId ?? 0}
                                                        i={(i + 1)} // A ordem tem que começar no 1;   
                                                        // @ts-ignore;
                                                        foto={m.musicasBandas[0]?.bandas.foto}
                                                        titulo={m?.musicas?.nome}
                                                        // @ts-ignore;
                                                        banda={m.musicas?.musicasBandas[0]?.bandas.nome}
                                                        // @ts-ignore;
                                                        album={m?.musicas?.albunsMusicas[0]?.albuns.nome}
                                                        tempo={m?.musicas?.duracaoSegundos}
                                                        isDesativarUm={true}
                                                        setIsMusicaClicadaParaSetarLista={setIsMusicaClicadaParaSetarLista}
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
                )
            }
        </Fragment>
    )
}
