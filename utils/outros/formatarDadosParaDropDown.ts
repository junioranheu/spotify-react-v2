export default function formatarDadosParaDropDown(dados: Array<any> | undefined, nomePropKey: string, nomePropLabel: string) {
    const dadosFormatados = [] as any;

    if (!dados) {
        return [];
    }

    dados.forEach((el: any) => {
        // console.log(el);
        dadosFormatados.push({ value: el[nomePropKey] as string, label: el[nomePropLabel] as string });
    });

    // console.log(dadosFormatados);
    return dadosFormatados;
}