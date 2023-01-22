import TIPOS_ARQUIVOS_UPLOAD_IMAGEM from '@utils/consts/outros/tiposArquivosUpload.imagem';
import UPLOAD_SETTINGS from '@utils/consts/outros/uploadSettings';
import { Aviso } from '@utils/outros/aviso';
import dataUrltoFile from '@utils/outros/dataURLToFile';
import UUID from '@utils/outros/UUID';
import NProgress from 'nprogress';
import { Dispatch, Fragment, useEffect, useState } from 'react';
import Botao from '../../outros/botao';
import DragDropFile from '../../upload/dragDropFile';
import { FecharModal } from '../fecharModal';
import ModalUploadConteudo from './modal.upload.conteudo';
import StylesUpload from './modal.upload.module.scss';

interface iParametros {
    isBase64: boolean; // true = base64, false = file;
    handleModal: Dispatch<boolean>;
    setArquivoUpload: Dispatch<File> | any;
    limitarAspectRatio: number | null;
}

export default function ModalUpload({ isBase64, handleModal, setArquivoUpload, limitarAspectRatio }: iParametros) {

    const [nomeElementoInput] = useState<string>('inputUpload_modalUpload');
    const [arquivo, setArquivo] = useState<any>(null);
    const [arquivoBlob, setArquivoBlob] = useState<string>('');
    const [arquivoCrop, setArquivoCrop] = useState<string>('');
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    useEffect(() => {
        if (arquivo) {
            const arquivoBlob = URL.createObjectURL(arquivo);
            setArquivoBlob(arquivoBlob);
            setIsDisabled(true);
        }
    }, [arquivo]);

    function handleClicarInputUpload() {
        setIsDisabled(false);

        setTimeout(function () {
            const inputUpload = document.querySelector(`input[name="${nomeElementoInput}"]`) as HTMLInputElement;
            inputUpload.click();
        }, 500);
    }

    async function handleConfirmarUpload() {
        NProgress.start();

        if (!arquivoCrop) {
            Aviso.error('Você não selecionou uma imagem para continuar', 5000);
            NProgress.done();
            return false;
        }

        // console.log('arquivo: ', arquivo);
        // console.log('arquivoBlob: ', arquivoBlob);
        // console.log('arquivoCrop: ', arquivoCrop);

        if (arquivoCrop) {
            dataUrltoFile(arquivoCrop, `file_${UUID()}.png`, 'image/png')
                .then(function (file) {
                    if (isBase64) {
                        // Converter file (arquivo que passou pelo cropping) para base64;
                        var reader = new FileReader();
                        reader.readAsDataURL(file);

                        reader.onload = function () {
                            const base64 = reader.result;
                            setArquivoUpload(base64);
                            // console.log(arquivoCropFile, base64);
                            // const arquivoBlobPreview = URL.createObjectURL(arquivoUpload);

                            // Aviso.success('Imagem enviada com sucesso', 5000);
                            NProgress.done();
                            FecharModal.fecharModalClicandoNoBotao(handleModal);
                        };

                        reader.onerror = function (error) {
                            // console.log('Error: ', error);
                            Aviso.success('Houve um erro ao enviar a imagem', 5000);
                            NProgress.done();
                            FecharModal.fecharModalClicandoNoBotao(handleModal);
                        };
                    } else {
                        setArquivoUpload(file);
                        // Aviso.success('Imagem enviada com sucesso', 5000);
                        NProgress.done();
                        FecharModal.fecharModalClicandoNoBotao(handleModal);
                    }
                });
        }
    }

    return (
        <Fragment>
            <div className={StylesUpload.divUpload}>
                <DragDropFile
                    nomeElemento={nomeElementoInput}
                    tipoArquivos={TIPOS_ARQUIVOS_UPLOAD_IMAGEM.TIPOS}
                    isMultiple={false}
                    setArquivo={setArquivo}
                    texto='Clique aqui ou arraste uma imagem: '
                    maxSizeMBs={UPLOAD_SETTINGS.LIMITE_MB}
                    isDisabled={isDisabled}
                    conteudo={<ModalUploadConteudo arquivoBlob={arquivoBlob} setArquivoCrop={setArquivoCrop} limitarAspectRatio={limitarAspectRatio} />}
                />
            </div>

            <div className='margem1'>
                <Botao texto='Confirmar foto' url={null} isNovaAba={false} handleFuncao={() => handleConfirmarUpload()} Svg={null} refBtn={null} isEnabled={true} />
            </div>

            <span className='margem1 cor-principal pointer' onClick={() => handleClicarInputUpload()}>Escolher outra imagem</span>
            <div className='margem0_5'></div>
        </Fragment>
    )
}