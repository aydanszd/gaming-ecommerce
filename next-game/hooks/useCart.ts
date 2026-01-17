import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Product } from '../types/Products';
import { cartApi } from '../api/products';

export const useCart = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const addToCart = async (product: Product, quantity: number) => {
        if (!isLoggedIn) {
            window.location.href = '/Login';
            return;
        }

        const token = localStorage.getItem('token');
        
        if (!token) return;
        
        try {
            const data = await cartApi.addToCart(product._id, quantity, token);
            console.log('Cart updated:', data);
            window.dispatchEvent(new Event('storage'));
            
            toast.success(
                `${product.title || product.name} x${quantity} added to cart! 🛒`,
                {
                    duration: 3000,
                    position: 'top-right',
                    style: {
                        background: '#1a1a2e',
                        color: '#fff',
                        border: '2px solid #00d9ff',
                        borderRadius: '12px',
                        padding: '16px',
                        boxShadow: '0 0 30px rgba(0, 217, 255, 0.3)',
                    },
                    iconTheme: {
                        primary: '#00d9ff',
                        secondary: '#1a1a2e',
                    },
                }
            );
        } catch (error) {
            console.error('Backend cart error:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to add to cart', {
                duration: 3000,
                position: 'top-right',
                style: {
                    background: '#ff6b9d',
                    color: '#fff',
                },
            });
        }
    };

    return { isLoggedIn, addToCart };
};