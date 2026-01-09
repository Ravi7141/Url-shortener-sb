import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import './AuthPages.css';

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await login({ username, password });
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="animated-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
            </div>

            <div className="auth-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="auth-card">
                        <div className="auth-header">
                            <LogIn size={48} className="auth-icon" />
                            <h1 className="auth-title">Welcome Back</h1>
                            <p className="auth-subtitle">Sign in to your account to continue</p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            <Input
                                type="text"
                                label="Username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                icon={<Mail size={20} />}
                                required
                            />

                            <Input
                                type="password"
                                label="Password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                icon={<Lock size={20} />}
                                required
                            />

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                isLoading={isLoading}
                                className="auth-submit"
                            >
                                Sign In
                            </Button>
                        </form>

                        <div className="auth-footer">
                            <p>
                                Don't have an account?{' '}
                                <Link to="/register" className="auth-link">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};
