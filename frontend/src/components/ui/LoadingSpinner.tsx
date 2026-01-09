import './LoadingSpinner.css';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner = ({ size = 'md' }: LoadingSpinnerProps) => {
    return (
        <div className={`spinner spinner-${size}`}>
            <div className="spinner-circle"></div>
        </div>
    );
};
