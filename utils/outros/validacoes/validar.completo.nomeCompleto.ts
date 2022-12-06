import nProgress from 'nprogress';
import { MutableRefObject } from 'react';
import { Aviso } from '../aviso';

export default function validarCompletoNomeCompleto
    (
        isExibirAvisos: boolean,
        nomeCompleto: string,
        refNomeCompleto: MutableRefObject<any> | null,
        refSenha: MutableRefObject<any> | null,
        refConfirmarSenha: MutableRefObject<any> | null
    ) {
        
    // Verificação do nome #1: nome preenchido?;
    if (!nomeCompleto) {
        nProgress.done();
        isExibirAvisos && Aviso.warn('Parece que você esqueceu de colocar o seu <b>nome</b>', 5000);
        refNomeCompleto && refNomeCompleto.current?.select();

        if (refSenha) {
            refSenha.current.value = '';
        }

        if (refConfirmarSenha) {
            refConfirmarSenha.current.value = '';
        }

        return false;
    }

    // Verificação do nome #2: pelo menos 03 caracteres?;
    if (nomeCompleto.length < 3) {
        nProgress.done();
        isExibirAvisos && Aviso.warn('Seu <b>nome</b> não pode ter menos de 03 caracteres!', 5000);
        refNomeCompleto && refNomeCompleto.current.select();

        if (refSenha) {
            refSenha.current.value = '';
        }

        if (refConfirmarSenha) {
            refConfirmarSenha.current.value = '';
        }

        return false;
    }

    // Verificação do nome #3: se existe pelo menos um espaço (dois nomes), false = não;
    var reg = new RegExp("(\\w+)(\\s+)(\\w+)");
    if (reg.test(nomeCompleto) === false) {
        nProgress.done();
        isExibirAvisos && Aviso.warn(`<b>${nomeCompleto}</b> é um belo nome, mas cadê seu sobrenome?`, 5000);
        refNomeCompleto && refNomeCompleto.current.select();

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