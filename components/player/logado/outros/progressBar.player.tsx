import nProgress from 'nprogress';
import { Fragment, MouseEvent, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLongPress } from 'use-long-press'; // https://www.npmjs.com/package/use-long-press
import useWindowSize from '../../../../hooks/outros/useWindowSize';
import { Fetch } from '../../../../utils/api/fetch';
import CONSTS_UPLOAD_PROTEGIDO from '../../../../utils/consts/data/constUploadProtegido';
import { FilaMusicasStorage, MusicaContext } from '../../../../utils/context/musicaContext';
import { Aviso } from '../../../../utils/outros/aviso';
import converterStreamEmObjectURL from '../../../../utils/outros/converterStreamEmObjectURL';
import formatarSegundos from '../../../../utils/outros/formatarSegundos';
import UUID from '../../../../utils/outros/UUID';
import Styles from '../outros/progressBar.module.scss';

interface iParametros {
    isModoLoop: boolean;
    volume: number;
    handleAvancar: () => void;
}

// https://codesandbox.io/s/quirky-hopper-jfcx9?file=/src/progress.js:0-2097
export default function ProgressBarPlayer({ isModoLoop, volume, handleAvancar }: iParametros) {

    const _musicaContext = useContext(MusicaContext); // Contexto da música;
    const [musicaContext, setMusicaContext] = [_musicaContext?._musicaContext[0], _musicaContext?._musicaContext[1]];
    const [isPlayingContext, setIsPlayingContext] = [_musicaContext?._isPlaying[0], _musicaContext?._isPlaying[1]];
    const [filaMusicasContext, setFilaMusicasContext] = [_musicaContext?._filaMusicasContext[0], _musicaContext?._filaMusicasContext[1]];
    
    const elementoId = 'progressWrapperPlayer';
    const refMusica = useRef<HTMLMediaElement>(null);
    const [tempoSegundosMaximo, setTempoSegundosMaximo] = useState<number>(0);
    const [tempoSegundosAtual, setTempoSegundosAtual] = useState<number>(0);

    const [rectLeft, setRectLeft] = useState<number>(0);
    const [rectWidth, setRectWidth] = useState<number>(0);
    const [posicaoClick, setPosicaoClick] = useState<number>(0);
    const [sectionBarraPlayerDeltaX, setSectionBarraPlayerDeltaX] = useState<string>('');

    // =-=-=-=-=-=-=-=-==-=-=-=-=-=-=-= #1 =-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=
    // #1.1 - Definir valores ao rectLeft e rectWidth ao iniciar, resize e scroll x;
    const tamanhoTela = useWindowSize();
    useEffect(() => {
        // Ajustar o rect.left e rect.width (tamanho do elemento);
        var rect = document?.querySelector(`#${elementoId}`)?.getBoundingClientRect();
        setRectLeft(rect?.left ?? 0);
        setRectWidth(rect?.width ?? 0);

        // console.log('rect?.left: ', rect?.left);
        // console.log('rect?.width: ', rect?.width);
    }, [tamanhoTela?.width, tamanhoTela?.height, sectionBarraPlayerDeltaX]);

    // #1.2 - Definir posição do progress bar com base no tempo tocado;
    useEffect(() => {
        function handlePosicaoInicial() {
            const porcentagemTocado = (tempoSegundosAtual / tempoSegundosMaximo);
            const porcetagemTocadoWidth = rectWidth * porcentagemTocado;
            const porcetagemTocadoWidthOk = isNaN(porcetagemTocadoWidth) ? 0 : porcetagemTocadoWidth ?? 0;
            setPosicaoClick(porcetagemTocadoWidthOk);
        }

        // Definir o volume proporcional ao resize; 
        handlePosicaoInicial();
    }, [rectWidth, rectLeft, tempoSegundosMaximo, tempoSegundosAtual]);

    // =-=-=-=-=-=-=-=-==-=-=-=-=-=-=-= #2 =-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=
    // #2.1 - Função utilizada no click e no bindProgressBar: definir posição do progress bar;
    function conteudoHandleClickEHandleMouseMove(e: MouseEvent<HTMLElement> | any) {
        e.preventDefault();
        let posicaoClick = e.clientX - rectLeft;

        // Ajustar caso seja menor que 0 ou maior que o máximo;
        posicaoClick = posicaoClick < 0 ? 0 : posicaoClick;
        posicaoClick = posicaoClick > rectWidth ? rectWidth : posicaoClick;
        setPosicaoClick(posicaoClick);

        // Calcular a porcentagem tocada (para refletir no width do elemento) e também o tempo de segundos tocados;
        let porcentagemTocadoWidthElemento = ((posicaoClick / (rectWidth - 1)) * 100);
        porcentagemTocadoWidthElemento = porcentagemTocadoWidthElemento < 0 ? 0 : porcentagemTocadoWidthElemento; // Se for menor que 0, set 0;
        porcentagemTocadoWidthElemento = porcentagemTocadoWidthElemento > 100 ? 100 : porcentagemTocadoWidthElemento; // Se for maior que 100, set 100;
        // Aviso.warn(`<b>%WidthElemento</b>: ${porcentagemTocadoWidthElemento}`, 5000);
        const tempoSegundosAtual = Math.round((porcentagemTocadoWidthElemento / 100) * tempoSegundosMaximo);
        setTempoSegundosAtual(tempoSegundosAtual);

        // Definir a posição clicada no elemento HMTL;
        if (refMusica?.current) {
            refMusica.current.currentTime = tempoSegundosAtual;
        }

        // console.log('porcetagemTocadoWidthElemento:', porcetagemTocadoWidthElemento);
        // console.log('tempoSegundosAtual:', tempoSegundosAtual);
    }

    // #2.2 - Definir posição do progress bar no click;
    function handleClick(e: MouseEvent<HTMLElement>) {
        conteudoHandleClickEHandleMouseMove(e);
    }

    // #2.3 - Callback e bind para simular o long press para definir posição do progress bar ao "arrastar" o ícone do progress bar;
    const callback = useCallback(() => {
        // console.log('Long press ativado! - Infelizmente é necessário manter esse callback "inútil" para que o bind funcione');
    }, []);

    const [isMoving, setIsMoving] = useState<boolean>(false);
    const bindProgressBar = useLongPress((callback), {
        onStart: event => setIsMoving(true),
        onFinish: event => setIsMoving(false),
        onCancel: event => setIsMoving(false),
        onMove: event => (isMoving && conteudoHandleClickEHandleMouseMove(event)),
        filterEvents: event => true,
        threshold: 500,
        captureEvent: true,
        cancelOnMovement: false
    });

    // =-=-=-=-=-=-=-=-==-=-=-=-=-=-=-= #3 =-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=
    // #3.1 - Gambi/lógica para corrigir um bug super específico em relação ao mau comportamento da #sectionBarraPlayer;
    // Quando a tela é redimensionada de forma que se pode usar os scroll X do elemento, por algum motivo desconhecido, os valores se bugam (provalvemente o rect?.left);
    // Pra isso... ao usar o scroll x, é necessário recontar os valores!
    useEffect(() => {
        const element = document.querySelector('#sectionBarraPlayer');

        element?.addEventListener('scroll', (e: any) => {
            // if (e?.deltaY !== 0) {
            //     console.log('vertical();');
            // }

            if (e?.deltaX !== 0) {
                // console.log('horizontal();');
                setSectionBarraPlayerDeltaX(UUID());
            }
        })
    }, []);

    // =-=-=-=-=-=-=-=-==-=-=-=-=-=-=-= #4 =-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=
    // #4.1 - Importar (fetch) arquivo (música) e realizar conversões e setar em "setArquivoMusica";
    const [arquivoMusica, setArquivoMusica] = useState<string>('');
    useEffect(() => {
        async function getMusica(musicaId: number, nome: string) {
            try {
                nProgress.start();
                const url = `${CONSTS_UPLOAD_PROTEGIDO.API_URL_GET_UPLOAD_PROTEGIDO_STREAM_BUFFER}/nomePasta=music&nomeArquivo=${musicaId}.mp3`;
                const stream = await Fetch.getApiStream(url);
                // console.log(stream);

                if (!stream) {
                    nProgress.done();
                    Aviso.error('Houve um problema interno ao baixar conteúdo da música. Tente novamente mais tarde', 5000);
                    return false;
                }

                // Converter resultado para formato objectURL para setar no elemento <audio>;
                const objectURL = await converterStreamEmObjectURL(stream);
                setArquivoMusica(objectURL);

                // Setar o "isJaTocada" para true para controle interno (remover da fila);
                const listaMusicasUpdate = FilaMusicasStorage.updateIsJaTocada(musicaId, true);
                listaMusicasUpdate && setFilaMusicasContext(listaMusicasUpdate);
 
                process.env.NODE_ENV === 'development' && Aviso.success(`Música importada com sucesso: <b>${nome}</b>`, 3000);
                nProgress.done();
            } catch (error) {
                Aviso.error('Houve um problema interno no processo de tratamento da música. Tente novamente mais tarde', 5000);
                nProgress.done();
            }
        }

        if (musicaContext) {
            if (musicaContext?.musicaId > 0) {
                getMusica(musicaContext.musicaId, musicaContext.nome);
            }
        }
    }, [musicaContext, musicaContext?.musicaId, setFilaMusicasContext]);

    // #4.2 - Controlar "isPlayingContext" e "volume";
    const [UUICanPlay, setUUICanPlay] = useState<string>(''); // Hook (lógica/gambi) para corrigir bug super específico: ao selecionar uma música pela primeira vez não se tocava automáticamente... com o "UUICanPlay" agora sim toca;
    useEffect(() => {
        if (refMusica?.current && musicaContext?.musicaId) {
            // Volume;
            const volumeAjustado = volume / 100;
            refMusica.current.volume = volumeAjustado;

            // Play ou pause;
            if (isPlayingContext) {
                refMusica?.current?.play();
            } else {
                refMusica?.current?.pause();
            }
        }
    }, [isPlayingContext, volume, arquivoMusica, refMusica?.current?.duration, musicaContext?.musicaId, UUICanPlay]);

    // #4.3 - Controlar duração da música e o play ao importar nova música (musicaContext?.musicaId);
    useEffect(() => {
        if (refMusica?.current?.duration && musicaContext?.musicaId && arquivoMusica) {
            // Controlar duração da música e iniciar a música ao "importar" (mudança no "musicaContext?.musicaId"); 
            const duracaoMusicaSegundos = refMusica?.current?.duration;
            const duracaoMusicaSegundosOk = isNaN(duracaoMusicaSegundos) ? 0 : duracaoMusicaSegundos ?? 0;
            setTempoSegundosMaximo(duracaoMusicaSegundosOk);

            // Voltar o tempo ao 0 no mesmo instante;
            setTempoSegundosAtual(0);

            if (isPlayingContext) {
                // Forçar play;
                setTimeout(function () {
                    setIsPlayingContext(true);
                    refMusica?.current?.play();
                    nProgress.done();
                }, 500);
            }
        }
    }, [setIsPlayingContext, refMusica?.current?.duration, arquivoMusica, musicaContext?.musicaId, musicaContext]);

    // #4.4 - "Core do Player": controla o tempo tocado;
    useEffect(() => {
        const intervalo = setInterval(() => {
            if (refMusica?.current) {
                if (isPlayingContext && arquivoMusica && tempoSegundosMaximo > refMusica?.current?.currentTime) {
                    const tempoAtual = refMusica?.current?.currentTime;
                    setTempoSegundosAtual(tempoAtual ?? 0);
                } else {
                    if (arquivoMusica && refMusica?.current) {
                        if (isPlayingContext) {
                            if (isModoLoop) {
                                // console.log('Modo loop ativado');
                                refMusica.current.currentTime = 0;
                                setTempoSegundosAtual(0);
                                refMusica?.current?.play();
                            } else {
                                // console.log('Pular para a próxima música');
                                handleAvancar();
                            }
                        }
                    }
                }

                if (process.env.NODE_ENV === 'development') {
                    // console.log(`isPlayingContext: ${isPlayingContext} | isModoLoop: ${isModoLoop} | tempoSegundosAtual: ${formatarSegundos(tempoSegundosAtual, false)} | musicaContext?.nome: ${musicaContext?.nome}`);
                }
            }
        }, 500);

        return () => clearInterval(intervalo);
    }, [isPlayingContext, isModoLoop, arquivoMusica, tempoSegundosAtual, tempoSegundosMaximo, musicaContext?.nome, handleAvancar])

    return (
        <Fragment>
            {/* Esquerda, tempo atual */}
            <span className={Styles.tempoSpan}>{formatarSegundos(tempoSegundosAtual, false) ?? '0:00'}</span>

            {/* Meio, progress bar */}
            <div className={Styles.progressWrapper} id={elementoId} onClick={(e) => handleClick(e)} {...bindProgressBar()} style={{ minWidth: '120px' }}>
                <div className={Styles.progress} style={{ width: posicaoClick }}>
                    <div className={Styles.pointer}>
                        <div className={Styles.toast}></div>
                    </div>
                </div>
            </div>

            {/* Direita, tempo total da música em questão */}
            <span className={Styles.tempoSpan}>{formatarSegundos(tempoSegundosMaximo, false) ?? '0:00'}</span>

            {/* Áudio */}
            <audio ref={refMusica} src={arquivoMusica} autoPlay={false} controls={false} onCanPlay={() => setUUICanPlay(UUID())} />
        </Fragment>
    )
}