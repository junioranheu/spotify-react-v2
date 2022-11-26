import { Fragment } from 'react';
import BarraDeslogado from './barra.deslogado';
import BarraPlayer from './barra.player';

interface iParametros {
    isAuth: boolean | undefined;
}

export default function Barra({ isAuth }: iParametros) {
    return (
        <Fragment>
            {
                isAuth ? (
                    <BarraPlayer />
                ) : (
                    <BarraDeslogado />
                )
            }
        </Fragment>
    )
}