import React from 'react';
import { ButtonProps } from '../../types/button.types';

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    className = '',
    disabled = false
}) => {
    return (
        <button
            className={`text-uppercase font-poppins font-medium text-base text-white hover:opacity-95 mt-5 transition-transform duration-200 transform hover:scale-90 ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
