import Botao from '@components/outros/botao';
import useUsuarioContext from '@hooks/api/context/useUsuarioContext';
import CONSTS_TELAS from '@utils/consts/outros/telas';
import { FilaMusicasStorage, MusicaStorage } from '@utils/context/musicaContext';
import { Auth } from '@utils/context/usuarioContext';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Fragment, useState } from 'react';
import { debounce } from 'ts-debounce'; // debounce: https://www.npmjs.com/package/ts-debounce | Delay React onMouseOver event: https://stackoverflow.com/a/68349975
import BotaoSvgRedirecionar from '../../outros/botao.svg.redirecionar';
import SetinhaBaixo from '../../svg/setinhaBaixo';
import SpotifyLogo from '../../svg/spotifyLogo';
import Styles from './navbar-padrao.module.scss';

export default function NavbarPadrao() {

    const [isAuth, setIsAuth] = useUsuarioContext();
    const nomeUsuario = Auth?.get()?.nomeUsuarioSistema ?? '';

    const [isExibirSubmenu, setIsExibirSubmenu] = useState<boolean>(false);
    const debounceFecharSubMenu = debounce(() => setIsExibirSubmenu(false), 1000); // Delay React onMouseOver event: https://stackoverflow.com/a/68349975
    function handleSubMenu() {
        setIsExibirSubmenu(true);
        debounceFecharSubMenu.cancel();
    }

    function handleDeslogar() {
        NProgress.start();

        // Desatribuir autenticação ao contexto de usuário;
        setIsAuth(false);

        // Deslogar;
        Auth.delete();
        MusicaStorage.delete();
        FilaMusicasStorage.delete();
        NProgress.done();

        // Voltar à tela principal;
        Router.push('/').then(() => {
            // Forçar Control + F5;
            window.location.href = window.location.href;
        });
    }

    return (
        <nav className={Styles.navbar}>
            <div className={Styles.exibirLogoSeWidthPequeno}>
                <Link href={CONSTS_TELAS.INDEX}><SpotifyLogo width='100px' /></Link>
            </div>

            <div className={Styles.divGap}>
                <BotaoSvgRedirecionar isVoltar={true} />
            </div>

            <div className={Styles.divDireita}>
                {
                    isAuth ? (
                        <Fragment>
                            <div
                                className={Styles.divOpcoes}
                                onClick={() => handleSubMenu()}
                                onMouseLeave={() => debounceFecharSubMenu()}
                            >
                                {nomeUsuario}
                                <SetinhaBaixo width='12' cor='var(--branco)' />
                            </div>

                            {
                                isExibirSubmenu && (
                                    <div
                                        className={Styles.subMenu}
                                        onMouseEnter={() => handleSubMenu()}
                                        onMouseLeave={() => debounceFecharSubMenu()}
                                    >
                                        <span onClick={() => Router.push(CONSTS_TELAS.ATUALIZAR_DADOS)}>Atualizar perfil</span>
                                        <span onClick={() => Router.push(CONSTS_TELAS.SUBIR_MUSICA)}>Subir música</span>
                                        <span onClick={() => Router.push(CONSTS_TELAS.GERENCIAR_PLAYLISTS)}>Gerenciar playlists</span>

                                        <span className={Styles.separador}></span>
                                        <span onClick={() => handleDeslogar()}>Terminar sessão</span>
                                    </div>
                                )
                            }
                        </Fragment>
                    ) : (
                        <div className={Styles.divGap}>
                            <div className={`${Styles.botaoCustom2} ${Styles.esconderSeWidthPequeno}`}>
                                <Botao texto='Registrar-se' url={CONSTS_TELAS.CRIAR_CONTA} isNovaAba={false} handleFuncao={null} Svg={null} refBtn={null} isEnabled={true} />
                            </div>

                            <div className={Styles.botaoCustom}>
                                <Botao texto='Iniciar sessão' url={CONSTS_TELAS.ENTRAR} isNovaAba={false} handleFuncao={null} Svg={null} refBtn={null} isEnabled={true} />
                            </div>
                        </div>
                    )
                }
            </div>
        </nav>
    )
}