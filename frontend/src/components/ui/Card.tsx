import { ReactNode } from 'react';
import './Card.css';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
}

export const Card = ({ children, className = '', hover = true, onClick }: CardProps) => {
    return (
        <div
            className={`card ${hover ? 'card-hover' : ''} ${onClick ? 'card-clickable' : ''} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};
