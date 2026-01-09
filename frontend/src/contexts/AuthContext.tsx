import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../services/authService';
import toast from 'react-hot-toast';

interface User {
    username: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (credentials: LoginRequest) => Promise<void>;
    register: (userData: RegisterRequest) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for stored token on mount
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (credentials: LoginRequest) => {
        try {
            const response: AuthResponse = await authService.login(credentials);
            // Backend only returns token, so we use the username from credentials
            const userData: User = {
                username: credentials.username,
            };

            setToken(response.token);
            setUser(userData);

            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(userData));

            toast.success('Login successful!');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
            toast.error(errorMessage);
            throw error;
        }
    };

    const register = async (userData: RegisterRequest) => {
        try {
            await authService.register(userData);
            toast.success('Registration successful! Please login.');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
            toast.error(errorMessage);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success('Logged out successfully');
    };

    const value: AuthContextType = {
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!token,
        isLoading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
