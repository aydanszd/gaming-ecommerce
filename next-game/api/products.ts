import axios from 'axios';
import { Product, TabType } from '../types/Products';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }//əgər istifadəçi login olubsa, hər request-ə token əlavə et”
    return config;
});

export const productsApi = {
    getAll: async (): Promise<Product[]> => {
        const response = await api.get('/api/products');
        return response.data;
    },
    
    getByTab: async (tab: TabType): Promise<Product[]> => {
        let endpoint = '/api/products';
        
        switch (tab.toLowerCase()) {
            case 'bestseller':
            case 'best-seller':
            case 'best seller':
                endpoint = '/api/products/best-sellers';
                break;
            case 'newarrivals':
            case 'new-arrivals':
            case 'new arrivals':
                endpoint = '/api/products/new-arrivals';
                break;
            case 'onsale':
            case 'on-sale':
            case 'on sale':
                endpoint = '/api/products/on-sale';
                break;
            default:
                endpoint = '/api/products';
        }

        console.log('Fetching from endpoint:', endpoint); 
        const response = await api.get(endpoint);
        console.log('Response data:', response.data); 
        return response.data;
    },

    getById: async (id: string): Promise<Product> => {
        const response = await api.get(`/api/products/${id}`);
        return response.data;
    },

    getByCategory: async (category: string): Promise<Product[]> => {
        const response = await api.get(`/api/products/category/${category}`);
        return response.data;
    }
};

export const cartApi = {
    addToCart: async (productId: string, quantity: number, token: string) => {
        const response = await api.post('/api/cart/add', 
            { productId, quantity },
            { headers: { Authorization: `Bearer ${token}` }}
        );
        return response.data;
    },
    
    getCart: async (token: string) => {
        const response = await api.get('/api/cart', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },
    
    updateCartItem: async (productId: string, quantity: number, token: string) => {
        const response = await api.put(`/api/cart/update/${productId}`, 
            { quantity },
            { headers: { Authorization: `Bearer ${token}` }}
        );
        return response.data;
    },
    
    removeFromCart: async (productId: string, token: string) => {
        const response = await api.delete(`/api/cart/remove/${productId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    clearCart: async (token: string) => {
        const response = await api.delete('/api/cart/clear', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
};

export const authApi = {
    login: async (email: string, password: string) => {
        const response = await api.post('/api/auth/login', { email, password });
        return response.data;
    },
    
    register: async (name: string, email: string, password: string) => {
        const response = await api.post('/api/auth/register', { name, email, password });
        return response.data;
    },
    
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
    
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },
    
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};