import { lazy, useContext, useEffect } from 'react';
import verificarTokenValido from '../utils/api/verificarTokenValido';
import { UsuarioContext } from '../utils/context/usuarioContext';
import Styles from './styles/layoutPadrao.module.scss';
const Barra = lazy(() => import('../components/player/barra'));
const Sidebar = lazy(() => import('../components/navbar/sidebar/sidebar'));
const NavbarPadrao = lazy(() => import('../components/navbar/navbar-padrao/navbar-padrao'));

export default function LayoutPadrao({ Component, pageProps }: any) {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    // Verificar se o token ainda é válido;
    useEffect(() => {
        verificarTokenValido(isAuth);
    }, [isAuth]);

    return (
        <section className='main semHighlight'>
            <section className={Styles.wrapper}>
                <section className={Styles.esconderSidebarSeMobile}>
                    <Sidebar />
                </section>

                <section className={Styles.div100}>
                    <NavbarPadrao />
                    <Component {...pageProps} />
                </section>

                <Barra isAuth={isAuth} />
            </section>
        </section>
    )
}