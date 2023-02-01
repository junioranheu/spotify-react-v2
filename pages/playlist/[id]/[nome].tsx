import ImgCinza from '@assets//image/cinza.webp';
import Botao from '@components/outros/botao';
import ImageWithFallback from '@components/outros/imageWithFallback';
import MusicaRow from '@components/playlists/musicaRow';
import { Fetch } from '@utils/api/fetch';
import CONSTS_MUSICAS from '@utils/consts/data/constMusicas';
import CONSTS_PLAYLISTS from '@utils/consts/data/constPlaylists';
import CONSTS_UPLOAD from '@utils/consts/data/constUpload';
import CONSTS_SISTEMA from '@utils/consts/outros/sistema';
import CONSTS_TELAS from '@utils/consts/outros/telas';
import { FilaMusicasStorage, MusicaContext } from '@utils/context/musicaContext';
import { Auth } from '@utils/context/usuarioContext';
import ajustarUrl from '@utils/outros/ajustarUrl';
import formatarSegundos from '@utils/outros/formatarSegundos';
import iMusica from '@utils/types/iMusica';
import iPlaylist from '@utils/types/iPlaylist';
import iPlaylistMusica from '@utils/types/iPlaylistMusica';
import Head from 'next/head';
import nProgress from 'nprogress';
import { Fragment, useContext, useEffect, useState } from 'react';
import Styles from './playlist.module.scss';

interface iParametros {
    playlist: iPlaylist;
    imgCapa?: string | null;
}

export default function Playlist({ playlist, imgCapa }: iParametros) {

    const _musicaContext = useContext(MusicaContext); // Contexto da música;
    const [filaMusicasContext, setFilaMusicasContext] = [_musicaContext?._filaMusicasContext[0], _musicaContext?._filaMusicasContext[1]];

    const usuarioId = Auth?.get()?.usuarioId ?? 0;

    const [isUsuarioOwnerPlaylist, setIsUsuarioOwnerPlaylist] = useState<boolean>(false);
    useEffect(() => {
        const isOwner = playlist.usuarioId === usuarioId;
        setIsUsuarioOwnerPlaylist(isOwner);
    }, [playlist, usuarioId]);

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

        if (bandas === undefined || bandas === null || bandas === 'undefined') {
            bandas = '';
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

    // Buscar músicas novamente (forçar getStaticProps);
    const [listaMusicas, setListaMusicas] = useState<iMusica[]>();
    useEffect(() => {
        async function getMusicasByPlaylistId(playlistId: string) {
            nProgress.start()
            const url = `${CONSTS_MUSICAS.API_URL_BY_PLAYLIST}/${playlistId}`;
            const musicas = await Fetch.getApi(url) as iMusica[];
            setListaMusicas(musicas);
            nProgress.done();
        }

        if (playlist?.playlistId) {
            getMusicasByPlaylistId(playlist?.playlistId.toString());
        }
    }, [playlist?.playlistId]);

    return (
        <Fragment>
            <Head>
                <title>{(playlist?.nome ? `${playlist?.nome} • ${CONSTS_SISTEMA.NOME_SISTEMA}` : CONSTS_SISTEMA.NOME_SISTEMA)}</title>
            </Head>

            <section className='container-padrao margem1'>
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

                    <div className={Styles.divEsquerda}>
                        <span className={Styles.span1}>Lista de reprodução</span>
                        <span className={Styles.span2}>{playlist.nome}</span>
                        <span className={Styles.span3}>{concatenarBandas(playlist)}</span>
                        <span className={Styles.span4}>
                            {playlist.usuarios?.nomeCompleto} • {playlist.playlistsMusicas?.length} {(playlist.playlistsMusicas?.length === 1 ? 'música' : 'músicas')}, {somarDuracaoPlaylist(playlist)}
                        </span>
                    </div>

                    {
                        isUsuarioOwnerPlaylist && (
                            <div className={Styles.divDireita}>
                                <Botao
                                    texto='Gerenciar playlist'
                                    url={`${CONSTS_TELAS.GERENCIAR_PLAYLIST_ID}/${playlist.playlistId}/${ajustarUrl(playlist.nome)}`}
                                    isNovaAba={false}
                                    handleFuncao={() => null}
                                    Svg={null}
                                    refBtn={null}
                                    isEnabled={true}
                                />
                            </div>
                        )
                    }
                </div>

                <div className={Styles.divisao}></div>

                {/* Playlist */}
                <div className='div-padrao'>
                    <Fragment>
                        {
                            listaMusicas && listaMusicas?.length > 0 ? (
                                <Fragment>
                                    {
                                        listaMusicas && listaMusicas.map((m: iMusica, i: number) => (
                                            <MusicaRow
                                                key={m?.musicaId}
                                                musicaId={m?.musicaId ?? 0}
                                                i={(i + 1)} // A ordem tem que começar no 1;   
                                                // @ts-ignore;    
                                                foto={m?.musicasBandas[0]?.bandas?.foto}
                                                titulo={m?.nome}
                                                // @ts-ignore;
                                                banda={m?.musicasBandas[0]?.bandas?.nome}
                                                // @ts-ignore;
                                                album={m?.albunsMusicas?.albuns?.nome}
                                                tempo={m?.duracaoSegundos}
                                                isDesativarUm={false}
                                                setIsMusicaClicadaParaSetarLista={setIsMusicaClicadaParaSetarLista}
                                            />
                                        ))
                                    }
                                </Fragment>
                            ) : (
                                <div className='div-padrao animate__animated animate__fadeIn animate__slower'>
                                    <span className='titulo'>Cri, cri, cri... 🦗</span>
                                    <span className='texto'>Essa playlist ainda não tem nenhuma música!</span>
                                </div>
                            )
                        }
                    </Fragment>
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