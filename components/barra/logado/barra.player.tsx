import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useContext, useEffect, useState } from 'react';
import TesteImagem from '../../../assets/image/cinza.webp';
import CONSTS_TELAS from '../../../utils/consts/outros/telas';
import { MusicaContext } from '../../../utils/context/musicaContext';
import handleFullScreen from '../../../utils/outros/handleFullScreen';
import Coracao from '../../outros/coracao';
import Aleatorio from '../../svg/barra.player/aleatorio';
import BotaoAvancar from '../../svg/barra.player/botaoAvancar';
import BotaoPlay from '../../svg/barra.player/botaoPlay';
import BotaoStop from '../../svg/barra.player/botaoStop';
import BotaoVoltar from '../../svg/barra.player/botaoVoltar';
import Dispositivo from '../../svg/barra.player/dispositivo';
import Fila from '../../svg/barra.player/fila';
import FullScreen from '../../svg/barra.player/fullscreen';
import Loop from '../../svg/barra.player/loop';
import Microfone from '../../svg/barra.player/microfone';
import Toggle from '../../svg/barra.player/toggle';
import Styles from './barra.player.module.scss';
import ProgressBarPlayer from './outros/progressBar.player';
import ProgressBarVolume from './outros/progressBar.volume';
import ProgressBarVolumeIcone from './outros/progressBar.volume.icone';

export default function BarraPlayer() {

    const _musicaContext = useContext(MusicaContext); // Contexto da música;
    const [musicaContext, setMusicaContext] = [_musicaContext?._musicaContext[0], _musicaContext?._musicaContext[1]];

    const asPath = useRouter();
    const [url, setUrl] = useState<string>('');
    useEffect(() => {
        setUrl(asPath.pathname);
    }, [asPath]);

    const [volume, setVolume] = useState<number>(50);
    function handleVolume(vol: number) {
        setVolume(Math.floor(vol));
    }

    const [volumeAnteriorMutar, setVolumeAnteriorMutar] = useState<number>(0);
    function handleMutarDesmutar() {
        setVolumeAnteriorMutar(volume);

        if (volume > 0) {
            setVolume(0);
        } else {
            setVolume(volumeAnteriorMutar);
        }
    }

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    function handlePlay() {
        // if (!musicaContext?.musicaId) {
        //     Aviso.custom('Nenhuma música foi selecionada', 5000);
        //     return false;
        // }

        setIsPlaying(!isPlaying);
    }

    const [musicaId, setMusicaId] = useState<number>(1);
    const [isCurtido, setIsCurtido] = useState<boolean>(false);
    const [isModoAleatorio, setIsModoAleatorio] = useState<boolean>(false);
    const [isModoLoop, setIsModoLoop] = useState<boolean>(false);

    return (
        <section className={Styles.barraPlayer} id='sectionBarraPlayer'>
            {/* =-=-=-=-=-=-=-=-=-=-=-= Primeira div, esquerda =-=-=-=-=-=-=-=-=-=-=-= */}
            <div className={Styles.divInfo}>
                {
                    musicaId > 0 && (
                        <Fragment>
                            <Image src={TesteImagem} width={56} height={56} alt='' />

                            <div className={Styles.infoMusica}>
                                <span className={Styles.infoTitulo} title={'xxxxxx'}>
                                    {musicaContext?.nome}
                                </span>

                                {/* @ts-ignore */}
                                <span className={Styles.infoDescricao} title={(musicaContext?.musicasBandas ? musicaContext?.musicasBandas[0]?.bandas.nome : '')}>
                                    {/* @ts-ignore */}
                                    {(musicaContext?.musicasBandas ? musicaContext?.musicasBandas[0]?.bandas.nome : '')}
                                </span>
                            </div>

                            <span className={Styles.spanIcone} onClick={() => setIsCurtido(!isCurtido)} title='Curtir/descurtir música'>
                                <Coracao isMusicaCurtida={isCurtido} />
                            </span>

                            <span className={Styles.spanIcone} onClick={() => null} title='Ativar/desativar modo picture-in-picture'>
                                <Toggle />
                            </span>
                        </Fragment>
                    )
                }
            </div>

            {/* =-=-=-=-=-=-=-=-=-=-=-= Segunda div, meio =-=-=-=-=-=-=-=-=-=-=-= */}
            <div className={Styles.divPlayer}>
                <div className={Styles.divPlayerIcones}>
                    <span className={Styles.spanIcone} onClick={() => setIsModoAleatorio(!isModoAleatorio)} title={`${isModoAleatorio ? 'Desativar' : 'Ativado'} modo aleatório`}>
                        <Aleatorio cor={(isModoAleatorio ? 'var(--cor-principal)' : '')} />
                    </span>

                    <span className={Styles.spanIcone} onClick={() => null} title='Voltar uma música'>
                        <BotaoVoltar />
                    </span>

                    <span className={Styles.btnPlay} onClick={() => handlePlay()}>
                        {
                            isPlaying ? (
                                <BotaoStop />
                            ) : (
                                <BotaoPlay />
                            )
                        }
                    </span>

                    <span className={Styles.spanIcone} onClick={() => null} title='Avançar uma música'>
                        <BotaoAvancar />
                    </span>

                    <span className={Styles.spanIcone} onClick={() => setIsModoLoop(!isModoLoop)} title={`${isModoLoop ? 'Desativar' : 'Ativado'} modo loop`}>
                        <Loop cor={(isModoLoop ? 'var(--cor-principal)' : '')} />
                    </span>
                </div>

                <div className={Styles.divPlayerInner}>
                    <ProgressBarPlayer
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        isModoLoop={isModoLoop}
                        volume={volume}
                    />
                </div>
            </div>

            {/* =-=-=-=-=-=-=-=-=-=-=-= Terceira div, direita =-=-=-=-=-=-=-=-=-=-=-= */}
            <div className={Styles.divOpcoes}>
                <span className={Styles.spanIcone} onClick={() => null} title='Visualizar letra'>
                    <Microfone />
                </span>

                <span className={Styles.spanIcone} title='Visualizar fila'>
                    <Link href={CONSTS_TELAS.FILA}>
                        <Fila cor={(url === CONSTS_TELAS.FILA ? 'var(--cor-principal)' : '')} />
                    </Link>
                </span>

                <span className={Styles.spanIcone} onClick={() => null} title='Transmitir para outro dispositivo'>
                    <Dispositivo />
                </span>

                {/* {
                    process.env.NODE_ENV === 'development' && <small>{volume}</small>
                } */}

                <span className={Styles.spanIcone} onClick={() => handleMutarDesmutar()}>
                    <ProgressBarVolumeIcone volume={volume} />
                </span>

                <div className={Styles.divVolume} title={`Volume ${volume}`}>
                    <ProgressBarVolume handleVolume={handleVolume} volume={volume} />
                </div>

                <span className={Styles.spanIcone} onClick={() => handleFullScreen()}>
                    <FullScreen />
                </span>
            </div>
        </section>
    )
}