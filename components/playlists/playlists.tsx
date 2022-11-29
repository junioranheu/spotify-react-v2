import Link from 'next/link';
import ImgCinza from '../../assets/image/cinza.webp';
import ImageWithFallback from '../../components/outros/imageWithFallback';
import CONSTS_UPLOAD from '../../utils/consts/data/constUpload';
import ajustarUrl from '../../utils/outros/ajustarUrl';
import iPlaylist from '../../utils/types/iPlaylist';
import BotaoPlay from '../svg/botaoPlay';
import Styles from './playlists.module.scss';

interface iParametros {
    listaPlaylists: iPlaylist[];
}

export default function Playlists({ listaPlaylists }: iParametros) {
    return (
        <div className={Styles.divPlaylists}>
            {
                listaPlaylists.filter(x => x.isAtivo === true).map((p) => (
                    <Link href={`/playlist/${p.playlistId}/${ajustarUrl(p.nome)}`} passHref key={p.playlistId}>
                        <div className={Styles.playlist}>
                            <div className={Styles.divThumbnail}>
                                <ImageWithFallback
                                    width={210}
                                    height={210}
                                    src={`${CONSTS_UPLOAD.API_URL_GET_PLAYLIST}/${p.foto}`}
                                    fallbackSrc={ImgCinza}
                                />
                            </div>

                            <div className={Styles.btnPlay}>
                                <BotaoPlay width='18' cor='var(--preto)' />
                            </div>

                            <span className={Styles.tituloPlaylist}>{p.nome}</span>
                            <span className={Styles.descricaoPlaylist}>{p.sobre}</span>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}