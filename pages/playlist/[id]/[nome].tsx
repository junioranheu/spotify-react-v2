import Head from 'next/head';
import nProgress from 'nprogress';
import { Fragment, useContext, useEffect, useState } from 'react';
import ImgCinza from '../../../assets/image/cinza.webp';
import ImageWithFallback from '../../../components/outros/imageWithFallback';
import MusicaRow from '../../../components/playlists/musicaRow';
import { Fetch } from '../../../utils/api/fetch';
import CONSTS_PLAYLISTS from '../../../utils/consts/data/constPlaylists';
import CONSTS_UPLOAD from '../../../utils/consts/data/constUpload';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import { FilaMusicasStorage, MusicaContext } from '../../../utils/context/musicaContext';
import ajustarUrl from '../../../utils/outros/ajustarUrl';
import formatarSegundos from '../../../utils/outros/formatarSegundos';
import iPlaylist from '../../../utils/types/iPlaylist';
import iPlaylistMusica from '../../../utils/types/iPlaylistMusica';
import Styles from './playlist.module.scss';

interface iParametros {
    playlist: iPlaylist;
    imgCapa?: string | null;
}

export default function Playlist({ playlist, imgCapa }: iParametros) {

    const _musicaContext = useContext(MusicaContext); // Contexto da música;
    const [filaMusicasContext, setFilaMusicasContext] = [_musicaContext?._filaMusicasContext[0], _musicaContext?._filaMusicasContext[1]];

    useEffect(() => {
        function setarCorBackground(background: string) {
            var els = document.getElementsByClassName('main');
            Array.prototype.forEach.call(els, function (el) {
                el.style = background;
            });
        }

        // Ao entrar na tela;
        const corDominante = playlist?.corDominante ?? '';
        if (corDominante) {
            setarCorBackground(`background: linear-gradient(180deg, ${corDominante} 0%, rgba(18, 18, 18, 1) 24%, rgba(18, 18, 18, 1) 100%)`);
        }

        // Ao sair da tela;
        return () => {
            setarCorBackground(`var(--background-gradient-original)`)
        }
    }, [playlist?.corDominante]);

    function concatenarBandas(playlist: iPlaylist) {
        nProgress.start();
        let bandas = '';
        const limite = 3;
        let contador = 1;
        let isPassouLimite = false;

        playlist?.playlistsMusicas.forEach(function (pm: iPlaylistMusica) {
            if (contador <= limite) {
                // @ts-ignore;
                const banda = pm?.musicas?.musicasBandas[0]?.bandas.nome;

                // Se a banda não estiver na string "bandas", adicione-a;
                if (!bandas.includes(banda)) {
                    bandas = bandas + `, ${banda}`;
                    contador++;
                }
            } else {
                isPassouLimite = true;
            }
        });

        bandas = bandas.replace(', ', '');

        // Se passou do limite...
        if (isPassouLimite) {
            return `${bandas} e mais`;
        }

        nProgress.done();
        return bandas;
    }

    function somarDuracaoPlaylist(playlist: iPlaylist) {
        nProgress.start();
        let duracao = 0;
        playlist?.playlistsMusicas.forEach(function (pm: iPlaylistMusica) {
            // @ts-ignore;
            const d = pm?.musicas.duracaoSegundos;
            duracao += d;
        });

        const duracaoFormatada = formatarSegundos(duracao, true);
        nProgress.done();

        return duracaoFormatada;
    }
 
    // Ao clicar para ouvir uma música da playlist, set essa playlist como a atual;
    const [isMusicaClicadaParaSetarLista, setIsMusicaClicadaParaSetarLista] = useState<boolean>(false);
    useEffect(() => {
        if (isMusicaClicadaParaSetarLista) {
            const listaMusicas = playlist.playlistsMusicas;

            // Setar todos isJaTocada para false, já que a lista está sendo renovada nesse momento;
            listaMusicas.forEach((m: iPlaylistMusica) => {
                m.isJaTocada = false;
            });
 
            FilaMusicasStorage.set(listaMusicas);
            setFilaMusicasContext(listaMusicas);
        }
    }, [isMusicaClicadaParaSetarLista, playlist?.playlistsMusicas, setFilaMusicasContext]);

    return (
        <Fragment>
            <Head>
                <title>{(playlist?.nome ? `${playlist?.nome} — ${CONSTS_SISTEMA.NOME_SISTEMA}` : CONSTS_SISTEMA.NOME_SISTEMA)}</title>
            </Head>

            <section className='container-padrao'>
                {/* Banner */}
                <div className={Styles.banner}>
                    {
                        imgCapa && (
                            <div>
                                <ImageWithFallback
                                    width={220}
                                    height={220}
                                    className={Styles.capa}
                                    src={imgCapa}
                                    fallbackSrc={ImgCinza}
                                />
                            </div>
                        )
                    }

                    <div className={Styles.divDireita}>
                        <span className={Styles.span1}>Lista de reprodução</span>
                        <span className={Styles.span2}>{playlist.nome}</span>
                        <span className={Styles.span3}>{concatenarBandas(playlist)}</span>
                        <span className={Styles.span4}>
                            {playlist.usuarios?.nomeCompleto} • {playlist.playlistsMusicas?.length} {(playlist.playlistsMusicas?.length > 1 ? 'músicas' : 'música')}, {somarDuracaoPlaylist(playlist)}
                        </span>
                    </div>
                </div>

                <div className={Styles.divisao}></div>

                {/* Playlist */}
                <div className='div-padrao'>
                    <div>
                        {
                            playlist?.playlistsMusicas?.length > 0 ? (
                                <Fragment>
                                    {
                                        playlist.playlistsMusicas.map((m: iPlaylistMusica, i: number) => (
                                            <MusicaRow
                                                key={m.musicas?.musicaId}
                                                musicaId={m.musicas?.musicaId ?? 0}
                                                i={(i + 1)} // A ordem tem que começar no 1;   
                                                // @ts-ignore;    
                                                foto={m.musicas?.musicasBandas[0]?.bandas?.foto}
                                                titulo={m.musicas?.nome}
                                                // @ts-ignore;
                                                banda={m.musicas?.musicasBandas[0]?.bandas?.nome}
                                                // @ts-ignore;
                                                album={m.musicas?.albunsMusicas?.albuns?.nome}
                                                tempo={m.musicas?.duracaoSegundos}
                                                isDesativarUm={false}
                                                setIsMusicaClicadaParaSetarLista={setIsMusicaClicadaParaSetarLista}
                                            />
                                        ))
                                    }
                                </Fragment>
                            ) : (
                                <div>
                                    <span className='texto'>Para onde foram as músicas dessa playlist? 🤔</span>
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export async function getStaticPaths() {
    const url = CONSTS_PLAYLISTS.API_URL_GET_TODOS;
    const playlists = await Fetch.getApi(url);
    // console.log(playlists);

    // Gerar o "paths";
    const paths = playlists?.map((p: iPlaylist) => ({
        params: {
            id: p.playlistId.toString(),
            nome: ajustarUrl(p.nome)
        }
    }));

    return {
        paths,
        fallback: 'blocking' // para atualizar de x em x tempos: https://nextjs.org/docs/api-reference/data-fetching/get-static-paths;
    }
}

export async function getStaticProps(context: any) {
    const id = context.params.id;

    // Informações da playlist;
    const url = `${CONSTS_PLAYLISTS.API_URL_GET_BY_ID}/${id}`;
    const playlist = await Fetch.getApi(url) as iPlaylist;

    // Capa da playlist;
    const imgCapa = `${CONSTS_UPLOAD.API_URL_GET_PLAYLIST}/${playlist.foto}`;

    return {
        props: {
            playlist,
            imgCapa,
            revalidate: 5 // segundos;
        }
    }
}