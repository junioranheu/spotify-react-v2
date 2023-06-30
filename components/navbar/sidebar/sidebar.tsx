import useUsuarioContext from '@hooks/api/context/useUsuarioContext';
import CONSTS_MODAL from '@utils/consts/outros/modal.tamanho';
import CONSTS_TELAS from '@utils/consts/outros/telas';
import avisoFuncaoNaoDesenvolvida from '@utils/outros/avisoFuncaoNaoDesenvolvida';
import emojiAleatorio from '@utils/outros/gerarEmojiAleatorio';
import { loremIpsum } from 'lorem-ipsum';
import Link from 'next/link';
import Router from 'next/router';
import { Resizable } from 're-resizable';
import { Fragment, useState } from 'react';
import ModalLayout from '../../modal/_modal.layout';
import ModalWrapper from '../../modal/_modal.wrapper';
import ModalAvisoLogin from '../../modal/modal.aviso/login';
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

    const [isAuth, setIsAuth] = useUsuarioContext();

    const [loremIpsum1] = useState<string>(loremIpsum({ count: 1, sentenceUpperBound: 5 }));
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

                        <span onClick={() => avisoFuncaoNaoDesenvolvida()}>
                            <Lupa width='24px' /> <span className='pointer'>Procurar</span>
                        </span>

                        <span onClick={() => isAuth ? Router.push(CONSTS_TELAS.FILA) : [setModalAvisoLoginDescricao('Inicie sua sessão para visualizar sua fila'), setIsModalAvisoLoginOpen(true)]}>
                            <Biblioteca width='24px' /> <span className='pointer'>Sua fila</span>
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

                        <span onClick={() => avisoFuncaoNaoDesenvolvida()}>
                            <span className={`${Styles.quadrado} ${Styles.quadradoColorido}`}>
                                <Coracao width='0.75rem' cor='var(--branco)' />
                            </span>

                            <span className='pointer'>Músicas curtidas</span>
                        </span>
                    </div>

                    <div className={Styles.divisao}></div>

                    <div className={Styles.divPlaylists}>
                        <span>Playlist do carro 🚗</span>
                        <span>Academia 🗿🍷</span>
                        <span>Daily mix 😊</span>
                        <span>{loremIpsum1.substring(0, 15)} {emojiAleatorio()}</span>
                    </div>
                </aside>
            </Resizable>
        </Fragment>
    )
}