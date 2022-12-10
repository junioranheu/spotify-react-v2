import { Dispatch } from 'react';
import Select from 'react-select'; // https://www.npmjs.com/package/react-select
import formatarDadosParaDropDown from '../../utils/outros/formatarDadosParaDropDown';

interface iParametros {
    selectMulti: any;
    setSelectMulti: Dispatch<any>;
    lista: any;
    nomePropKey: string;
    nomePropLabel: string;
    isMulti: boolean;
    placeholder: string | null;
    noOptionsMessage: string | null;
    className: string | null;
}

export default function InputSelect({ selectMulti, setSelectMulti, lista, nomePropKey, nomePropLabel, isMulti, placeholder, noOptionsMessage, className }: iParametros) {

    const selectCustomStyles = {
        control: (base: any) => {
            return {
                ...base,
                backgroundColor: 'var(--bege)',
                color: 'var(--preto)'
            };
        },
        menuList: (base: any) => ({
            ...base,
            color: 'var(--preto)'
          })
    };

    return (
        <Select
            defaultValue={selectMulti}
            onChange={setSelectMulti}
            options={formatarDadosParaDropDown(lista, nomePropKey, nomePropLabel)}
            isMulti={isMulti}
            placeholder={placeholder}
            noOptionsMessage={() => noOptionsMessage}
            className={className ?? ''}
            styles={selectCustomStyles}
        />
    )
}