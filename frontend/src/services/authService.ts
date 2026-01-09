import api from './api';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

// Backend only returns token in JwtAuthenticationResponse
export interface AuthResponse {
    token: string;
}

export const authService = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await api.post('/api/auth/public/login', credentials);
        return response.data;
    },

    register: async (userData: RegisterRequest): Promise<string> => {
        const response = await api.post('/api/auth/public/register', userData);
        return response.data;
    },
};
