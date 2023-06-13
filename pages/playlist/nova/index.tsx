import useUsuarioContext from '@hooks/api/context/useUsuarioContext';
import { Fetch } from '@utils/api/fetch';
import CONSTS_PLAYLISTS from '@utils/consts/data/constPlaylists';
import CONSTS_ERROS from '@utils/consts/outros/erros';
import CONSTS_SISTEMA from '@utils/consts/outros/sistema';
import CONSTS_TELAS from '@utils/consts/outros/telas';
import ajustarUrl from '@utils/outros/ajustarUrl';
import { Aviso } from '@utils/outros/aviso';
import iFormDataPlaylist from '@utils/types/iFormData.playlist';
import iPlaylist from '@utils/types/iPlaylist';
import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import { ChangeEvent, Fragment, useRef, useState } from 'react';
import NovaPlaylistComponent from './novaPlaylist.component';

export default function Index() {

    const [isAuth, setIsAuth] = useUsuarioContext();

    const refBtn = useRef<HTMLButtonElement | any>(null);

    const [arquivoUploadCapa, setArquivoUploadCapa] = useState<string | null>(''); // ('/1.webp');
    const [formData, setFormData] = useState<iFormDataPlaylist>({
        nome: '',
        sobre: '',
        foto: arquivoUploadCapa,
        corDominante: ''
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e?.target?.name]: e?.target?.value });
    }

    async function handleSubmit() {
        nProgress.start();
        formData.foto = arquivoUploadCapa;
        refBtn.current.disabled = true;

        if (!formData.nome) {
            instrucaoErro('O campo <b>título da playlist</b> é obrigatório!', true);
            return false;
        }

        if (!formData.foto) {
            instrucaoErro('Você deve selecionar uma <b>imagem de capa</b> para sua playlist!', true);
            return false;
        }

        const url = CONSTS_PLAYLISTS.API_URL_POST_ADICIONAR;
        const dto = {
            nome: formData.nome,
            sobre: formData.sobre,
            foto: formData.foto ?? '',
            corDominante: formData.corDominante ?? '#1B1039'
        };

        const resposta = await Fetch.postApi(url, dto) as iPlaylist;
        if (!resposta || resposta?.erro) {
            instrucaoErro((resposta?.mensagemErro ? `Parece que ${resposta?.mensagemErro.toLowerCase()}. Tente novamente mais tarde` : 'Algo deu errado! Tente novamente mais tarde'), true);
            return false;
        }

        // Voltar à tela principal;
        const urlAlvo = `${CONSTS_TELAS.PLAYLIST}/${resposta.playlistId}/${ajustarUrl(resposta.nome)}`;
        Router.push(urlAlvo).then(() => {
            Aviso.success(`A playlist <b>${formData.nome}</b> foi criada com sucesso!`, 7000);
            nProgress.done();
        });
    }

    function instrucaoErro(msg: string, isExibirAviso: boolean) {
        nProgress.done();
        refBtn.current.disabled = false;

        if (isExibirAviso) {
            Aviso.warn(msg, 5000);
        }
    }

    if (!isAuth) {
        Router.push({ pathname: CONSTS_TELAS.ERRO, query: { erro: CONSTS_ERROS.SEM_ACESSO } });
        return false;
    }

    return (
        <Fragment>
            <Head>
                <title>Criar nova playlist • {CONSTS_SISTEMA.NOME_SISTEMA}</title>
            </Head>

            <NovaPlaylistComponent
                tituloTopHat='Criar nova playlist'
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
                arquivoUploadCapa={arquivoUploadCapa}
                setArquivoUploadCapa={setArquivoUploadCapa}
                handleSubmit={handleSubmit}
                refBtn={refBtn}
                txtBtn='Criar playlist'
            />
        </Fragment>
    )
}