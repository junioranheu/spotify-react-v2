import { Dispatch, FocusEventHandler, Fragment, KeyboardEventHandler, MutableRefObject, useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import InputMascara from './inputMascara';
import Styles from './styles/input.module.scss';

interface iParametros {
    titulo: string;
    placeholder: string | null;
    name: string | null;
    tipo: string | null;
    isDisabled: boolean;
    minCaracteres: number;
    dataTip: string | null;
    value: string | null;
    mascara: string | null;
    referencia: MutableRefObject<any> | null;

    isExibirIconeDireita: boolean;
    isExisteValidacaoExtra: boolean;
    handleValidacaoExtra: boolean | null;

    handleChange: Dispatch<any> | undefined;
    handleKeyPress: KeyboardEventHandler<HTMLInputElement> | undefined;
    handleBlur: FocusEventHandler<HTMLInputElement> | undefined;
}

export default function Input({ titulo, placeholder, name, tipo, isDisabled, minCaracteres, dataTip, value, mascara, referencia, isExibirIconeDireita, isExisteValidacaoExtra, handleValidacaoExtra, handleChange, handleKeyPress, handleBlur }: iParametros) {

    const [isExibirIconeErro, setIsExibirIconeErro] = useState<boolean>(true);
    const [controleInterno, setControleInterno] = useState<string | null>(value);
    useEffect(() => {
        function verificarExibirIconeErro() {
            if (!controleInterno) {
                setIsExibirIconeErro(true);
                return false;
            }

            // console.log(controleInterno, controleInterno?.length, minCaracteres);
            if (controleInterno?.length >= minCaracteres) {
                setIsExibirIconeErro(false);
            } else {
                setIsExibirIconeErro(true);
            }
        }

        // Caso existe uma validação extra a ser feita, essa é a hora;
        if (isExisteValidacaoExtra) {
            const isValidacaoExtraOk = handleValidacaoExtra;

            // Exibir o ícone de sucesso ou não, com base, também, na verificação extra;
            setIsExibirIconeErro(!isValidacaoExtraOk ?? true);
        } else {
            // Exibir o ícone de sucesso sem tomar como base a verificação extra;
            verificarExibirIconeErro();
        }
    }, [controleInterno, minCaracteres]);

    // Controle interno;
    function handleControleInterno(e: any) {
        // Setar valor atual do input para realizar o controle interno para exibir o ícone de sucesso ou não;
        setControleInterno(e.target.value);
    }

    return (
        <Fragment>
            <ReactTooltip multiline={true} />

            <div className={Styles.divInput}>
                <div className={Styles.flex}>
                    <span className={Styles.titulo}>{titulo}</span>

                    {
                        isExibirIconeDireita && (
                            isExibirIconeErro ? (
                                <span className={Styles.iconeErro} title='Parece que tem algo errado aqui 👎'>✕</span>
                            ) : (
                                <span className={`${Styles.iconeSucesso} animate__animated animate__headShake`} title='Tudo certo 👍'>✔</span>
                            )
                        )
                    }
                </div>

                <div data-tip={dataTip}>
                    <InputMascara
                        placeholder={placeholder}
                        name={name}
                        tipo={tipo}
                        isDisabled={isDisabled}
                        value={value}
                        mascara={mascara}
                        referencia={referencia}
                        handleChange={handleChange}
                        handleKeyPress={handleKeyPress}
                        handleControleInterno={handleControleInterno}
                        handleBlur={handleBlur}
                    />
                </div>
            </div>
        </Fragment>
    )
}