import { useRouter } from 'next/router';
import Styles from './styles/botao.svg.redirecionar.module.scss';

interface iParametros {
    width?: string | null;
    isVoltar: boolean;
}

export default function BotaoSvgRedirecionar({ width, isVoltar }: iParametros) {

    const svgVoltar = 'M15.957 2.793a1 1 0 010 1.414L8.164 12l7.793 7.793a1 1 0 11-1.414 1.414L5.336 12l9.207-9.207a1 1 0 011.414 0z';
    const svgIr = 'M8.043 2.793a1 1 0 000 1.414L15.836 12l-7.793 7.793a1 1 0 101.414 1.414L18.664 12 9.457 2.793a1 1 0 00-1.414 0z'

    const router = useRouter();

    function handleRota() {
        if (router && router.asPath !== '/') {
            router.back();
        }
    }

    return (
        <div className={Styles.divBtn} onClick={() => handleRota()}>
            <svg role='img' width={width ?? '1rem'} aria-hidden='true' viewBox='0 0 24 24'>
                <path d={(isVoltar ? svgVoltar : svgIr)}></path>
            </svg>
        </div>
    )
}