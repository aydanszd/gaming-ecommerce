import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product, TabType } from '../types/Products';

export const useProducts = (activeTab: TabType) => {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get<Product[]>(
                    'http://localhost:5000/api/products'
                );
                setAllProducts(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching products:', err);
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data?.message || err.message);
                } else {
                    setError(err instanceof Error ? err.message : 'Unknown error');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    useEffect(() => {
        if (allProducts.length === 0) return;

        let filtered: Product[] = [];

        if (activeTab === 'bestseller') {
            filtered = allProducts.filter(p => p.isBestSeller === true);
        } else if (activeTab === 'newarrivals') {
            filtered = allProducts.filter(p => p.isNewArrival === true);
        } else if (activeTab === 'onsale') {
            filtered = allProducts.filter(p => p.isOnSale === true);
        }

        setProducts(filtered);
    }, [activeTab, allProducts]);

    return { products, loading, error };
};