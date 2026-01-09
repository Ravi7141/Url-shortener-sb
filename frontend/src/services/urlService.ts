import api from './api';

export interface UrlMappingDTO {
    id: number;
    originalUrl: string;
    shortUrl: string;
    clickCount: number;
    createdDate: string;  // Backend uses createdDate, not createdAt
    userName: string;
}

export interface ClickEventDTO {
    clickDate: string;
    clickCount: number;
}

export const urlService = {
    createShortUrl: async (originalUrl: string): Promise<UrlMappingDTO> => {
        const response = await api.post('/api/urls/shorten', { originalUrl });
        return response.data;
    },

    getUserUrls: async (): Promise<UrlMappingDTO[]> => {
        const response = await api.get('/api/urls/myurls');
        return response.data;
    },

    getUrlAnalytics: async (
        shortUrl: string,
        startDate: string,
        endDate: string
    ): Promise<ClickEventDTO[]> => {
        const response = await api.get(`/api/urls/analytics/${shortUrl}`, {
            params: { startDate, endDate },
        });
        return response.data;
    },

    getTotalClicks: async (
        startDate: string,
        endDate: string
    ): Promise<Record<string, number>> => {
        const response = await api.get('/api/urls/totalclicks', {
            params: { startDate, endDate },
        });
        return response.data;
    },
};
