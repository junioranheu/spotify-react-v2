import nProgress from 'nprogress';
import { MutableRefObject } from 'react';
import { Aviso } from '../aviso';

export default function validarCompletoNomeUsuarioSistema
    (
        isExibirAvisos: boolean,
        nomeUsuarioSistema: string,
        refNomeUsuario: MutableRefObject<any> | null,
        refSenha: MutableRefObject<any> | null,
        refConfirmarSenha: MutableRefObject<any> | null
    ) {

    if (!nomeUsuarioSistema) {
        nProgress.done();
        isExibirAvisos && Aviso.warn('Parece que você esqueceu de colocar um <b>nome de usuário</b>', 5000);
        refNomeUsuario && refNomeUsuario.current.select();

        if (refSenha) {
            refSenha.current.value = '';
        }

        if (refConfirmarSenha) {
            refConfirmarSenha.current.value = '';
        }

        return false;
    }

    // Verificação de nome de usuário #2: pelo menos 03 caracteres?;
    if (nomeUsuarioSistema.length > 20 || nomeUsuarioSistema.length < 4) {
        nProgress.done();
        isExibirAvisos && Aviso.warn('O <b>nome de usuário</b> não pode ter não pode ter menos de 4 e nem mais de 10 caracteres, e agora está com ' + nomeUsuarioSistema.length + '!', 5000);
        refNomeUsuario && refNomeUsuario.current.select();

        if (refSenha) {
            refSenha.current.value = '';
        }

        if (refConfirmarSenha) {
            refConfirmarSenha.current.value = '';
        }

        return false;
    }

    return true;
}