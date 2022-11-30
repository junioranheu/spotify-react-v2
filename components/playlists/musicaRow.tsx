import Image from 'next/image';
import { Fragment, useState } from 'react';
import ImgCinza from '../../assets/image/cinza.webp';
import Coracao from '../../components/outros/coracao';
import Reticencias from '../../components/svg/reticencias';
import formatarSegundos from '../../utils/outros/formatarSegundos';
import BotaoPlay from '../svg/botaoPlay';
import Styles from './musicaRow.module.scss';

interface iParametros {
    i: number;
    id: number;
    foto?: string | null;
    titulo?: string | null;
    banda?: string | null;
    album?: string | null;
    tempo?: number | null;
    setarMusica: any;
    isDesativarUm: boolean;
}

export default function MusicaRow({ i, id, foto, titulo, banda, album, tempo, setarMusica, isDesativarUm }: iParametros) {

    // const [isPlayingContext] = useContext(IsPlayingContext); // Context isPlaying;]

    const [isMusicaCurtida, setIsMusicaCurtida] = useState(false);
    function handleCoracao() {
        setIsMusicaCurtida(!isMusicaCurtida);
    }

    // // Quando uma música é selecionada no MusicaContext;
    // const [musicaContext] = useContext(MusicaContext); // Context da música;
    const [imagemBanda, setImagemBanda] = useState(ImgCinza);
    // useEffect(() => {
    //     // console.log(musicaContext);
    //     // console.log(musicaContext?.musicaId);

    //     // Import dinâmico: capa da música reproduzindo;
    //     if (foto) {
    //         // console.log('Entrou aqui com o nome de ' + foto);
    //         const img = `${CONSTANTS_UPLOAD.API_URL_GET_CAPA}/${foto}`;
    //         setImagemBanda(img);
    //     }
    // }, [musicaContext]);

    return (
        <div className={Styles.divMusica}>
            <div className={Styles.divEsquerda}>
                {
                    isDesativarUm ? (
                        <Fragment>
                            <span className={`${(i > 1 ? Styles.contador : Styles.contadorItem1)} ${(i === 1 && Styles.verde)}`}>
                                {/* {((id === musicaContext?.musicaId && isPlayingContext) ? <Image src={GifEqualiser} width={14} height={14} alt='' /> : i)} */}
                                {i}
                            </span>

                            <span className={`${(i > 1 ? Styles.esconderPlay : Styles.esconderItem1)}`} onClick={(e) => setarMusica(e)}><BotaoPlay width='14' cor='#A7A7A7' /></span>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <span className={Styles.contador}>
                                {/* {((id === musicaContext?.musicaId && isPlayingContext) ? <Image src={GifEqualiser} width={14} height={14} alt='' /> : i)} */}
                                {i}
                            </span>

                            <span className={Styles.esconderPlay} onClick={(e) => setarMusica(e)}><BotaoPlay width='14' cor='#A7A7A7' /></span>
                        </Fragment>
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
                <span className='pointer'><Reticencias width='16' cor='#A7A7A7' /></span>
            </div>
        </div>
    )
}
