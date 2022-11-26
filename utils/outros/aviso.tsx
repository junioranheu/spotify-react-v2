// https://fkhadra.github.io/react-toastify/positioning-toast
import { toast } from 'react-toastify';

export const Aviso = {
    success(texto: string, milisegundos: number) {
        toast.success(<div dangerouslySetInnerHTML={{ __html: texto }}></div>, {
            // position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: milisegundos
        });
    },

    error(texto: string, milisegundos: number) {
        toast.error(<div dangerouslySetInnerHTML={{ __html: texto }}></div>, {
            // position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: milisegundos
        });
    },

    warn(texto: string, milisegundos: number) {
        toast.warn(<div dangerouslySetInnerHTML={{ __html: texto }}></div>, {
            // position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: milisegundos
        });
    },

    info(texto: string, milisegundos: number) {
        toast.info(<div dangerouslySetInnerHTML={{ __html: texto }}></div>, {
            // position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: milisegundos
        });
    },

    custom(texto: string, milisegundos: number) {
        toast(<div dangerouslySetInnerHTML={{ __html: texto }}></div>, {
            // position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: milisegundos
        });
    }
}