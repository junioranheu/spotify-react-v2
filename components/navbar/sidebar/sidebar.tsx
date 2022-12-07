import { loremIpsum } from 'lorem-ipsum';
import Link from 'next/link';
import Router from 'next/router';
import { Resizable } from 're-resizable';
import { Fragment, useContext, useState } from 'react';
import CONSTS_MODAL from '../../../utils/consts/outros/modal.tamanho';
import CONSTS_TELAS from '../../../utils/consts/outros/telas';
import { UsuarioContext } from '../../../utils/context/usuarioContext';
import ModalAvisoLogin from '../../modal/modal.aviso/login';
import ModalLayout from '../../modal/_modal.layout';
import ModalWrapper from '../../modal/_modal.wrapper';
import Biblioteca from '../../svg/biblioteca';
import Casa from '../../svg/casa';
import Coracao from '../../svg/coracao';
import Github from '../../svg/github';
import Lupa from '../../svg/lupa';
import Mais from '../../svg/mais';
import Musica from '../../svg/musica';
import SpotifyLogo from '../../svg/spotifyLogo';
import Styles from './sidebar.module.scss';

export default function Sidebar() {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    const [msg1, setMsg1] = useState<string>(loremIpsum({ count: 1, sentenceUpperBound: 5 }));
    const [msg2, setMsg2] = useState<string>(loremIpsum({ count: 1, sentenceUpperBound: 5 }));
    const [msg3, setMsg3] = useState<string>(loremIpsum({ count: 1, sentenceUpperBound: 5 }));
    const [msg4, setMsg4] = useState<string>(loremIpsum({ count: 1, sentenceUpperBound: 5 }));

    const [modalAvisoLoginDescricao, setModalAvisoLoginDescricao] = useState('');
    const [isModalAvisoLoginOpen, setIsModalAvisoLoginOpen] = useState(false);

    return (
        <Fragment>
            {/* Modal de aviso de login */}
            <ModalWrapper isOpen={isModalAvisoLoginOpen}>
                <ModalLayout handleModal={() => setIsModalAvisoLoginOpen(!isModalAvisoLoginOpen)} isExibirApenasLogo={true} titulo={null} tamanho={CONSTS_MODAL.PEQUENO} isCentralizado={true} isFecharModalClicandoNoFundo={false}>
                    <ModalAvisoLogin
                        handleModal={() => setIsModalAvisoLoginOpen(!isModalAvisoLoginOpen)}
                        titulo={null}
                        descricao={modalAvisoLoginDescricao}
                        isExibirBotao={true}
                        textoBotao='Entrar agora mesmo'
                        urlBotao={CONSTS_TELAS.ENTRAR}
                        isNovaAba={true}
                    />
                </ModalLayout>
            </ModalWrapper>

            {/* Conteúdo */}
            <Resizable
                defaultSize={{
                    width: 300,
                    height: 0
                }}

                minHeight={'100vh'}
                minWidth={185}
                maxWidth={400}
            >
                <aside className={Styles.sidebar}>
                    <div>
                        <Link href={CONSTS_TELAS.INDEX}><SpotifyLogo width='130px' /></Link>
                    </div>

                    <div className={Styles.divIcones}>
                        <span>
                            <Link href={CONSTS_TELAS.INDEX}>
                                <Casa width='24px' /> <span>Início</span>
                            </Link>
                        </span>

                        <span>
                            <Lupa width='24px' /> <span className='pointer'>Procurar</span>
                        </span>

                        <span>
                            <Link href={CONSTS_TELAS.FILA}>
                                <Biblioteca width='24px' /> <span>Sua fila</span>
                            </Link>
                        </span>

                        <span className='pointer' onClick={() => window.open('https://github.com/junioranheu', '_blank')}>
                            <Github width='24px' /> <span>GitHub</span>
                        </span>
                    </div>

                    <div className={Styles.divIcones}>
                        <span onClick={() => isAuth ? Router.push(CONSTS_TELAS.SUBIR_MUSICA) : [setModalAvisoLoginDescricao('Inicie sua sessão para subir uma nova música'), setIsModalAvisoLoginOpen(true)]}>
                            <span className={`${Styles.quadrado} ${Styles.quadradoBranco}`}>
                                <Musica width='0.8rem' />
                            </span>

                            <span className='pointer'>Subir nova música</span>
                        </span>

                        <span onClick={() => isAuth ? Router.push(CONSTS_TELAS.GERENCIAR_PLAYLISTS) : [setModalAvisoLoginDescricao('Inicie sua sessão para criar uma nova playlist'), setIsModalAvisoLoginOpen(true)]}>
                            <span className={`${Styles.quadrado} ${Styles.quadradoBranco}`}>
                                <Mais width='0.75rem' cor='var(--preto)' />
                            </span>

                            <span className='pointer'>Gerenciar playlists</span>
                        </span>

                        <span>
                            <span className={`${Styles.quadrado} ${Styles.quadradoColorido}`}>
                                <Coracao width='0.75rem' cor='var(--branco)' />
                            </span>

                            <span className='pointer'>Músicas curtidas</span>
                        </span>
                    </div>

                    <div className={Styles.divisao}></div>

                    <div className={Styles.divPlaylists}>
                        <span><Link href={CONSTS_TELAS.INDEX}>{msg1}</Link></span>
                        <span><Link href={CONSTS_TELAS.INDEX}>{msg2}</Link></span>
                        <span><Link href={CONSTS_TELAS.INDEX}>{msg3}</Link></span>
                        <span><Link href={CONSTS_TELAS.INDEX}>{msg4}</Link></span>
                    </div>
                </aside>
            </Resizable>
        </Fragment>
    )
}