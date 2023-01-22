import usePlaylistsByUsuarioId from '@hooks//api/usePlaylistsByUsuarioId';
import { Fetch } from '@utils/api/fetch';
import CONSTS_MUSICAS from '@utils/consts/data/constMusicas';
import CONSTS_SISTEMA from '@utils/consts/outros/sistema';
import { Auth } from '@utils/context/usuarioContext';
import { Aviso } from '@utils/outros/aviso';
import iMusica from '@utils/types/iMusica';
import iPlaylist from '@utils/types/iPlaylist';
import { Dispatch, useRef, useState } from 'react';
import Botao from '../../outros/botao';
import InputSelect from '../../outros/select';
import Styles from './modal.adicionarMusica.module.scss';

interface iParametros {
    musicaId: number;
    titulo: string;
    setIsModalAdicionarMusicaNaPlaylistOpen: Dispatch<boolean>;
}

export default function ModalAdicionarMusica({ musicaId, titulo, setIsModalAdicionarMusicaNaPlaylistOpen }: iParametros) {

    const usuarioId = Auth?.get()?.usuarioId ?? 0;
    const tituloFinal = (titulo ? `Adicione a música <b class='cor-principal'>${titulo}</b> às suas playlists` : 'Adicionar música às suas playlists');
    const refBtn = useRef<HTMLButtonElement | any>(null);

    const listaPlaylists = usePlaylistsByUsuarioId(usuarioId, false) as iPlaylist[];
    const [selectMultiPlaylist, setSelectMultiPlaylist] = useState<any>();

    async function handleSubmit() {
        refBtn.current.disabled = true;

        // Tratar o "selectMultiPlaylist" para uma lista de ids;
        let listaPlaylists = [] as any;
        if (selectMultiPlaylist) {
            selectMultiPlaylist.forEach((el: any) => {
                listaPlaylists.push(el.value);
            });
        }

        if (!listaPlaylists?.length) {
            Aviso.warn('Nenhuma <b>playlist</b> foi selecionada!', 5000);
            refBtn.current.disabled = false;
            return false;
        }

        const url = CONSTS_MUSICAS.API_URL_POST_ADICIONAR_MUSICA_EM_PLAYLSITS;
        const dto = {
            musicaId: musicaId,
            listaPlaylists: listaPlaylists
        };

        const resposta = await Fetch.postApi(url, dto) as iMusica;
        if (!resposta || resposta?.erro) {
            Aviso.error((resposta?.mensagemErro ? `Parece que ${resposta?.mensagemErro.toLowerCase()}. Tente novamente mais tarde` : 'Algo deu errado! Tente novamente mais tarde'), 5000);
            return false;
        }

        Aviso.success('Música adicionada com sucesso', 5000);
        setIsModalAdicionarMusicaNaPlaylistOpen(false);
    }

    return (
        <div className={Styles.main}>
            <span
                className={`${Styles.titulo} margem2`}
                dangerouslySetInnerHTML={{ __html: tituloFinal }}>
            </span>

            <div className={Styles.fullWidth}>
                <InputSelect
                    selectMulti={selectMultiPlaylist}
                    setSelectMulti={setSelectMultiPlaylist}
                    lista={listaPlaylists}
                    nomePropKey='playlistId'
                    nomePropLabel='nome'
                    isMulti={true}
                    placeholder=''
                    noOptionsMessage='Nenhuma playlist. Crie uma agora mesmo!'
                    className='margem0_5'
                />
            </div>

            <div className='margem1'>
                <Botao
                    texto='Adicionar'
                    url={null}
                    isNovaAba={false}
                    handleFuncao={() => handleSubmit()}
                    Svg={null}
                    refBtn={refBtn}
                    isEnabled={true}
                />
            </div>

            <span className='separadorHorizontal'></span>

            <span className={Styles.termos}>
                Ao entrar, criar uma conta ou ouvir nossas músicas, você está de acordo com os <a href='https://github.com/junioranheu' rel='noreferrer' target='_blank'>termos de serviço e a política de privacidade</a> do {CONSTS_SISTEMA.NOME_SISTEMA}
            </span>
        </div>
    )
}