import { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    icon?: ReactNode;
    children: ReactNode;
}

export const Button = ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    icon,
    children,
    className = '',
    disabled,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={`btn btn-${variant} btn-${size} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="btn-spinner"></span>
            ) : (
                <>
                    {icon && <span className="btn-icon">{icon}</span>}
                    {children}
                </>
            )}
        </button>
    );
};
