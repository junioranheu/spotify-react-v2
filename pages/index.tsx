import Styles from '../styles/home.module.scss';
import CONSTS_SISTEMA from '../utils/consts/outros/sistema';

export default function Index() {

    document.title = `${CONSTS_SISTEMA.NOME_SISTEMA} — Início`;

    return (
        <h1 className={Styles.a}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h1>
    )
}
