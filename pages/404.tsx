import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import Botao from '../components/outros/botao';
import Styles from '../styles/404.module.scss';
import CONSTS_SISTEMA from '../utils/consts/outros/sistema';

export default function Erro() {

    const router = useRouter();
    const [msg, setMsg] = useState('');
    useEffect(() => {
        function verificarMsg(msgErro: string) {
            // console.log(msgErro);
            setMsg(msgErro);
        }

        if (router.query.erro) {
            verificarMsg(router.query.erro.toString());
        } else {
            setMsg('Tente novamente mais tarde');
        }
    }, [router]);

    return (
        <Fragment>
            <Head>
                <title>{CONSTS_SISTEMA.NOME_SISTEMA} — 404</title>
            </Head>

            <section className={`${Styles.wrapper} paddingPadrao`}>
                <div className={Styles.divErro}>
                    <span className={Styles.titulo}>Opa...</span>
                    <span className={`${Styles.texto} margem2`}>Parece que algo deu errado por aqui<br />{msg}</span>

                    <div className='margem2'>
                        <Botao texto='Voltar ao início' url='/' isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
                    </div>
                </div>
            </section>
        </Fragment>
    )
}