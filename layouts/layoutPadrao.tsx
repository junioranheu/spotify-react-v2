import { useContext, useEffect } from 'react';
import Barra from '../components/barra/barra';
import NavbarPadrao from '../components/navbar/navbar-padrao/navbar-padrao';
import Sidebar from '../components/navbar/sidebar/sidebar';
import verificarTokenValido from '../utils/api/verificarTokenValido';
import { UsuarioContext } from '../utils/context/usuarioContext';
import Styles from './styles/layoutPadrao.module.scss';

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