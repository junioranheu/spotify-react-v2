import { Fragment } from 'react';
import Volume1 from '../../../svg/barra.player/volume1';
import Volume2 from '../../../svg/barra.player/volume2';
import Volume3 from '../../../svg/barra.player/volume3';
import Volume4 from '../../../svg/barra.player/volume4';

interface iParametros {
    volume: number;
}

export default function ProgressBarVolumeIcone({ volume }: iParametros) {
    return (
        <Fragment>
            {
                volume >= 65 ? (
                    <Volume4 />
                ) : volume >= 30 && volume < 65 ? (
                    <Volume3 />
                ) : volume >= 1 && volume < 30 ? (
                    <Volume2 />
                ) : (
                    <Volume1 />
                )
            }
        </Fragment>
    )
}