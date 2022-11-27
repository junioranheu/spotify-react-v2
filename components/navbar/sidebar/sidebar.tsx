import { loremIpsum } from 'lorem-ipsum';
import Link from 'next/link';
import { Resizable } from 're-resizable';
import Biblioteca from '../../svg/biblioteca';
import Casa from '../../svg/casa';
import Coracao from '../../svg/coracao';
import Github from '../../svg/github';
import Lupa from '../../svg/lupa';
import Mais from '../../svg/mais';
import SpotifyLogo from '../../svg/spotifyLogo';
import Styles from './sidebar.module.scss';

export default function Sidebar() {
    return (
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
                    <Link href={'/'}><SpotifyLogo width='130px' /></Link>
                </div>

                <div className={Styles.divIcones}>
                    <span>
                        <Link href={'/'}>
                            <Casa width='24px' /> <span>Início</span>
                        </Link>
                    </span>

                    <span>
                        <Lupa width='24px' /> <span className='pointer'>Procurar</span>
                    </span>

                    <span>
                        <Link href={'/fila'}>
                            <Biblioteca width='24px' /> <span>Sua fila</span>
                        </Link>
                    </span>

                    <span className='pointer' onClick={() => window.open('https://github.com/junioranheu', '_blank')}>
                        <Github width='24px' /> <span>GitHub</span>
                    </span>
                </div>

                <div className={Styles.divIcones}>
                    <span>
                        <span className={`${Styles.quadrado} ${Styles.quadradoBranco}`}>
                            <Mais width='12px' cor='var(--preto)' />
                        </span>

                        <span className='pointer'>Criar lista de reprodução</span>
                    </span>

                    <span>
                        <span className={`${Styles.quadrado} ${Styles.quadradoColorido}`}>
                            <Coracao width='12px' cor='var(--branco)' />
                        </span>

                        <span className='pointer'>Músicas curtidas</span>
                    </span>
                </div>

                <div className={Styles.divisao}></div>

                <div className={Styles.divPlaylists}>
                    <span><Link href={'/'}>{loremIpsum({ count: 1, sentenceUpperBound: 5 })}</Link></span>
                    <span><Link href={'/'}>{loremIpsum({ count: 1, sentenceUpperBound: 5 })}</Link></span>
                    <span><Link href={'/'}>{loremIpsum({ count: 1, sentenceUpperBound: 5 })}</Link></span>
                    <span><Link href={'/'}>{loremIpsum({ count: 1, sentenceUpperBound: 5 })}</Link></span>
                </div>
            </aside>
        </Resizable>
    )
}