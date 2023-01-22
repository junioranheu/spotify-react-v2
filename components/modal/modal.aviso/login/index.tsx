import CONSTS_SISTEMA from '@utils/consts/outros/sistema';
import CONSTS_TELAS from '@utils/consts/outros/telas';
import { Dispatch, useEffect, useState } from 'react';
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

    const [comentarioRandom, setComentarioRandom] = useState<string>('');
    useEffect(() => {
        function gerarComentarioRandom() {
            const comentarios = ['Opa, pera aí...', 'Parece que algo deu errado', 'Parado aí!', 'Opa!', 'Eita!', 'Ops...', 'Calma lá!'];

            const random = Math.floor(Math.random() * comentarios.length);
            setComentarioRandom(comentarios[random]);
        }

        gerarComentarioRandom();
    }, []);

    return (
        <div className={Styles.main}>
            <span className={`${Styles.titulo} margem2`}>{(titulo ?? comentarioRandom)}</span>
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

            <span className='separadorHorizontal margem3'></span>

            <span className={Styles.termos}>
                Ao entrar, criar uma conta ou ouvir nossas músicas, você está de acordo com os <a href='https://github.com/junioranheu' rel='noreferrer' target='_blank'>termos de serviço e a política de privacidade</a> do {CONSTS_SISTEMA.NOME_SISTEMA}
            </span>
        </div>
    )
}