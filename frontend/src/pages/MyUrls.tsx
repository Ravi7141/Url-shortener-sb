import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link2, Search } from 'lucide-react';
import { urlService } from '../services/urlService';
import type { UrlMappingDTO } from '../services/urlService';
import { UrlCard } from '../components/features/UrlCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Input } from '../components/ui/Input';
import toast from 'react-hot-toast';
import './MyUrls.css';

export const MyUrls = () => {
    const [urls, setUrls] = useState<UrlMappingDTO[]>([]);
    const [filteredUrls, setFilteredUrls] = useState<UrlMappingDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchUrls();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const filtered = urls.filter(
                (url) =>
                    url.originalUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    url.shortUrl.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredUrls(filtered);
        } else {
            setFilteredUrls(urls);
        }
    }, [searchQuery, urls]);

    const fetchUrls = async () => {
        try {
            const data = await urlService.getUserUrls();
            setUrls(data);
            setFilteredUrls(data);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch URLs';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div className="myurls-page">
            <div className="myurls-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="myurls-header"
                >
                    <div className="header-content">
                        <Link2 size={48} className="header-icon" />
                        <h1 className="myurls-title">
                            <span className="gradient-text">My URLs</span>
                        </h1>
                        <p className="myurls-subtitle">
                            Manage and track all your shortened URLs
                        </p>
                    </div>

                    {urls.length > 0 && (
                        <div className="search-container">
                            <Input
                                type="text"
                                placeholder="Search URLs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                icon={<Search size={20} />}
                            />
                        </div>
                    )}
                </motion.div>

                {filteredUrls.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="empty-state"
                    >
                        <Link2 size={64} className="empty-icon" />
                        <h2>No URLs Found</h2>
                        <p>
                            {searchQuery
                                ? 'No URLs match your search query'
                                : "You haven't created any short URLs yet"}
                        </p>
                        {!searchQuery && (
                            <a href="/dashboard" className="empty-link">
                                Create your first URL →
                            </a>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="urls-grid"
                    >
                        {filteredUrls.map((url, index) => (
                            <motion.div
                                key={url.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <UrlCard url={url} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {filteredUrls.length > 0 && (
                    <div className="urls-stats">
                        <p className="stats-text">
                            Showing {filteredUrls.length} of {urls.length} URL{urls.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
