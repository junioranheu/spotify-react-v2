import Image from 'next/image';
import { Dispatch, Fragment, useEffect, useState } from 'react';
import ImgCinza from '../../assets/image/cinza.webp';
import CONSTS_MODAL from '../../utils/consts/outros/modal.tamanho';
import converterSrcImagemParaBase64 from '../../utils/outros/converterSrcImagemParaBase64';
import ModalUpload from '../modal/modal.upload/modal.upload';
import ModalLayout from '../modal/_modal.layout';
import ModalWrapper from '../modal/_modal.wrapper';
import Botao from '../outros/botao';
import Styles from './divUpload.module.scss';

interface iParametros {
    imagem: string | null;
    apiPasta: string | null;
    titulo: string;
    infoAleatoriaUm: string;
    infoAleatoriaDois: string | null;
    textoBotaoDireita: string | null;
    limitarAspectRatio: number | null;

    arquivoUpload: string | null;
    setArquivoUpload: Dispatch<string>;
}

export default function DivUpload({ imagem, apiPasta, titulo, infoAleatoriaUm, infoAleatoriaDois, textoBotaoDireita, limitarAspectRatio, arquivoUpload, setArquivoUpload }: iParametros) {

    const [isModalUploadFotoPerfilOpen, setIsModalUploadFotoPerfilOpen] = useState<boolean>(false);

    useEffect(() => {
        if (imagem) {
            const img = `${apiPasta}/${imagem}`;

            converterSrcImagemParaBase64(img)
                .then((base64: any) => {
                    // console.log(apiPasta, '-', imagem, '-', base64);
                    setArquivoUpload(base64);
                });
        }
    }, [imagem, apiPasta, setArquivoUpload]);

    function handleRemoverFoto() {
        setArquivoUpload('');
    }

    return (
        <Fragment>
            {/* Modal */}
            <ModalWrapper isOpen={isModalUploadFotoPerfilOpen}>
                <ModalLayout handleModal={() => setIsModalUploadFotoPerfilOpen(!isModalUploadFotoPerfilOpen)} isExibirApenasLogo={true} titulo={null} tamanho={CONSTS_MODAL.NULL} isCentralizado={true} isFecharModalClicandoNoFundo={false}>
                    <ModalUpload
                        isBase64={true}
                        handleModal={() => setIsModalUploadFotoPerfilOpen(!isModalUploadFotoPerfilOpen)}
                        setArquivoUpload={setArquivoUpload}
                        limitarAspectRatio={limitarAspectRatio}
                    />
                </ModalLayout>
            </ModalWrapper>

            <div className={Styles.main}>
                <div className={(limitarAspectRatio ? Styles.imgCapaLojinha : Styles.imgFotoPerfil)}>
                    <Image src={(arquivoUpload ? arquivoUpload : ImgCinza)} width={100} height={100} alt='' />
                </div>

                <div className={Styles.infos}>
                    <span className={Styles.titulo}>{titulo}</span>
                    <span className={Styles.texto}>{infoAleatoriaUm}</span>
                    <span className={Styles.texto}>{infoAleatoriaDois && infoAleatoriaDois}</span>
                    {
                        (arquivoUpload) && (
                            <span className={`${Styles.texto} cor-principal pointer`} onClick={() => handleRemoverFoto()}>Remover</span>
                        )
                    }
                </div>

                {
                    textoBotaoDireita && (
                        <div className={Styles.divBotao}>
                            <span className='separador'></span>

                            <Botao
                                texto={textoBotaoDireita}
                                url={null}
                                isNovaAba={false}
                                handleFuncao={() => setIsModalUploadFotoPerfilOpen(true)}
                                Svg={null}
                                refBtn={null}
                                isEnabled={true}
                            />
                        </div>
                    )
                }
            </div>
        </Fragment>
    )
}