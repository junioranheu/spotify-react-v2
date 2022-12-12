import { Dispatch } from 'react';
import Styles from './subMenu.module.scss';

interface iParametros {
    posicaoClick: number;
    musicaId: number;
    debounceFecharSubMenu: { (this: unknown, ...args: [] & any[]): Promise<void>; cancel: (reason?: any) => void; }; // debounce;
    handleSubMenu: (musicaId: number) => void;
    setIsModalAdicionarMusicaNaPlaylistOpen: Dispatch<boolean>;
}

export default function SubMenu({ posicaoClick, musicaId, debounceFecharSubMenu, handleSubMenu, setIsModalAdicionarMusicaNaPlaylistOpen }: iParametros) {
    return (
        <div
            style={{ top: posicaoClick }}
            className={Styles.subMenu}
            onMouseEnter={() => handleSubMenu(musicaId)}
            onMouseLeave={() => debounceFecharSubMenu()}
        >
            <span onClick={() => setIsModalAdicionarMusicaNaPlaylistOpen(true)}>Adicionar à uma playlist</span>

            <span className={Styles.separador}></span>
            <span>Reportar música</span>
        </div>
    )
}