import Link from 'next/link';
import { Dispatch } from 'react';
import CONSTS_SISTEMA from '../../../../utils/consts/outros/sistema';
import CONSTS_TELAS from '../../../../utils/consts/outros/telas';
import Botao from '../../../outros/botao';
import Styles from './index.module.scss';

interface iParametros {
    handleModal: Dispatch<boolean>;
    titulo: string | null;
    descricao: string;
    isExibirBotao: boolean;
    textoBotao: string | null;
    urlBotao: string | null;
    isNovaAba: boolean | null;
}

export default function ModalAvisoLogin({ handleModal, titulo, descricao, isExibirBotao, textoBotao, urlBotao, isNovaAba }: iParametros) {
    return (
        <div className={Styles.main}>
            <span className={Styles.titulo}>{(titulo ?? 'Opa, pera aí...')}</span>
            <span className={`${Styles.texto} margem0_5`}>{descricao}</span>
 
            {
                isExibirBotao && (
                    <div className={`${Styles.botaoCustom} margem1`}>
                        <Botao
                            texto={(textoBotao ?? 'Entrar agora mesmo')}
                            url={(urlBotao ?? CONSTS_TELAS.ENTRAR)}
                            isNovaAba={(isNovaAba ?? false)}
                            handleFuncao={() => handleModal(false)}
                            Svg={null}
                            refBtn={null}
                            isEnabled={true}
                        />
                    </div>
                )
            }

            <span className='separadorHorizontal'></span>
            <span className={Styles.termos}>
                Ao entrar ou criar uma conta, você está de acordo com os <Link href={CONSTS_TELAS.INDEX}>termos de serviço e a política de privacidade</Link> do {CONSTS_SISTEMA.NOME_SISTEMA}
            </span>
        </div>
    )
}