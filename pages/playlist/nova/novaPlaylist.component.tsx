import { TwitterPicker } from '@hello-pangea/color-picker'; // https://www.npmjs.com/package/@hello-pangea/color-picker
import { ChangeEvent, Dispatch, MutableRefObject } from 'react';
import Botao from '../../../components/outros/botao';
import Input from '../../../components/outros/input';
import TopHat from '../../../components/outros/topHat';
import Mais from '../../../components/svg/mais';
import DivUpload from '../../../components/upload/divUpload';
import useEmoji from '../../../hooks/outros/useEmoji';
import Styles from '../../../styles/form.module.scss';
import CONSTS_UPLOAD from '../../../utils/consts/data/constUpload';
import UPLOAD_SETTINGS from '../../../utils/consts/outros/uploadSettings';
import iFormDataPlaylist from '../../../utils/types/iFormData.playlist';

interface iParametros {
    tituloTopHat: string;
    formData: iFormDataPlaylist;
    setFormData: Dispatch<iFormDataPlaylist>;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    arquivoUploadCapa: string | null;
    setArquivoUploadCapa: Dispatch<string>;
    handleSubmit: () => Promise<false | undefined>;
    refBtn: MutableRefObject<any>;
}

export default function NovaPlaylistComponent({ tituloTopHat, formData, setFormData, handleChange, arquivoUploadCapa, setArquivoUploadCapa, handleSubmit, refBtn }: iParametros) {

    const emoji = useEmoji();

    return (
        <section className={Styles.main}>
            <div className={Styles.mainInner}>
                <TopHat Svg={<Mais width='0.75rem' cor='var(--branco-escuro)' />} titulo={tituloTopHat} backgroundColor='var(--super-preto)' fontColor='var(--branco-escuro)' />

                <div className={`${Styles.sessao} margem0_5`}>
                    <Input
                        titulo='Título da playlist'
                        placeholder=''
                        name='nome'
                        tipo='text'
                        isDisabled={false}
                        minCaracteres={3}
                        dataTip='O título da playlist deve ter pelo menos 3 caracteres!'
                        value={formData.nome}
                        mascara=''
                        referencia={null}
                        isExibirIconeDireita={true}
                        isExisteValidacaoExtra={false}
                        handleValidacaoExtra={null}
                        handleChange={handleChange}
                        handleKeyPress={() => null}
                        handleBlur={() => null}
                    />

                    <span className='separadorHorizontal'></span>
                    <Input
                        titulo='Descrição da playlist'
                        placeholder=''
                        name='sobre'
                        tipo='text'
                        isDisabled={false}
                        minCaracteres={0}
                        dataTip='Um textinho bonitinho, por favor'
                        value={formData.sobre}
                        mascara=''
                        referencia={null}
                        isExibirIconeDireita={false}
                        isExisteValidacaoExtra={false}
                        handleValidacaoExtra={null}
                        handleChange={handleChange}
                        handleKeyPress={() => null}
                        handleBlur={() => null}
                    />

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInputConjunto}>
                        <DivUpload
                            imagem={formData.foto ?? ''}
                            apiPasta={CONSTS_UPLOAD.API_URL_GET_CAPA}
                            titulo='Capa da playlist'
                            infoAleatoriaUm={`Escolhe uma imagem da hora aí ${emoji}`}
                            infoAleatoriaDois={`Peso máximo: ${UPLOAD_SETTINGS.LIMITE_MB} MB`}
                            textoBotaoDireita='Alterar capa'
                            limitarAspectRatio={null}
                            arquivoUpload={arquivoUploadCapa}
                            setArquivoUpload={setArquivoUploadCapa}
                        />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInputPicker}>
                        <span className={Styles.titulo}>Cor predominante da playlist</span>
                        <TwitterPicker
                            className={Styles.componenteColorPicker}
                            defaultColor='#1B1039'
                            onChange={(e) => setFormData({ ...formData, ['corDominante']: e?.hex })}
                        />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divBotao}>
                        <Botao texto='Criar playlist' url={null} isNovaAba={false} handleFuncao={() => handleSubmit()} Svg={null} refBtn={refBtn} isEnabled={true} />
                    </div>
                </div>
            </div>
        </section>
    )
}