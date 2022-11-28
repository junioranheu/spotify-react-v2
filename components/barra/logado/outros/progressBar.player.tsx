import { Fragment, MouseEvent, useCallback, useEffect, useState } from 'react';
import { useLongPress } from 'use-long-press'; // https://www.npmjs.com/package/use-long-press
import useWindowSize from '../../../../hooks/outros/useWindowSize';
import Styles from '../outros/progressBar.module.scss';

// https://codesandbox.io/s/quirky-hopper-jfcx9?file=/src/progress.js:0-2097
export default function ProgressBarPlayer() {

    const elementoId = 'progressWrapperPlayer';
    const [propTempoSegundosMaximo, setPropTempoSegundosMaximo] = useState<number>(60);
    const [propTempoSegundosTocados, setPropTempoSegundosTocados] = useState<number>(10);

    const [rectLeft, setRectLeft] = useState<number>(0);
    const [rectWidth, setRectWidth] = useState<number>(0);
    const [posicaoClick, setPosicaoClick] = useState<number>(0);

    // =-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=
    // Verificar valores ao iniciar componente e resize da tela;
    const tamanhoTela = useWindowSize();
    useEffect(() => {
        // Ajustar o rect.left e rect.width (tamanho do elemento);
        var rect = document?.querySelector(`#${elementoId}`)?.getBoundingClientRect();
        setRectLeft(rect?.left ?? 0);
        setRectWidth(rect?.width ?? 0);
    }, [tamanhoTela?.width, tamanhoTela?.height, document]);

    useEffect(() => {
        function handlePosicaoInicial() {
            const porcentagemTocado = (propTempoSegundosTocados / propTempoSegundosMaximo);
            const porcetagemTocadoWidth = rectWidth * porcentagemTocado;
            setPosicaoClick(porcetagemTocadoWidth);
        }

        // Definir o volume proporcional ao resize; 
        handlePosicaoInicial();
    }, [rectWidth, rectLeft, propTempoSegundosMaximo, propTempoSegundosTocados]);

    // =-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=
    // Função utilizada no click e no bindProgressBar;
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

    function handleClick(e: MouseEvent<HTMLElement>) {
        conteudoHandleClickEHandleMouseMove(e);
    }

    // callback e bind para simular o long press;
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
            {/* <audio ref={refMusica} src={arquivoMusica} autoPlay={false} controls={false} /> */}
        </Fragment>
    )
}