import Router from 'next/router';
import CONSTS_TELAS from '../../utils/consts/outros/telas';
import Styles from './subMenu.module.scss';

interface iParametros {
    posicaoClick: number;
    musicaId: number;
    debounceFecharSubMenu: { (this: unknown, ...args: [] & any[]): Promise<void>; cancel: (reason?: any) => void; }; // debounce;
    handleSubMenu: (musicaId: number) => void;
}

export default function SubMenu({ posicaoClick, musicaId, debounceFecharSubMenu, handleSubMenu }: iParametros) {
    return (
        <div
            style={{ top: posicaoClick }}
            className={Styles.subMenu}
            onMouseEnter={() => handleSubMenu(musicaId)}
            onMouseLeave={() => debounceFecharSubMenu()}
        >
            <span onClick={() => Router.push(CONSTS_TELAS.ATUALIZAR_DADOS)}>Adicionar à uma playlist</span>

            <span className={Styles.separador}></span>
            <span>Reportar música</span>
        </div>
    )
}