import ContentLoader from 'react-content-loader'; // https://www.npmjs.com/package/react-content-loader

interface iParametros {
    qtdElementos: number;
    width: number;
    height: number;
    backgroundColor: string | null;
    foregroundColor: string | null;
}

export default function ContentLoaderQuadrado({ qtdElementos, width, height, backgroundColor, foregroundColor }: iParametros) {
    return (
        <ContentLoader viewBox='0 0 600 70' animate={true} speed={3} backgroundColor={`${backgroundColor ?? 'var(--branco)'}`} foregroundColor={`${foregroundColor ?? 'var(--cinza-claro)'}`}>
            {
                Array.from(Array(qtdElementos), (e: any, i: number) => {
                    return <rect x={`${i * 80}`} y='0' rx='5' ry='3' width={width} height={height} key={i} />
                })
            }
        </ContentLoader>
    )
}