import nProgress from 'nprogress';
import { Fragment, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useLongPress } from 'use-long-press'; // https://www.npmjs.com/package/use-long-press
import useWindowSize from '../../../../hooks/outros/useWindowSize';
import { Fetch } from '../../../../utils/api/fetch';
import CONSTS_UPLOAD_PROTEGIDO from '../../../../utils/consts/data/constUploadProtegido';
import { Aviso } from '../../../../utils/outros/aviso';
import UUID from '../../../../utils/outros/UUID';
import Styles from '../outros/progressBar.module.scss';

interface iParametros {
    isPlaying: boolean;
    volume: number;
}

// https://codesandbox.io/s/quirky-hopper-jfcx9?file=/src/progress.js:0-2097
export default function ProgressBarPlayer({ isPlaying, volume }: iParametros) {

    const elementoId = 'progressWrapperPlayer';
    const refMusica = useRef(null);
    const [propTempoSegundosMaximo, setPropTempoSegundosMaximo] = useState<number>(60);
    const [propTempoSegundosTocados, setPropTempoSegundosTocados] = useState<number>(10);

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
    }, [document, tamanhoTela?.width, tamanhoTela?.height, sectionBarraPlayerDeltaX]);

    // #1.2 - Definir posição do progress bar com base no tempo tocado;
    useEffect(() => {
        function handlePosicaoInicial() {
            const porcentagemTocado = (propTempoSegundosTocados / propTempoSegundosMaximo);
            const porcetagemTocadoWidth = rectWidth * porcentagemTocado;
            setPosicaoClick(porcetagemTocadoWidth);
        }

        // Definir o volume proporcional ao resize; 
        handlePosicaoInicial();
    }, [rectWidth, rectLeft, propTempoSegundosMaximo, propTempoSegundosTocados]);

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
        const tempoSegundosTocados = Math.round((porcentagemTocadoWidthElemento / 100) * propTempoSegundosMaximo);
        setPropTempoSegundosTocados(tempoSegundosTocados);

        // console.log('porcetagemTocadoWidthElemento:', porcetagemTocadoWidthElemento);
        // console.log('tempoSegundosTocados:', tempoSegundosTocados);
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
    }, [document]);

    // =-=-=-=-=-=-=-=-==-=-=-=-=-=-=-= #4 =-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=
    // #4.1 - Buscar arquivo (música) e realizar conversões e setar em "setArquivoMusica";
    const [arquivoMusica, setArquivoMusica] = useState<string>('');
    useEffect(() => {
        async function getMusica() {
            try {
                nProgress.start();
                const nomePasta = 'music';
                const nomeArquivo = '1.mp3';
                const url = `${CONSTS_UPLOAD_PROTEGIDO.API_URL_GET_UPLOAD_PROTEGIDO_STREAM}/nomePasta=${nomePasta}&nomeArquivo=${nomeArquivo}`;
                const stream = await Fetch.getApiStream(url);
                // console.log(stream);

                if (!stream) {
                    nProgress.done();
                    Aviso.error('Houve um problema interno ao baixar conteúdo da música. Tente novamente mais tarde', 5000);
                    return false;
                }

                // Converter para blob;
                const blob = await stream.blob();
                // console.log(blob);

                // Converter blob para mp3;
                const arquivoMp3 = new File([blob], nomeArquivo, { type: 'audio/mpeg' });
                // console.log(arquivoMp3);

                // Converter mp3 para url;
                const objectURL = URL.createObjectURL(arquivoMp3);
                // console.log(objectURL);

                setArquivoMusica(objectURL);
                nProgress.done();
            } catch (error) {
                Aviso.error('Houve um problema interno no processo de tratamento da música. Tente novamente mais tarde', 5000);
                nProgress.done();
            }
        }

        getMusica();
    }, []);

    // #4.2 - Controlar "isPlaying" e "volume";
    useEffect(() => {
        if (refMusica.current) {
            const volumeAjustado = volume / 100;

            // @ts-ignore
            refMusica.current.volume = volumeAjustado;

            if (isPlaying) {
                // @ts-ignore
                refMusica.current.play();
            } else {
                // @ts-ignore
                refMusica.current.pause();
            }
        }
    }, [isPlaying, volume, refMusica.current]);

    return (
        <Fragment>
            {/* Esquerda, tempo atual */}
            <span className={Styles.tempoSpan}>{propTempoSegundosTocados ?? '0:00'}</span>

            {/* Meio, progress bar */}
            <div className={Styles.progressWrapper} id={elementoId} onClick={(e) => handleClick(e)} {...bindProgressBar()} style={{ minWidth: '120px' }}>
                <div className={Styles.progress} style={{ width: posicaoClick }}>
                    <div className={Styles.pointer}>
                        <div className={Styles.toast}></div>
                    </div>
                </div>
            </div>

            {/* Direita, tempo total da música em questão */}
            <span className={Styles.tempoSpan}>{propTempoSegundosMaximo ?? '0:00'}</span>

            {/* Áudio */}
            <audio ref={refMusica} src={arquivoMusica} autoPlay={false} controls={false} />
        </Fragment>
    )
}