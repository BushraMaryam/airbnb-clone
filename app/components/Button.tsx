'use client';

import React from 'react';
import { IconType } from 'react-icons/lib';

interface ButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    label: string | JSX.Element;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    label,
    disabled,
    outline,
    small,
    icon: Icon,
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`relative disalbed disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${
                outline
                    ? 'bg-white border-black text-black'
                    : 'bg-rose-500 border-rose-500 text-white'
            }  ${
                small
                    ? 'py-1 text-sm font-light border-[1px]'
                    : 'py-3 text-base font-semibold border-[2px]'
            }`}
        >
            {Icon && <Icon size={24} className="absolute left-4 top-3" />}
            {label}
        </button>
    );
};

export default Button;
