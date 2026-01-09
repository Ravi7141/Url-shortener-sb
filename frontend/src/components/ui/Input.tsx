import { InputHTMLAttributes, ReactNode } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: ReactNode;
}

export const Input = ({
    label,
    error,
    icon,
    className = '',
    ...props
}: InputProps) => {
    return (
        <div className="input-wrapper">
            {label && <label className="input-label">{label}</label>}
            <div className="input-container">
                {icon && <span className="input-icon">{icon}</span>}
                <input
                    className={`input ${icon ? 'input-with-icon' : ''} ${error ? 'input-error' : ''} ${className}`}
                    {...props}
                />
            </div>
            {error && <span className="input-error-message">{error}</span>}
        </div>
    );
};
