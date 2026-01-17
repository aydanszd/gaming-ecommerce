'use client';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Product, TabType } from '../../../types/Products';
import { useProducts } from '../../../hooks/useProducts';
import { useCart } from '../../../hooks/useCart';
import { TabBar } from '../../../components/TabBar';
import { LoadingState, ErrorState } from '../../../components/LoadingState';
import { ProductCard } from '../../../components/ProductCard';
import { ProductModal } from '../../../components/ProductModal';

export default function GameProductsSection() {
    const [activeTab, setActiveTab] = useState<TabType>('bestseller');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    
    const { products, loading, error } = useProducts(activeTab);
    const { isLoggedIn, addToCart } = useCart();

    const handleAddToCart = async (e: React.MouseEvent, product: Product, quantity: number = 1) => {
        e.stopPropagation();
        await addToCart(product, quantity);
    };

    if (loading) return <LoadingState />;
    if (error) return <ErrorState error={error} />;

    return (
        <>
            <section className="w-full bg-[#0a0a14] py-20 relative overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                    <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

                    <div className="text-center mb-8">
                        <p className="text-gray-400">
                            Showing <span className="text-yellow-400 font-bold">{products.length}</span> products
                        </p>
                    </div>

                    {products.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-400 text-xl">No products found in this category</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                isLoggedIn={isLoggedIn}
                                onProductClick={setSelectedProduct}
                                onAddToCart={(e, p) => handleAddToCart(e, p, 1)}
                            />
                        ))}
                    </div>

                    {selectedProduct && (
                        <ProductModal
                            product={selectedProduct}
                            isLoggedIn={isLoggedIn}
                            onClose={() => setSelectedProduct(null)}
                            onAddToCart={handleAddToCart}
                        />
                    )}
                </div>
            </section>
            
            <Toaster />
        </>
    );
}