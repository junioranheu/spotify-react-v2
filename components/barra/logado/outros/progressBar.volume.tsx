import { useEffect, useRef, useState } from 'react';
import Styles from './progressBar.module.scss';

interface iParametros {
    handleVolume: (vol: number) => void;
    volume: number;
}

// https://codesandbox.io/s/quirky-hopper-jfcx9?file=/src/progress.js:0-2097
export default function ProgressBarVolume({ handleVolume, volume }: iParametros) {

    const [volumeControleInterno, setVolumeControleInterno] = useState(0);
    const [widthElemento, setWidthElemento] = useState(0);
    const refPointer = useRef(null);

    useEffect(() => {
        // Pegar uma vez o tamanho do elemento;
        var rect = document?.querySelector('#progressWrapperVolume')?.getBoundingClientRect();
        const widthElemento = rect?.width ?? 0;
        setWidthElemento(widthElemento);

        // Definir o volume ao carregar, com base em props.volume;
        const volumeInicial = (volume * widthElemento) / 100;
        setVolumeControleInterno(volumeInicial);
    }, [document, volume]);

    function handleClick(e: any) {
        e.preventDefault();
        var rect = document?.querySelector('#progressWrapperVolume')?.getBoundingClientRect();

        if (!rect) {
            return false;
        }

        let posicaoClick = e.clientX - rect?.left;

        // Ajustar caso seja menor que 0;
        posicaoClick = posicaoClick < 0 ? 0 : posicaoClick;

        // Calcular o volume real, já que o volume pode passar de 100;
        let volumeRealCalculo = ((posicaoClick / (widthElemento - 1)) * 100);
        handleVolume(volumeRealCalculo);

        // Corrigir bug do "100";
        if (volumeRealCalculo >= 99) {
            // console.log('100!!!' + widthElemento);
            posicaoClick = widthElemento;
            setVolumeControleInterno(100);
        }

        // Volume "bruto", para exibir no elemento;
        setVolumeControleInterno(posicaoClick);
    }

    return (
        <div className={Styles.progressWrapper} id='progressWrapperVolume' onClick={(e) => handleClick(e)}>
            <div className={Styles.progress} style={{ width: volumeControleInterno }}>
                <div className={Styles.pointer} ref={refPointer}>
                    <div className={Styles.toast}></div>
                </div>
            </div>
        </div>
    )
}