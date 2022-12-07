import { ChangeEvent, Dispatch, Fragment, useRef, useState } from 'react';
import Botao from '../../../../components/outros/botao';
import Input from '../../../../components/outros/input';
import Styles from '../../../../styles/form.module.scss';
import converterArquivoParaBase64 from '../../../../utils/outros/converterArquivoParaBase64';
import validarUrlYoutube from '../../../../utils/outros/validacoes/validar.url.youtube';
import iFormDataMusica from '../../../../utils/types/iFormData.musica';

interface iParametros {
    formData: iFormDataMusica;
    setFormData: Dispatch<iFormDataMusica>;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function DivSelecionarArquivo({ formData, setFormData, handleChange }: iParametros) {

    const refInputFile = useRef<any>(null);

    const CONSTS_RADIO_TIPO = {
        LOCAL: '0',
        YOUTUBE: '1'
    };

    const [radioSelecionado, setRadioSelecionado] = useState<string>(CONSTS_RADIO_TIPO.LOCAL);
    function handleChangeRadio(e: any) {
        setRadioSelecionado(e.target.value);
        setFormData({ ...formData, ['localMp3Base64']: '', ['localMp3Nome']: '', ['urlYoutube']: '' });
        // Aviso.info('Qualquer arquivo que foi previamente escolhido, foi resetado!', 7000);
    }

    // https://bobbyhadz.com/blog/react-open-file-input-on-button-click
    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const fileObj = e.target.files && e.target.files[0];

        if (!fileObj) {
            return false;
        }

        // console.log(fileObj);
        converterArquivoParaBase64(fileObj)
            .then((base64: any) => {
                // console.log(base64, fileObj.name);
                setFormData({ ...formData, ['localMp3Base64']: base64, ['localMp3Nome']: fileObj.name });
            });
    }

    return (
        <Fragment>
            <span className='separadorHorizontal'></span>
            <fieldset onChange={handleChangeRadio}>
                <legend>Selecione o tipo de arquivo você quer subir:</legend>

                <div>
                    <input type='radio' name='radioTipo' id='radioLocal' value={CONSTS_RADIO_TIPO.LOCAL} defaultChecked />
                    <label htmlFor='radioLocal'>Arquivo .mp3 local do seu computador</label>
                </div>

                <div>
                    <input type='radio' name='radioTipo' value={CONSTS_RADIO_TIPO.YOUTUBE} id='radioYoutube' />
                    <label htmlFor='radioYoutube'>Link do Youtube</label>
                </div>
            </fieldset>

            <span className='separadorHorizontal'></span>
            {
                radioSelecionado === CONSTS_RADIO_TIPO.LOCAL ? (
                    <div className={Styles.divInputConjunto}>
                        <Input
                            titulo='Subir arquivo .mp3'
                            placeholder=''
                            name='mp3Base64'
                            tipo='text'
                            isDisabled={true}
                            minCaracteres={1}
                            dataTip='Clique no botão à direita para selecionar um arquivo .mp3 do seu computador'
                            value={formData.localMp3Nome}
                            mascara=''
                            referencia={null}
                            isExibirIconeDireita={false}
                            isExisteValidacaoExtra={false}
                            handleValidacaoExtra={null}
                            handleChange={() => null}
                            handleKeyPress={() => null}
                            handleBlur={() => null}
                        />

                        <div>
                            <input ref={refInputFile} type='file' accept='.mp3' onChange={handleFileChange} className='esconder' />
                            <Botao texto='Buscar .mp3' url={null} isNovaAba={false} handleFuncao={() => refInputFile?.current?.click()} Svg={null} refBtn={null} isEnabled={true} />
                        </div>
                    </div>
                ) : (
                    <Input
                        titulo='Link do Youtube'
                        placeholder=''
                        name='urlYoutube'
                        tipo='text'
                        isDisabled={false}
                        minCaracteres={0}
                        dataTip='Direitos autorais? Nunca nem vi'
                        value={formData.urlYoutube}
                        mascara=''
                        referencia={null}
                        isExibirIconeDireita={true}
                        isExisteValidacaoExtra={true}
                        handleValidacaoExtra={validarUrlYoutube(formData.urlYoutube ?? '')}
                        handleChange={handleChange}
                        handleKeyPress={() => null}
                        handleBlur={() => null}
                    />
                )
            }

        </Fragment>
    )
}