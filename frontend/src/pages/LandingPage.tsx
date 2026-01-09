import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Shield, BarChart3, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import './LandingPage.css';

export const LandingPage = () => {
    const features = [
        {
            icon: <Zap size={40} />,
            title: 'Lightning Fast',
            description: 'Generate short URLs in milliseconds with our optimized backend',
        },
        {
            icon: <Shield size={40} />,
            title: 'Secure & Private',
            description: 'Your data is protected with JWT authentication and encryption',
        },
        {
            icon: <BarChart3 size={40} />,
            title: 'Advanced Analytics',
            description: 'Track clicks, analyze trends, and gain insights into your links',
        },
    ];

    return (
        <div className="landing-page">
            <div className="landing-content">
                <motion.div
                    className="hero-section"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="hero-title">
                        Shorten Your URLs,
                        <br />
                        <span className="gradient-text">Amplify Your Reach</span>
                    </h1>
                    <p className="hero-description">
                        Create short, memorable links in seconds. Track performance with powerful analytics.
                        Perfect for marketers, developers, and businesses.
                    </p>
                    <div className="hero-actions">
                        <Link to="/register">
                            <Button size="lg" icon={<ArrowRight size={20} />}>
                                Get Started Free
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="secondary" size="lg">
                                Sign In
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    className="features-section"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <h2 className="section-title">Why Choose Us?</h2>
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                            >
                                <Card className="feature-card">
                                    <div className="feature-icon">{feature.icon}</div>
                                    <h3 className="feature-title">{feature.title}</h3>
                                    <p className="feature-description">{feature.description}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="cta-section"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <Card className="cta-card">
                        <h2 className="cta-title">Ready to Get Started?</h2>
                        <p className="cta-description">
                            Join thousands of users who trust our platform for their URL shortening needs.
                        </p>
                        <Link to="/register">
                            <Button size="lg" icon={<ArrowRight size={20} />}>
                                Create Your Account
                            </Button>
                        </Link>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};
