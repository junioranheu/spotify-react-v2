import 'cropperjs/dist/cropper.css';
import { Dispatch, Fragment, useRef } from 'react';
import Cropper from 'react-cropper'; // https://www.npmjs.com/package/react-cropper | https://github.com/fengyuanchen/cropperjs#options
import StylesUpload from './modal.upload.module.scss';

interface iParametros {
    arquivoBlob: string;
    setArquivoCrop: Dispatch<string> | any;
    limitarAspectRatio: number | null;
}

export default function ModalUploadConteudo({ arquivoBlob, setArquivoCrop, limitarAspectRatio }: iParametros) {

    const cropperRef = useRef<HTMLImageElement>(null);
    function handleCrop() {
        const imageElement: any = cropperRef?.current;
        const cropper: any = imageElement?.cropper;
        const imagemCropUrl = cropper.getCroppedCanvas().toDataURL();
        // console.log(imagemCropUrl);

        setArquivoCrop(imagemCropUrl);
    };

    return (
        <Fragment>
            {
                arquivoBlob ? (
                    <Cropper
                        src={arquivoBlob}
                        style={{ maxHeight: 400, width: '100%' }}
                        initialAspectRatio={16 / 9} // Aspecto inicial
                        aspectRatio={(limitarAspectRatio ?? undefined)} // Aspecto para limitar cropping;
                        guides={false} // Quadradinhos ao croppar;
                        zoomable={false} // Se a imagem pode ter zoom;
                        movable={false} // Se a imagem pode ser movida;
                        crop={handleCrop} // Ao croppar;
                        ref={cropperRef}
                    />
                ) : (
                    <div className={StylesUpload.divAvisoUpload}>
                        <h1>Clique aqui<br />ou arraste uma imagem</h1>
                    </div>
                )
            }
        </Fragment>
    )
}