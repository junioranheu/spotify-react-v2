import moment from 'moment';

// https://stackoverflow.com/a/44071876;
export default function converterTempoDecimalEmFormatoPadrao(tempo: number, tipoDuracao: any) {
    const data = moment.duration(tempo, tipoDuracao);

    const d = data.asDays() >= 1 ? (`${data.asDays().toFixed(0)} ${data.asDays().toFixed(0) === '1' ? 'dia' : 'dias'}, `) : '';

    const hms = [
        ('0' + data.hours()).slice(-2),
        ('0' + data.minutes()).slice(-2),
        ('0' + data.seconds()).slice(-2),
    ].join(':');

    const resultadoFinal = d + hms;
    return resultadoFinal;
}