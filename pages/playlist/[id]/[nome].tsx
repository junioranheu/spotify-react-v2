import Head from 'next/head';
import { Fragment } from 'react';
import ImgCinza from '../../../assets/image/cinza.webp';
import ImageWithFallback from '../../../components/outros/imageWithFallback';
import { Fetch } from '../../../utils/api/fetch';
import CONSTS_PLAYLISTS from '../../../utils/consts/data/constPlaylists';
import CONSTS_UPLOAD from '../../../utils/consts/data/constUpload';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
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

    function concatenarBandas(playlist: iPlaylist) {
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

        return bandas;
    }

    function somarDuracaoPlaylist(playlist: iPlaylist) {
        let duracao = 0;
        playlist?.playlistsMusicas.forEach(function (pm: iPlaylistMusica) {
            // @ts-ignore;
            const d = pm?.musicas.duracaoSegundos;
            duracao += d;
        });

        return formatarSegundos(duracao, true);
    }

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
                {/* <div className='div-padrao'>
                    <div>
                        {
                            playlist?.playlistsMusicas?.length > 0 ? (
                                <Fragment>
                                    {
                                        playlist.playlistsMusicas.map((m, i) => (
                                            <MusicaRow
                                                key={m.musicas.musicaId}
                                                i={(i + 1)} // A ordem tem que começar no 1;
                                                id={m.musicas.musicaId}
                                                foto={m.musicas.musicasBandas[0]?.bandas?.foto}
                                                titulo={m.musicas.nome}
                                                banda={m.musicas.musicasBandas[0]?.bandas?.nome}
                                                album={m.musicas.albunsMusicas?.albuns?.nome}
                                                tempo={m.musicas.duracaoSegundos}
                                                setarMusica={setarMusica}
                                                isDesativarUm={false}
                                            />
                                        ))
                                    }
                                </Fragment>
                            ) : (
                                <div>
                                    <span className='textoNormal'>Sem músicas na sua fila de reprodução</span>
                                </div>
                            )
                        }
                    </div>
                </div> */}
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