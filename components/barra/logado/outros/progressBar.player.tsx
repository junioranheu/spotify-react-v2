import { Fragment } from 'react';
import Styles from '../outros/progressBar.module.scss';

// https://codesandbox.io/s/quirky-hopper-jfcx9?file=/src/progress.js:0-2097
export default function ProgressBarPlayer() {

    const elementoId = 'progressWrapperPlayer';
    const tempoSegundosAtual = 22;
    const tempoSegundosMaximo = 60;

    return (
        <Fragment>
            {/* Esquerda, tempo atual */}
            <span className={Styles.tempoSpan}>{tempoSegundosAtual ?? '0:00'}</span>

            {/* Meio, progress bar */}
            <div className={Styles.progressWrapper} id={elementoId} onClick={(e) => null}>
                <div className={Styles.progress} style={{ width: tempoSegundosAtual }}>
                    <div className={Styles.pointer}>
                        <div className={Styles.toast}></div>
                    </div>
                </div>
            </div>

            {/* Direita, tempo total da música em questão */}
            <span className={Styles.tempoSpan}>{tempoSegundosMaximo ?? '0:00'}</span>

            {/* Áudio */}
            {/* <audio ref={refMusica} src={arquivoMusica} autoPlay={false} controls={false} /> */}
        </Fragment>
    )
}