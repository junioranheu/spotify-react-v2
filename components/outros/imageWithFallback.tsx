import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';

const ImageWithFallback = (props: any) => {
    const { src, fallbackSrc, ...rest } = props;
    const [imgSrc, setImgSrc] = useState<StaticImageData | string>(src);

    return (
        <Image
            {...rest}
            src={imgSrc}
            onError={() => {
                setImgSrc(fallbackSrc);
            }}
            alt=''
            priority={true}
        />
    );
};

export default ImageWithFallback;