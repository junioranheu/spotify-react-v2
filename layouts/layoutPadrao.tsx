import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import NavbarPadrao from '../components/navbar/navbar-padrao/navbar-padrao';
import Sidebar from '../components/navbar/sidebar/sidebar';
import Barra from '../components/player/barra';
import verificarTokenValido from '../utils/api/verificarTokenValido';
import { UsuarioContext } from '../utils/context/usuarioContext';
import Styles from './styles/layoutPadrao.module.scss';

export default function LayoutPadrao({ Component, pageProps }: any) {

    const { asPath } = useRouter();

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    // Verificar se o token ainda é válido;
    useEffect(() => {
        verificarTokenValido(isAuth);
    }, [isAuth]);

    // Renovar animação a cada mudança de URL (router.asPath);
    const [efeitoAnimar, setEfeitoAnimar] = useState('');
    useEffect(() => {
        setEfeitoAnimar('animate__animated animate__fadeIn animate__delay03');

        setTimeout(function () {
            setEfeitoAnimar('');
        }, 1000);
    }, [asPath]);

    return (
        <section className='main semHighlight'>
            <section className={Styles.wrapper}>
                <section className={Styles.esconderSidebarSeMobile}>
                    <Sidebar />
                </section>

                <section className={`${efeitoAnimar} ${Styles.div100}`}>
                    <NavbarPadrao />
                    <Component {...pageProps} />
                </section>

                <Barra isAuth={isAuth} />
            </section>
        </section>
    )
}