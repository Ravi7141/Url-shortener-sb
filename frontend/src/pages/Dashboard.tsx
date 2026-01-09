import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Link2, Copy, Check, ExternalLink } from 'lucide-react';
import { urlService } from '../services/urlService';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import toast from 'react-hot-toast';
import './Dashboard.css';

export const Dashboard = () => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!originalUrl) {
            toast.error('Please enter a URL');
            return;
        }

        // Basic URL validation
        try {
            new URL(originalUrl);
        } catch {
            toast.error('Please enter a valid URL');
            return;
        }

        setIsLoading(true);

        try {
            const result = await urlService.createShortUrl(originalUrl);
            const fullShortUrl = `${window.location.origin}/${result.shortUrl}`;
            setShortUrl(fullShortUrl);
            toast.success('Short URL created successfully!');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to create short URL';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            setCopied(true);
            toast.success('Copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            toast.error('Failed to copy');
        }
    };

    const handleReset = () => {
        setOriginalUrl('');
        setShortUrl('');
        setCopied(false);
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="dashboard-header"
                >
                    <h1 className="dashboard-title">
                        <span className="gradient-text">Shorten Your URL</span>
                    </h1>
                    <p className="dashboard-subtitle">
                        Create short, memorable links that are easy to share
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card className="url-shortener-card">
                        <form onSubmit={handleSubmit} className="url-form">
                            <Input
                                type="url"
                                label="Enter your long URL"
                                placeholder="https://example.com/very-long-url"
                                value={originalUrl}
                                onChange={(e) => setOriginalUrl(e.target.value)}
                                icon={<Link2 size={20} />}
                                required
                                disabled={!!shortUrl}
                            />

                            {!shortUrl ? (
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    isLoading={isLoading}
                                    className="shorten-button"
                                    icon={<Link2 size={20} />}
                                >
                                    Shorten URL
                                </Button>
                            ) : (
                                <div className="result-section">
                                    <div className="result-header">
                                        <h3 className="result-title">Your Short URL</h3>
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 200 }}
                                        >
                                            <Check size={24} className="success-icon" />
                                        </motion.div>
                                    </div>

                                    <div className="short-url-display">
                                        <a
                                            href={shortUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="short-url-link"
                                        >
                                            {shortUrl}
                                            <ExternalLink size={16} />
                                        </a>
                                    </div>

                                    <div className="result-actions">
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            onClick={handleCopy}
                                            icon={copied ? <Check size={20} /> : <Copy size={20} />}
                                            className="copy-button"
                                        >
                                            {copied ? 'Copied!' : 'Copy URL'}
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="lg"
                                            onClick={handleReset}
                                        >
                                            Create Another
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="quick-links"
                >
                    <Card className="quick-link-card" hover={true}>
                        <h3>View All URLs</h3>
                        <p>See all your shortened URLs and their statistics</p>
                        <a href="/my-urls">
                            <Button variant="ghost">Go to My URLs →</Button>
                        </a>
                    </Card>

                    <Card className="quick-link-card" hover={true}>
                        <h3>Analytics</h3>
                        <p>Track clicks and analyze your link performance</p>
                        <a href="/analytics">
                            <Button variant="ghost">View Analytics →</Button>
                        </a>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};
