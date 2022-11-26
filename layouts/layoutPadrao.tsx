import { useContext, useEffect } from 'react';
// import Footer from '../components/footer/footer';
// import NavbarPadrao from '../components/navbar/padrao/navbar.padrao';
import verificarTokenValido from '../utils/api/verificarTokenValido';
import { UsuarioContext } from '../utils/context/usuarioContext';

export default function LayoutPadrao({ Component, pageProps }: any) {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    // Verificar se o token ainda é válido;
    useEffect(() => {
        verificarTokenValido(isAuth);
    }, [isAuth]);

    return (
        <section className='main semHighlight'>
            {/* <NavbarPadrao /> */}

            <section className='sessaoPrincipal'>
                <Component {...pageProps} />
            </section>

            {/* <Footer /> */}
        </section>
    )
}