import useUsuarioContext from '@hooks/api/context/useUsuarioContext';
import useCheckServidorAzure from '@hooks/outros/useCheckServidorAzure';
import verificarTokenValido from '@utils/api/verificarTokenValido';
import { lazy, useEffect } from 'react';
import Styles from './styles/layoutPadrao.module.scss';
const Barra = lazy(() => import('@components/player/barra'));
const Sidebar = lazy(() => import('@components/navbar/sidebar/sidebar'));
const NavbarPadrao = lazy(() => import('@components/navbar/navbar-padrao/navbar-padrao'));

export default function LayoutPadrao({ Component, pageProps }: any) {

    const [isAuth, setIsAuth] = useUsuarioContext();
    useCheckServidorAzure();

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