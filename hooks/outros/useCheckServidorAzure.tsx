import { Fetch } from '@utils/api/fetch';
import CONSTS_PLAYLISTS from '@utils/consts/data/constPlaylists';
import swalErro from '@utils/outros/swal.erro';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function useCheckServidorAzure() {

    const [loading, setLoading] = useState<boolean>(true);
    const limiteAvisoLoadingMilissegundos = 2500;

    useEffect(() => {
        async function fetchGetFake() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve('mock_getFakefake');
                }, limiteAvisoLoadingMilissegundos + 5000);
            });
        }

        async function handleChamadaInicialAzure() {
            try {
                // const resp = await fetchGetFake();
                const resp = await Fetch.getApi(CONSTS_PLAYLISTS.API_URL_GET_TODOS_NAO_ADM);
                // console.log(resp);
            } catch (error: unknown) {
                swalErro(error);
            } finally {
                setLoading(false);
                Swal.close();
            }
        }

        const timeout = setTimeout(() => {
            if (loading) {
                Swal.fire({
                    html: '<p>A API está publicada na Azure com uma subscrição free, portanto a primeira requisição pode demorar um pouco.<p><br/><p><b>Aguarde uns instantes</b> enquanto o servidor está iniciando!</p>',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                setLoading(false);
            }
        }, limiteAvisoLoadingMilissegundos);

        if (loading) {
            handleChamadaInicialAzure();
        }

        return () => clearTimeout(timeout);
    }, [loading]);

}