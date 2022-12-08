import Lottie from 'lottie-react';
import Head from 'next/head';
import { Fragment } from 'react';
import Lottie404 from '../../../assets/lotties/404.json';
import Botao from '../../../components/outros/botao';
import Styles from '../../../styles/404.module.scss';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import CONSTS_TELAS from '../../../utils/consts/outros/telas';

export default function ErroSessaoExpirada() {
    return (
        <Fragment>
            <Head>
                <title>{CONSTS_SISTEMA.NOME_SISTEMA} — Sessão expirada</title>
            </Head>

            <section className={`${Styles.wrapper} paddingPadrao`}>
                <div>
                    <div className={Styles.divLottie}>
                        <Lottie animationData={Lottie404} loop={true} />
                    </div>
                </div>

                <div>
                    <span className={Styles.titulo}>Sua sessão expirou</span>
                    <span className={`${Styles.texto} margem2`}>Entre novamente clicando no botão abaixo 🖖</span>

                    <div className='margem2'>
                        <Botao texto='Entrar novamente' url={CONSTS_TELAS.ENTRAR} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
                    </div>
                </div>
            </section>
        </Fragment>
    )
}