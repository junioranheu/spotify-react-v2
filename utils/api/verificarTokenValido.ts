import moment from 'moment';
import nProgress from 'nprogress';
import TIPOS_DURACAO_MOMENT from '../consts/outros/tiposDuracaoMoment';
import VERBOS_HTTP from '../consts/outros/verbosHTTP';
import { Auth } from '../context/usuarioContext';
import converterTempoDecimalEmFormatoPadrao from '../outros/converterTempoDecimalEmFormatoPadrao';
import diferencaDatasEmHoras from '../outros/diferencaDatasEmHoras';
import horarioBrasilia from '../outros/horarioBrasilia';
import { Fetch } from './fetch';

export default async function verificarTokenValido(isAuth: boolean | undefined) {
    if (isAuth) {
        const token = Auth?.get()?.token ?? '';
        const dataExpiracaoToken = moment(getJWTExpireDate(token));
        const horaAgora = moment(horarioBrasilia());

        if (process.env.NODE_ENV === 'development') {
            try {
                const info = {
                    'Token': token,
                    'Data atual': horaAgora.format('YYYY-MM-DD HH:mm:ss'),
                    'Data de expiração do token': dataExpiracaoToken.format('YYYY-MM-DD HH:mm:ss'),
                    'Tempo até a expiração': converterTempoDecimalEmFormatoPadrao(diferencaDatasEmHoras(dataExpiracaoToken, horaAgora), TIPOS_DURACAO_MOMENT.HORAS)
                }

                // console.table(info);
            } catch (error) {

            }
        }

        if (horaAgora > dataExpiracaoToken) {
            nProgress.start();
            await Fetch.refreshToken(token, 'Unexpected end of JSON input', VERBOS_HTTP.POST, null, null, true);
            nProgress.done();
        }
    }
}

// https://stackoverflow.com/a/67802771;
function getJWTExpireDate(jwtToken: string) {
    if (jwtToken) {
        try {
            const [, payload] = jwtToken.split('.');
            const { exp: expires } = JSON.parse(window.atob(payload));

            if (typeof expires === 'number') {
                return new Date(expires * 1000);
            }
        } catch {

        }
    }

    return null;
}