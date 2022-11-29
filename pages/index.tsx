import { useContext, useEffect } from 'react';
import Botao from '../components/outros/botao';
import Styles from '../styles/home.module.scss';
import { Fetch } from '../utils/api/fetch';
import CONSTANTS_PLAYLISTS from '../utils/consts/data/constPlaylists';
import CONSTS_SISTEMA from '../utils/consts/outros/sistema';
import { UsuarioContext } from '../utils/context/usuarioContext';
import emojiAleatorio from '../utils/outros/gerarEmojiAleatorio';
import gerarOla from '../utils/outros/gerarOla';
import iPlaylist from '../utils/types/iPlaylist';

interface iParametros {
    listaPlaylists: iPlaylist[];
}

export default function Index({ listaPlaylists }: iParametros) {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    useEffect(() => {
        document.title = `${CONSTS_SISTEMA.NOME_SISTEMA} — Início`;
    }, []);

    return (
        <section className={Styles.container} style={{ color: 'white' }}>
            <span className={Styles.bomDia}>{gerarOla()}</span>

            <div className={Styles.div}>
                <span className={Styles.titulo}>Playlists disponíveis no momento {emojiAleatorio()}</span>

                {/* <div className={StylesPlaylist.divPlaylists}>
                    {
                        listaPlaylists.filter(x => x.isAtivo === true).map((p) => (
                            <Playlists playlist={p} key={p.playlistId} />
                        ))
                    }
                </div> */}
            </div>

            <div className={Styles.div}>
                <span className={Styles.titulo}>Outras playlists</span>
                <span className={Styles.textoNormal}>Novas playlists serão criadas e, mais para frente, será permitido criar suas proprias!</span>

                {
                    isAuth && (
                        <span className={Styles.textoNormal}>Para “renovar” sua playlist por completo, clique no botão abaixo.</span>
                    )
                }
            </div>

            {
                isAuth && (
                    <div className={Styles.botaoCustom} onClick={() => null}>
                        <Botao texto='Importar todas as músicas' url={null} isNovaAba={false} handleFuncao={null} Svg={null} refBtn={null} isEnabled={true} />
                    </div>
                )
            }
        </section>
    )
}

export async function getStaticProps() {
    const url = CONSTANTS_PLAYLISTS.API_URL_GET_TODOS;
    const listaPlaylists = await Fetch.getApi(url) as iPlaylist[];
    // console.log(listaPlaylists);

    return {
        props: {
            listaPlaylists
        },
    }
}