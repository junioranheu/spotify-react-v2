import { ReactNode } from 'react';
import Styles from './styles/topHat.module.scss';

interface iParametros {
    Svg: ReactNode | null;
    titulo: string;
    backgroundColor: string;
    fontColor: string;
}

export default function TopHat({ Svg, titulo, backgroundColor, fontColor }: iParametros) {
    return (
        <div className={Styles.topHat} style={{ backgroundColor: (backgroundColor ?? 'var(--branco)'), color: (fontColor ?? 'var(--preto)') }}>
            {Svg ? Svg : ''}
            <span>{titulo}</span>
        </div>
    )
}