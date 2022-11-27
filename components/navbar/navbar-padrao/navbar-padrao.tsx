import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { Fragment, useContext, useEffect, useState } from 'react';
import CONSTS_TELAS from '../../../utils/consts/outros/telas';
import { Auth, UsuarioContext } from '../../../utils/context/usuarioContext';
import Botao from '../../outros/botao';
import SetinhaBaixo from '../../svg/setinhaBaixo';
import SpotifyLogo from '../../svg/spotifyLogo';
import Styles from './navbar-padrao.module.scss';

export default function NavbarPadrao() {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    const nomeUsuario = Auth?.get()?.nomeUsuarioSistema ?? '';

    const [isExibirSubmenu, setIsExibirSubmenu] = useState<boolean>(false);
    function handleMostrarSubmenu() {
        setIsExibirSubmenu(!isExibirSubmenu);
    }

    const asPath = useRouter();
    useEffect(() => {
        // Cada reload, setar como false, para fechar submenu;
        setIsExibirSubmenu(false);
    }, [asPath]);

    function handleDeslogar() {
        NProgress.start();

        // Desatribuir autenticação ao contexto de usuário;
        setIsAuth(false);

        // Deslogar;
        Auth.delete();
        NProgress.done();

        // Voltar à tela principal;
        Router.push('/');
    }

    return (
        <nav className={Styles.navbar}>
            <div className={Styles.exibirLogoSeWidthPequeno}>
                <Link href={CONSTS_TELAS.INDEX}><SpotifyLogo width='100px' /></Link>
            </div>

            <div className={Styles.divDireita}>
                {
                    isAuth ? (
                        <Fragment>
                            <div className={Styles.divOpcoes} onClick={() => handleMostrarSubmenu()}>
                                {nomeUsuario}
                                <SetinhaBaixo width='12' cor='var(--branco)' />
                            </div>

                            {
                                isExibirSubmenu && (
                                    <div className={Styles.subMenu}>
                                        <span>Conta</span>
                                        <span>Perfil</span>
                                        <span onClick={() => handleDeslogar()}>Terminar sessão</span>
                                    </div>
                                )
                            }
                        </Fragment>
                    ) : (
                        <div className={Styles.botaoCustom}>
                            <Botao texto='Entrar' url={CONSTS_TELAS.ENTRAR} isNovaAba={false} handleFuncao={null} Svg={null} refBtn={null} isEnabled={true} />
                        </div>
                    )
                }
            </div>
        </nav>
    )
}