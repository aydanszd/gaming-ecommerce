import React, { useState } from 'react';
import { X, Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types/Products';

interface ProductModalProps {
    product: Product;
    isLoggedIn: boolean;
    onClose: () => void;
    onAddToCart: (e: React.MouseEvent, product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
    product,
    isLoggedIn,
    onClose,
    onAddToCart
}) => {
    const [quantity, setQuantity] = useState<number>(1);

    const getTotalPrice = (): string => {
        const price = product.isOnSale && product.salePrice 
            ? product.salePrice 
            : product.price;
        return (price * quantity).toFixed(2);
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <div 
                className="relative bg-[#1a1a2e] rounded-3xl max-w-4xl w-full overflow-hidden border border-yellow-400/30 shadow-[0_0_50px_rgba(250,204,21,0.3)]"
                onClick={(e) => e.stopPropagation()}
                style={{
                    animation: 'modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
            >
                <style>{`
                    @keyframes modalSlideIn {
                        from {
                            opacity: 0;
                            transform: scale(0.8) translateY(50px);
                        }
                        to {
                            opacity: 1;
                            transform: scale(1) translateY(0);
                        }
                    }
                `}</style>

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 w-12 h-12 bg-[#0a0a14]/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:border-[#ff6b9d] hover:bg-[#ff6b9d]/20 transition-all duration-300 hover:rotate-90"
                >
                    <X className="w-6 h-6 text-white" />
                </button>

                <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative aspect-square md:aspect-auto bg-[#0a0a14]">
                        <img
                            src={product.image || 'https://placehold.co/600x800/1a1a2e/facc15?text=No+Image'}
                            alt={product.name}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://placehold.co/600x800/1a1a2e/facc15?text=No+Image';
                            }}
                            className="w-full h-full object-cover"
                        />
                        
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {product.isBestSeller && (
                                <span className="bg-yellow-400 text-[#0a0a14] px-4 py-2 rounded-full text-sm font-bold">
                                    BEST SELLER
                                </span>
                            )}
                            {product.isNewArrival && (
                                <span className="bg-[#10B981] text-white px-4 py-2 rounded-full text-sm font-bold">
                                    NEW ARRIVAL
                                </span>
                            )}
                            {product.isOnSale && product.discount && product.discount > 0 && (
                                <span className="bg-[#ff6b9d] text-white px-4 py-2 rounded-full text-sm font-bold">
                                    SAVE {product.discount}%
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="p-8 md:p-10 flex flex-col justify-between">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                {product.title || product.name}
                            </h2>

                            <p className="text-gray-300 text-base leading-relaxed mb-6">
                                {product.description}
                            </p>

                            <div className="flex items-baseline gap-4 mb-6">
                                {product.isOnSale && product.salePrice ? (
                                    <>
                                        <span className="text-gray-500 line-through text-2xl">
                                            ${product.price}
                                        </span>
                                        <span className="text-[#ff6b9d] font-bold text-4xl">
                                            ${product.salePrice}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-white font-bold text-4xl">
                                        ${product.price}
                                    </span>
                                )}
                            </div>

                            <div className="mb-6">
                                <p className="text-gray-400 text-sm mb-3 uppercase tracking-wider">Quantity</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-3 bg-[#0a0a14] rounded-xl border border-white/20 p-2">
                                        <button
                                            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                            className="w-10 h-10 rounded-lg bg-[#1a1a2e] hover:bg-yellow-400 hover:text-[#0a0a14] text-white font-bold transition-all duration-300 flex items-center justify-center hover:scale-110"
                                        >
                                            −
                                        </button>
                                        <span className="text-white font-bold text-2xl w-12 text-center">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => setQuantity(prev => prev + 1)}
                                            className="w-10 h-10 rounded-lg bg-[#1a1a2e] hover:bg-yellow-400 hover:text-[#0a0a14] text-white font-bold transition-all duration-300 flex items-center justify-center hover:scale-110"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-400 text-sm">Total Price</p>
                                        <p className="text-yellow-400 font-bold text-3xl">
                                            ${getTotalPrice()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {product.color && (
                                <div className="mb-8">
                                    <p className="text-gray-400 text-sm mb-3 uppercase tracking-wider">Color</p>
                                    <div className="flex gap-3">
                                        <div
                                            className="w-10 h-10 rounded-full border-2 border-yellow-400 shadow-lg"
                                            style={{ backgroundColor: product.color }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4">
                            {isLoggedIn ? (
                                <>
                                    <button 
                                        onClick={(e) => onAddToCart(e, product, quantity)}
                                        className="flex-1 text-[#0a0a14] font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[0_0_30px_rgba(250,204,21,0.5)]"
                                        style={{ background: 'linear-gradient(to right, #facc15, #eab308)' }}
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        Add to Cart
                                    </button>
                                    <button className="w-14 h-14 bg-[#0a0a14] backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 hover:border-[#ff6b9d] hover:bg-[#ff6b9d]/20 transition-all duration-300">
                                        <Heart className="w-6 h-6 text-white" />
                                    </button>
                                </>
                            ) : (
                                <button 
                                    onClick={() => window.location.href = '/Login'}
                                    className="flex-1 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg"
                                    style={{ background: 'linear-gradient(to right, #ff6b9d, #ff8888)' }}
                                >
                                    Login to Purchase
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};