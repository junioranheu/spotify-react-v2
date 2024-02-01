import CONSTS_SISTEMA from '@utils/consts/outros/sistema';
import Swal from 'sweetalert2';

export default function swalAvisoBancoDeDados(videoPath: string) {
    const msg = `<p>Parece que, no momento, infelizmente não será possível utilizar o <b>${CONSTS_SISTEMA.NOME_SISTEMA}</b> por completo, porque a base de dados foi desativada por tempo indeterminado por motivos estratégicos.</p>
    <p>Dê play no vídeo abaixo em modo <i>full screen</i>, e veja brevemente como o <b>${CONSTS_SISTEMA.NOME_SISTEMA}</b> funcionava! 🥲</p>  
    <p><video controls controlsList="nodownload noremoteplayback">
        <source src="${videoPath}" type="video/mp4">
    </video></p>`;

    Swal.fire({
        html: msg,
        width: 600,
        color: 'var(--preto)',
        background: 'var(--branco)',
        backdrop: 'rgba(0, 0, 123, 0.25)',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showDenyButton: false,
        showConfirmButton: false
    });
}