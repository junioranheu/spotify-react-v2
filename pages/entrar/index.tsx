import { useEffect } from 'react';
import CONSTS_SISTEMA from '../../utils/consts/outros/sistema';

export default function Index() {

    useEffect(() => {
        document.title = `${CONSTS_SISTEMA.NOME_SISTEMA} — Entrar`;
    }, []);

    return (
        <h1>Entrar</h1>
    )
}
