import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, Link as LinkIcon, BarChart3, Home } from 'lucide-react';
import { Button } from '../ui/Button';
import './Navbar.css';

export const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <LinkIcon size={28} />
                    <span className="gradient-text">URL Shortener</span>
                </Link>

                <div className="navbar-menu">
                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard" className="navbar-link">
                                <Home size={20} />
                                <span>Dashboard</span>
                            </Link>
                            <Link to="/my-urls" className="navbar-link">
                                <LinkIcon size={20} />
                                <span>My URLs</span>
                            </Link>
                            <Link to="/analytics" className="navbar-link">
                                <BarChart3 size={20} />
                                <span>Analytics</span>
                            </Link>
                            <div className="navbar-user">
                                <span className="navbar-username">{user?.username}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleLogout}
                                    icon={<LogOut size={18} />}
                                >
                                    Logout
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button variant="ghost" size="sm">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="primary" size="sm">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
