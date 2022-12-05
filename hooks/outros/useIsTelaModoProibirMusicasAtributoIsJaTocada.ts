import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CONSTS_TELAS from '../../utils/consts/outros/telas';

export default function useIsTelaModoProibirMusicasAtributoIsJaTocada() {

    const { asPath } = useRouter();

    const [modoProibirMusicasAtributoIsJaTocada, setModoProibirMusicasAtributoIsJaTocada] = useState<boolean>(false);
    useEffect(() => {
        // Aviso.info(asPath, 3000);
        // Lista de telas que proibem as musicas com atributo "isJaTocada";
        const telasModoProibirMusicasAtributoIsJaTocada = [CONSTS_TELAS.FILA,];

        // Verificar se a tela atual (asPath) está na lista;
        if (telasModoProibirMusicasAtributoIsJaTocada.indexOf(asPath) > -1) {
            setModoProibirMusicasAtributoIsJaTocada(true);
        } else {
            setModoProibirMusicasAtributoIsJaTocada(false);
        }
    }, [asPath]);

    return modoProibirMusicasAtributoIsJaTocada;
}