import moment from 'moment';

export default function diferencaDatasEmHoras(dataUm: any, dataDois: any) {
    const dataUmFormatada = moment(dataUm, 'YY-MM-DD HH:mm:SS');
    const dataDoisFormatada = moment(dataDois, 'YY-MM-DD HH:mm:SS');

    var duracao = moment.duration(dataUmFormatada.diff(dataDoisFormatada));
    var diferencaHoras = duracao.asHours();

    return diferencaHoras;
}