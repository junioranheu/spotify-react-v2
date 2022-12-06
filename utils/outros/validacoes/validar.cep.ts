export default function validarCEP(cep: string | undefined | null) {
    if (!cep) {
        return false;
    }

    // Apenas números;
    cep = cep.replace(/\D/g, '');

    if (cep.length === 8) {
        return true;
    }
    else {
        return false;
    }
}

