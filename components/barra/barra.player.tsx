import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import TesteImagem from '../../assets/image/cinza.webp';
import handleFullScreen from '../../utils/outros/handleFullScreen';
import Coracao from '../outros/coracao';
import BotaoAvancar from '../svg/barra.player/botaoAvancar';
import BotaoPlay from '../svg/barra.player/botaoPlay';
import BotaoVoltar from '../svg/barra.player/botaoVoltar';
import Dispositivo from '../svg/barra.player/dispositivo';
import FullScreen from '../svg/barra.player/fullscreen';
import Microfone from '../svg/barra.player/microfone';
import Toggle from '../svg/barra.player/toggle';
import Styles from './barra.player.module.scss';

export default function BarraPlayer() {
    return (
        <section className={Styles.barraPlayer}>
            {/* =-=-=-=-=-=-=-=-=-=-=-= Primeira div, esquerda =-=-=-=-=-=-=-=-=-=-=-= */}
            <div className={Styles.divInfo}>
                {
                    // musicaContext?.musicaId > 0 && (
                    <Fragment>
                        <div className={Styles.divInner}>
                            <div>
                                <Image src={TesteImagem} width={56} height={56} alt='' />
                            </div>

                            <div className={Styles.infoMusica}>
                                <span className={Styles.infoTitulo} title={'xxxxxx'}>
                                    {/* {musicaContext.nome} */}
                                    Isso é um teste
                                </span>

                                {/* <span className={Styles.infoDescricao} title={(musicaContext?.musicasBandas ? musicaContext?.musicasBandas[0]?.bandas.nome : '')}>
                                    {(musicaContext?.musicasBandas ? musicaContext?.musicasBandas[0]?.bandas.nome : '')}
                                </span> */}

                                <span className={Styles.infoDescricao}>
                                    Alooooo oi né?
                                </span>
                            </div>
                        </div>

                        <span className={`${Styles.spanIcone} ${Styles.iconeCoracao}`} onClick={() => null} title='Curtir/descurtir música'>
                            <Coracao isMusicaCurtida={true} />
                        </span>

                        <span className={Styles.spanIcone} onClick={() => null} title='Ativar/desativar modo picture-in-picture'>
                            <Toggle />
                        </span>
                    </Fragment>
                    // )
                }
            </div>

            {/* =-=-=-=-=-=-=-=-=-=-=-= Segunda div, meio =-=-=-=-=-=-=-=-=-=-=-= */}
            <div className={Styles.divPlayer}>
                <div className={Styles.divPlayerIcones}>
                    <span className={Styles.spanIcone} onClick={() => null} title='Ativar/desativar modo aleatório'>
                        {/* <Aleatorio cor={(isModoAleatorio ? 'var(--verde)' : '')} /> */}
                    </span>

                    <span className={Styles.spanIcone} onClick={() => null} title='Voltar uma música'>
                        <BotaoVoltar />
                    </span>

                    <span className={Styles.btnPlay} onClick={() => null} >
                        {/* {
                            isPlaying ? (
                                <BotaoStop />
                            ) : (
                                <BotaoPlay />
                            )
                        } */}
                        <BotaoPlay />
                    </span>

                    <span className={Styles.spanIcone} onClick={() => null} title='Avançar uma música'>
                        <BotaoAvancar />
                    </span>

                    <span className={Styles.spanIcone} onClick={() => null} title='Ativar/desativar modo loop'>
                        {/* <Loop cor={(isModoLoop ? 'var(--verde)' : '')} /> */}
                    </span>
                </div>

                <div className={Styles.divPlayerInner}>
                    {/* <ProgressBarPlayer
                        isPlaying={isPlaying}
                        volume={volume}
                        arquivoMusica={arquivoMusica}
                        musicaContext={musicaContext}
                        handleAvancar={handleAvancar}
                        isModoLoop={isModoLoop}
                        isPodeAvancar={isPodeAvancar}
                    /> */}
                </div>
            </div>

            {/* =-=-=-=-=-=-=-=-=-=-=-= Terceira div, direita =-=-=-=-=-=-=-=-=-=-=-= */}
            <div className={Styles.divOpcoes}>
                <span className={Styles.spanIcone} onClick={() => null} title='Visualizar letra'>
                    <Microfone />
                </span>

                <span className={Styles.spanIcone} title='Visualizar fila'>
                    <Link href={'/fila'}>
                        {/* <Fila cor={(url === '/fila' ? 'var(--verde)' : '')} /> */}
                    </Link>
                </span>

                <span className={Styles.spanIcone} onClick={() => null} title='Transmitir para outro dispositivo'>
                    <Dispositivo />
                </span>

                <span className={Styles.spanIcone} onClick={() => null}>
                    {/* {
                        volume >= 65 ? (
                            <Volume4 />
                        ) : volume >= 30 && volume < 65 ? (
                            <Volume3 />
                        ) : volume >= 1 && volume < 30 ? (
                            <Volume2 />
                        ) : (
                            <Volume1 />
                        )
                    } */}
                </span>

                <div className={Styles.divVolume} title={`Volume 1000000000`}>
                    {/* <ProgressBarVolume getVolume={getVolume} volume={volume} /> */}
                </div>

                <span className={Styles.spanIcone} onClick={() => handleFullScreen()}>
                    <FullScreen />
                </span>
            </div>
        </section>
    )
}