import { Copy, ExternalLink, Calendar, MousePointerClick } from 'lucide-react';
import type { UrlMappingDTO } from '../../services/urlService';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import './UrlCard.css';

interface UrlCardProps {
    url: UrlMappingDTO;
}

export const UrlCard = ({ url }: UrlCardProps) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
    const shortUrl = `${baseUrl}/${url.shortUrl}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            toast.success('Copied to clipboard!');
        } catch (error) {
            toast.error('Failed to copy');
        }
    };

    const formattedDate = format(new Date(url.createdDate), 'MMM dd, yyyy');

    return (
        <Card className="url-card">
            <div className="url-card-header">
                <div className="url-info">
                    <div className="url-original">
                        <span className="url-label">Original:</span>
                        <a
                            href={url.originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="url-link"
                        >
                            {url.originalUrl.length > 50
                                ? url.originalUrl.substring(0, 50) + '...'
                                : url.originalUrl}
                            <ExternalLink size={14} />
                        </a>
                    </div>
                    <div className="url-short">
                        <span className="url-label">Short:</span>
                        <a
                            href={shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="url-link short-link"
                        >
                            {shortUrl}
                            <ExternalLink size={14} />
                        </a>
                    </div>
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleCopy}
                    icon={<Copy size={16} />}
                    className="copy-btn"
                >
                    Copy
                </Button>
            </div>

            <div className="url-card-footer">
                <div className="url-stat">
                    <MousePointerClick size={16} />
                    <span>{url.clickCount} clicks</span>
                </div>
                <div className="url-stat">
                    <Calendar size={16} />
                    <span>{formattedDate}</span>
                </div>
            </div>
        </Card>
    );
};
