import { Fetch } from '@utils/api/fetch';
import CONSTS_PLAYLISTS from '@utils/consts/data/constPlaylists';
import formatarDadosParaDropDown from '@utils/outros/formatarDadosParaDropDown';
import iPlaylist from '@utils/types/iPlaylist';
import nProgress from 'nprogress';
import { useEffect, useState } from 'react';

export default function usePlaylistsByUsuarioId(usuarioId: number, isFormatarDadosParaDropdown: boolean) {
     
    const [dados, setDados] = useState<iPlaylist[]>();
    useEffect(() => {
        async function get(usuarioId: number) {
            nProgress.start();
            const url = `${CONSTS_PLAYLISTS.API_URL_GET_BY_USUARIO_ID}/${usuarioId}`;
            const fetchDados = await Fetch.getApi(url) as iPlaylist[] ?? null;

            if (isFormatarDadosParaDropdown) {
                setDados(formatarDadosParaDropDown(fetchDados, 'playlistId', 'nome'));
            } else {
                setDados(fetchDados);
            }

            nProgress.done();
        }

        if (usuarioId) {
            get(usuarioId);
        }
    }, [usuarioId]);

    return dados;
}