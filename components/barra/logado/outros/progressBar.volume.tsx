import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { useLongPress } from 'use-long-press'; // https://www.npmjs.com/package/use-long-press
import useWindowSize from '../../../../hooks/outros/useWindowSize';
import Styles from './progressBar.module.scss';

interface iParametros {
    handleVolume: (vol: number) => void;
    volume: number;
}

// https://codesandbox.io/s/quirky-hopper-jfcx9?file=/src/progress.js:0-2097
export default function ProgressBarVolume({ handleVolume, volume }: iParametros) {

    const elementoId = 'progressWrapperVolume';
    const [rectLeft, setRectLeft] = useState<number>(0);
    const [rectWidth, setRectWidth] = useState<number>(0);
    const [volumeControleInterno, setVolumeControleInterno] = useState<number>(0);

    // =-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=
    // Verificar valores ao iniciar componente e resize da tela;
    const tamanhoTela = useWindowSize();
    useEffect(() => {
        function handleVolumeControleInterno() {
            // Definir o volume proporcional com base em volume (parâmetro) e o width do elemento;
            // Exemplo #1: 50 de volume e 100 de with >>> (50 * 100) / 100;
            // Exemplo #2: 50 de volume e 120 de with >>> (50 * 120) / 100;
            const volumeInicial = (volume * rectWidth) / 100;
            setVolumeControleInterno(volumeInicial);
        }

        // Ajustar o rect.left e rect.width (tamanho do elemento) ao iniciar e resize;
        var rect = document?.querySelector(`#${elementoId}`)?.getBoundingClientRect();
        setRectLeft(rect?.left ?? 0);
        setRectWidth(rect?.width ?? 0);

        // Definir o volume proporcional ao iniciar; 
        handleVolumeControleInterno();
    }, [tamanhoTela?.width, volume, rectWidth]);

    // =-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=
    // Função utilizada no click e no bindProgressBar;
    function conteudoHandleClickEHandleMouseMove(e: MouseEvent<HTMLElement> | any) {
        e.preventDefault();
        let posicaoClick = e.clientX - rectLeft;

        // Ajustar caso seja menor que 0;
        posicaoClick = posicaoClick < 0 ? 0 : posicaoClick;

        // Calcular o volume real, já que o volume pode passar de 100;
        let volumeRealCalculo = ((posicaoClick / (rectWidth - 1)) * 100);
        handleVolume(volumeRealCalculo);

        // Corrigir bug do "100";
        if (volumeRealCalculo >= 99) {
            posicaoClick = rectWidth;
            setVolumeControleInterno(100);
        }

        // Volume "bruto", para exibir no elemento;
        setVolumeControleInterno(posicaoClick);
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
        <div className={Styles.progressWrapper} id={elementoId} onClick={(e) => handleClick(e)} {...bindProgressBar()}>
            <div className={Styles.progress} style={{ width: volumeControleInterno }}>
                <div className={Styles.pointer}>
                    <div className={Styles.toast}></div>
                </div>
            </div>
        </div>
    )
}