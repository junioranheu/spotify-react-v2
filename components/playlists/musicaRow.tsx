import Image, { StaticImageData } from 'next/image';
import { useContext, useEffect, useState } from 'react';
import ImgCinza from '../../assets/image/cinza.webp';
import GifEqualiser from '../../assets/image/equaliser.gif';
import Coracao from '../../components/outros/coracao';
import Reticencias from '../../components/svg/reticencias';
import { Fetch } from '../../utils/api/fetch';
import CONSTS_MUSICAS from '../../utils/consts/data/constMusicas';
import CONSTS_UPLOAD from '../../utils/consts/data/constUpload';
import { MusicaContext, MusicaStorage } from '../../utils/context/musicaContext';
import { UsuarioContext } from '../../utils/context/usuarioContext';
import { Aviso } from '../../utils/outros/aviso';
import formatarSegundos from '../../utils/outros/formatarSegundos';
import BotaoPlay from '../svg/botaoPlay';
import Styles from './musicaRow.module.scss';

interface iParametros {
    i: number;
    musicaId: number;
    foto?: string | null;
    titulo?: string | null;
    banda?: string | null;
    album?: string | null;
    tempo?: number | null;
    isDesativarUm: boolean;
}

export default function MusicaRow({ i, musicaId, foto, titulo, banda, album, tempo, isDesativarUm }: iParametros) {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    const _musicaContext = useContext(MusicaContext); // Contexto da música;
    const [musicaContext, setMusicaContext] = [_musicaContext?._musicaContext[0], _musicaContext?._musicaContext[1]];
    const [isPlayingContext, setIsPlayingContext] = [_musicaContext?._isPlaying[0], _musicaContext?._isPlaying[1]];

    const [isMusicaCurtida, setIsMusicaCurtida] = useState<boolean>(false);
    function handleCoracao() {
        setIsMusicaCurtida(!isMusicaCurtida);
    }

    const [imagemBanda, setImagemBanda] = useState<StaticImageData | string>(ImgCinza);
    useEffect(() => {
        if (foto) {
            const img = `${CONSTS_UPLOAD.API_URL_GET_CAPA}/${foto}`;
            setImagemBanda(img);
        }
    }, [foto]);

    async function handleSetarMusica(musicaId: number) {
        // Se o usuário estiver deslogado;
        // if (!isAuth) {
        //     Aviso.custom('Inicie uma <b>sessão</b> para escutar essa música!', 5000);
        //      return false;
        // }

        if (!musicaId) {
            Aviso.custom('Houve um erro ao identificar esta música', 5000);
            return false;
        }

        const url = `${CONSTS_MUSICAS.API_URL_GET_BY_ID}/${musicaId}`;
        const musica = await Fetch.getApi(url);
        // console.log(musica);

        // Salvar no Context e no localStorage;
        MusicaStorage.set(musica);
        setMusicaContext(musica);
    }

    return (
        <div className={Styles.divMusica}>
            <div className={Styles.divEsquerda}>
                {
                    isDesativarUm ? (
                        <div className={Styles.divContador}>
                            <span className={`${(i > 1 ? Styles.contador : Styles.contadorItem1)} ${(i === 1 && Styles.verde)}`}>
                                {((musicaId === musicaContext?.musicaId && isPlayingContext) ? <Image src={GifEqualiser} width={14} height={14} alt='' /> : i)}
                            </span>

                            <span className={`${(i > 1 ? Styles.esconderPlay : Styles.esconderItem1)}`} onClick={() => handleSetarMusica(musicaId)}>
                                <BotaoPlay width='14' cor='var(--cinza-claros)' />
                            </span>
                        </div>
                    ) : (
                        <div className={Styles.divContador}>
                            <span className={Styles.contador}>
                                {((musicaId === musicaContext?.musicaId && isPlayingContext) ? <Image src={GifEqualiser} width={14} height={14} alt='' /> : i)}
                            </span>

                            <span className={Styles.esconderPlay} onClick={() => handleSetarMusica(musicaId)}>
                                <BotaoPlay width='14' cor='var(--cinza-claro)' />
                            </span>
                        </div>
                    )
                }

                <div className={Styles.divImg}>
                    <Image src={imagemBanda} width={40} height={40} alt='' />
                </div>

                <div className={Styles.divInfoMusica}>
                    <span className={`${Styles.verdeOnHover} ${(i === 1 && isDesativarUm && Styles.verde)}`}>{titulo}</span>
                    <span>{banda}</span>
                </div>
            </div>

            <div className={Styles.divMeio}>
                <span>{album}</span>
            </div>

            <div className={Styles.divDireita}>
                <span onClick={() => handleCoracao()} title={`Curtir/descurtir "${titulo}"`}>
                    <Coracao isMusicaCurtida={isMusicaCurtida} />
                </span>

                <span className={Styles.tempo}>{formatarSegundos(tempo ?? 0, false)}</span>
                <span className='pointer'><Reticencias width='16' cor='var(--cinza-claro)' /></span>
            </div>
        </div>
    )
}
