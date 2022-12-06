import Styles from './styles/topHat.module.scss';

interface iParametros {
    titulo: string;
}

export default function TopHatSecundario({ titulo }: iParametros) {
    return (
        <div className={Styles.topHatSecundario}>
            <span>{titulo}</span>
        </div>
    )
}