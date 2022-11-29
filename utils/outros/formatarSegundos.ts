export default function formatarSegundos(duration: number, isLegenda: boolean) {
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    var ret = '';

    if (isLegenda) {
        if (hrs > 0) {
            ret += '' + hrs + ' h ' + (mins < 10 ? '0' : '');
        }

        ret += '' + mins + ' min ' + (secs < 10 ? '0' : '');
        ret += '' + secs + ' seg ';
    } else {
        if (hrs > 0) {
            ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
        }

        ret += '' + mins + ':' + (secs < 10 ? '0' : '');
        ret += '' + secs;
    }

    return ret;
}