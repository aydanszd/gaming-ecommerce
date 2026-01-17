import React, { useState, useEffect } from 'react';
import { TabType } from '../types/Products';

interface Product {
    _id: { $oid: string };
    name: string;
    title: string;
    description: string;
    price: number;
    color: string;
    image: string;
    category: string;
    inStock: boolean;
    stock: number;
    isBestSeller: boolean;
    isNewArrival: boolean;
    isOnSale: boolean;
    discount: number;
    salePrice: number | null;
}

interface TabBarProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
    const tabs: { id: TabType; label: string }[] = [
        { id: 'bestseller', label: 'Best seller' },
        { id: 'newarrivals', label: 'New arrivals' },
        { id: 'onsale', label: 'On Sale' }
    ];

    return (
        <div className="flex justify-center gap-12 mb-16">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`text-xl font-bold pb-3 transition-all duration-300 relative ${
                        activeTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                    }`}
                >
                    {tab.label}
                    {activeTab === tab.id && (
                        <div 
                            className="absolute bottom-0 left-0 right-0 h-0.5"
                            style={{ background: 'linear-gradient(to right, #facc15, #ff6b9d)' }}
                        />
                    )}
                </button>
            ))}
        </div>
    );
};
export const ProductsSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('bestseller');
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('YOUR_API_ENDPOINT');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);
    useEffect(() => {
        const filterProducts = () => {
            switch (activeTab) {
                case 'bestseller':
                    return products.filter(product => product.isBestSeller);
                case 'newarrivals':
                    return products.filter(product => product.isNewArrival);
                case 'onsale':
                    return products.filter(product => product.isOnSale);
                default:
                    return products;
            }
        };
        setFilteredProducts(filterProducts());
    }, [activeTab, products]);

    return (
        <div>
            <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                    <div key={product._id.$oid} className="product-card">
                        <img src={product.image} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};