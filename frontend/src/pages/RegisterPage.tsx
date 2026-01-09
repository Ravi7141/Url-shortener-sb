import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import './AuthPages.css';

export const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            await register({ username, email, password });
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
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
                            <UserPlus size={48} className="auth-icon" />
                            <h1 className="auth-title">Create Account</h1>
                            <p className="auth-subtitle">Sign up to start shortening URLs</p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            <Input
                                type="text"
                                label="Username"
                                placeholder="Choose a username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                icon={<User size={20} />}
                                error={errors.username}
                                required
                            />

                            <Input
                                type="email"
                                label="Email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                icon={<Mail size={20} />}
                                error={errors.email}
                                required
                            />

                            <Input
                                type="password"
                                label="Password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                icon={<Lock size={20} />}
                                error={errors.password}
                                required
                            />

                            <Input
                                type="password"
                                label="Confirm Password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                icon={<Lock size={20} />}
                                error={errors.confirmPassword}
                                required
                            />

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                isLoading={isLoading}
                                className="auth-submit"
                            >
                                Create Account
                            </Button>
                        </form>

                        <div className="auth-footer">
                            <p>
                                Already have an account?{' '}
                                <Link to="/login" className="auth-link">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};
