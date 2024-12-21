export interface InputFieldProps {
    type?: string;
    placeholder?: string;
    id?: string;
    icon?: React.ReactNode;
    label?: string;
    showPassword?: boolean;
    toggleShowPassword?: () => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChanges?: (value: string) => void;
    value?: string;
    options?: string[];
    classNamePrefix?: string;
    isPriceField?: boolean;
    noMargin?: boolean;
}
