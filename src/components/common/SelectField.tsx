import React from 'react';
import Select from 'react-select';
import { InputFieldProps } from '../../types/formInput.types';

const SelectField: React.FC<InputFieldProps> = ({
    id,
    label,
    value,
    onChanges,
    options = [],
    classNamePrefix,
}) => {
    const formattedOptions = options.map(option => ({ value: option, label: option }));

    return (
        <div className={`relative ${classNamePrefix}`}>
            <label className="absolute -top-5 font-poppins text-primary text-tiny font-light text-sm">
                {label}
            </label>
            <Select
                id={id}
                value={formattedOptions.find(option => option.value === value)}
                onChange={(selected) => onChanges && onChanges(selected?.value || '')}
                options={formattedOptions}
                placeholder=""
                isSearchable={false}
                className={`mb-4 placeholder-secondary font-light  text-[15px] font-poppins border-b-2`}
                styles={{
                    control: (provided) => ({
                        ...provided,
                        border: 'none',
                        boxShadow: 'none',
                        '&:hover': {
                            border: 'none',
                        },
                        backgroundColor: 'transparent',

                    }),
                    option: (provided, state) => ({
                        ...provided,
                        background: state.isFocused ? '#CD46D9' : 'transparent',
                        color: 'white',
                        border: 'none',
                    }),
                    singleValue: (provided) => ({
                        ...provided,
                        color: '#C10C99',
                        border: 'none',
                    }),
                }}

            />
        </div>
    );
};

export default SelectField;
