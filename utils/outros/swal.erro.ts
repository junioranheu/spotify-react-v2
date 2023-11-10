import CONSTS_TELAS from '@utils/consts/outros/telas';
import Swal from 'sweetalert2';

export default function swalErro(erro: string | unknown, isRedirect: boolean = true) {
    if (window.location.href.includes(CONSTS_TELAS.ERRO)) {
        return;
    }

    Swal.fire({
        html: `<p>Parece que algo deu errado durante sua requisição. Atualize a página para tentar novamente.</p><br/><p>Mais detalhes: ${erro ?? '-'}</p>`,
        width: 600,
        color: 'var(--preto)',
        background: 'var(--branco)',
        backdrop: 'rgba(0, 0, 123, 0.25)',
        allowOutsideClick: false,
        confirmButtonText: 'OK',
    }).then((result) => {
        if (result.isConfirmed && isRedirect) {
            window.location.href = CONSTS_TELAS.ERRO;
        }
    });
}