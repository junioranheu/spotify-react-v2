export default function validarNumeroTelefone(numeroTelefone: string | undefined | null) {
    if (!numeroTelefone) {
        return false;
    }

    const numeroTelfoneApenasNumeros = numeroTelefone.replace(/\D/g, '');
    var regex = new RegExp('^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$');
    return regex.test(numeroTelfoneApenasNumeros);
}