import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { Fragment, useContext, useEffect, useState } from 'react';
import CONSTS_TELAS from '../../../utils/consts/outros/telas';
import { FilaMusicasStorage, MusicaContext, MusicaStorage } from '../../../utils/context/musicaContext';
import { Auth, UsuarioContext } from '../../../utils/context/usuarioContext';
import Botao from '../../outros/botao';
import BotaoSvgRedirecionar from '../../outros/botao.svg.redirecionar';
import SetinhaBaixo from '../../svg/setinhaBaixo';
import SpotifyLogo from '../../svg/spotifyLogo';
import Styles from './navbar-padrao.module.scss';

export default function NavbarPadrao() {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];
    const nomeUsuario = Auth?.get()?.nomeUsuarioSistema ?? '';

    const _musicaContext = useContext(MusicaContext); // Contexto da música;
    const [musicaContext, setMusicaContext] = [_musicaContext?._musicaContext[0], _musicaContext?._musicaContext[1]];
    const [filaMusicasContext, setFilaMusicasContext] = [_musicaContext?._filaMusicasContext[0], _musicaContext?._filaMusicasContext[1]];

    const [isExibirSubmenu, setIsExibirSubmenu] = useState<boolean>(false);

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
                <BotaoSvgRedirecionar width='1.2rem' isVoltar={true} />
            </div>

            <div className={Styles.divDireita}>
                {
                    isAuth ? (
                        <Fragment>
                            <div className={Styles.divOpcoes} onClick={() => setIsExibirSubmenu(!isExibirSubmenu)}>
                                {nomeUsuario}
                                <SetinhaBaixo width='12' cor='var(--branco)' />
                            </div>

                            {
                                isExibirSubmenu && (
                                    <div className={Styles.subMenu}>
                                        <span onClick={() => Router.push(CONSTS_TELAS.ATUALIZAR_DADOS)}>Atualizar perfil</span>
                                        <span onClick={() => Router.push(CONSTS_TELAS.SUBIR_MUSICA)}>Subir música</span>
                                        <span onClick={() => Router.push(CONSTS_TELAS.GERENCIAR_PLAYLISTS)}>Gerenciar playlists</span>
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