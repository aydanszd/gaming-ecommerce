import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types/Products';

interface ProductCardProps {
    product: Product;
    isLoggedIn: boolean;
    onProductClick: (product: Product) => void;
    onAddToCart: (e: React.MouseEvent, product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    isLoggedIn,
    onProductClick,
    onAddToCart
}) => {
    return (
        <div
            onClick={() => onProductClick(product)}
            className="group relative bg-[#1a1a2e] rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(250,204,21,0.2)] cursor-pointer"
        >
            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.isBestSeller && (
                    <span className="bg-yellow-400 text-[#0a0a14] px-3 py-1 rounded-full text-xs font-bold">
                        BEST SELLER
                    </span>
                )}
                {product.isNewArrival && (
                    <span className="bg-[#10B981] text-white px-3 py-1 rounded-full text-xs font-bold">
                        NEW
                    </span>
                )}
                {product.isOnSale && product.discount && product.discount > 0 && (
                    <span className="bg-[#ff6b9d] text-white px-3 py-1 rounded-full text-xs font-bold">
                        -{product.discount}%
                    </span>
                )}
            </div>

            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    if (!isLoggedIn) {
                        window.location.href = '/Login';
                    }
                }}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#0a0a14]/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:border-[#ff6b9d] hover:bg-[#ff6b9d]/20 transition-all duration-300"
            >
                <Heart className="w-5 h-5 text-white" />
            </button>

            <div className="relative overflow-hidden bg-[#0a0a14]" style={{ aspectRatio: '3/4' }}>
                <img
                    src={product.image || 'https://placehold.co/400x600/1a1a2e/facc15?text=No+Image'}
                    alt={product.name}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/400x600/1a1a2e/facc15?text=No+Image';
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {isLoggedIn && (
                    <div 
                        className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'linear-gradient(to top, #0a0a14, transparent)' }}
                    >
                        <button 
                            onClick={(e) => onAddToCart(e, product)}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-[#0a0a14] font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            Add to Cart
                        </button>
                    </div>
                )}

                {!isLoggedIn && (
                    <div 
                        className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'linear-gradient(to top, #0a0a14, transparent)' }}
                    >
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                window.location.href = '/Login';
                            }}
                            className="w-full bg-[#ff6b9d] hover:bg-[#ff8888] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
                        >
                            Login to Purchase
                        </button>
                    </div>
                )}
            </div>

            <div className="p-4">
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-yellow-400 transition-colors">
                    {product.title || product.name}
                </h3>

                <div className="flex items-center gap-3 mb-3">
                    {product.isOnSale && product.salePrice ? (
                        <>
                            <span className="text-gray-500 line-through text-sm">
                                ${product.price}
                            </span>
                            <span className="text-[#ff6b9d] font-bold text-xl">
                                ${product.salePrice}
                            </span>
                        </>
                    ) : (
                        <span className="text-white font-bold text-xl">
                            ${product.price}
                        </span>
                    )}
                </div>

                {product.color && (
                    <div className="flex gap-2">
                        <div
                            className="w-6 h-6 rounded-full border-2 border-white/30"
                            style={{ backgroundColor: product.color }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};