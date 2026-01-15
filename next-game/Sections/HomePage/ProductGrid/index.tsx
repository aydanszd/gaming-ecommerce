'use client';

import { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';

const products = [
    {
        id: 1,
        name: "Cyberpunk 2077",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&h=600&fit=crop",
        discount: null,
        colors: ['#ff0080', '#00d9ff', '#000000']
    },
    {
        id: 2,
        name: "The Last of Us Part II",
        price: 39.99,
        originalPrice: 59.99,
        image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=500&h=600&fit=crop",
        discount: 33,
        colors: ['#8b4513', '#ff6b9d', '#ffffff'],
        countdown: { days: 8, hours: 9, minutes: 35, seconds: 55 }
    },
    {
        id: 3,
        name: "God of War Ragnarök",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500&h=600&fit=crop",
        discount: null,
        colors: ['#ffffff', '#a855f7', '#000000']
    },
    {
        id: 4,
        name: "Elden Ring",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=600&fit=crop",
        discount: null,
        colors: ['#ffffff', '#ff6b9d', '#000000']
    },
    {
        id: 5,
        name: "Horizon Forbidden West",
        price: 54.99,
        image: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=500&h=600&fit=crop",
        discount: null,
        colors: ['#00d9ff', '#ff0080', '#000000']
    },
    {
        id: 6,
        name: "Spider-Man Miles Morales",
        price: 44.99,
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&h=600&fit=crop",
        discount: null,
        colors: ['#ff0000', '#000000', '#ffffff']
    },
    {
        id: 7,
        name: "Resident Evil Village",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?w=500&h=600&fit=crop",
        discount: null,
        colors: ['#8b0000', '#ffffff', '#000000']
    },
    {
        id: 8,
        name: "FIFA 24",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=600&fit=crop",
        discount: null,
        colors: ['#00ff00', '#0000ff', '#ffffff']
    }
];

export default function GameProductsSection() {
    const [activeTab, setActiveTab] = useState('bestseller');

    return (
        <section className="w-full bg-[#0a0a14] py-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00d9ff]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ff6b9d]/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                {/* Tabs */}
                <div className="flex justify-center gap-12 mb-16">
                    <button
                        onClick={() => setActiveTab('bestseller')}
                        className={`text-xl font-bold pb-3 transition-all duration-300 relative ${activeTab === 'bestseller'
                                ? 'text-white'
                                : 'text-gray-500 hover:text-gray-300'
                            }`}
                        style={{ fontFamily: 'Orbitron, sans-serif' }}
                    >
                        Best seller
                        {activeTab === 'bestseller' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00d9ff] to-[#ff6b9d]" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('newarrivals')}
                        className={`text-xl font-bold pb-3 transition-all duration-300 relative ${activeTab === 'newarrivals'
                                ? 'text-white'
                                : 'text-gray-500 hover:text-gray-300'
                            }`}
                        style={{ fontFamily: 'Orbitron, sans-serif' }}
                    >
                        New arrivals
                        {activeTab === 'newarrivals' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00d9ff] to-[#ff6b9d]" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('onsale')}
                        className={`text-xl font-bold pb-3 transition-all duration-300 relative ${activeTab === 'onsale'
                                ? 'text-white'
                                : 'text-gray-500 hover:text-gray-300'
                            }`}
                        style={{ fontFamily: 'Orbitron, sans-serif' }}
                    >
                        On Sale
                        {activeTab === 'onsale' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00d9ff] to-[#ff6b9d]" />
                        )}
                    </button>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group relative bg-[#1a1a2e] rounded-2xl overflow-hidden border border-[#ffffff]/10 hover:border-[#00d9ff]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,217,255,0.2)]"
                        >
                            {/* Discount Badge */}
                            {product.discount && (
                                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-[#ff6b9d] to-[#ff0080] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                    -{product.discount}%
                                </div>
                            )}

                            {/* Wishlist Button */}
                            <button className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#0a0a14]/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-[#ffffff]/20 hover:border-[#ff6b9d] hover:bg-[#ff6b9d]/20 transition-all duration-300">
                                <Heart className="w-5 h-5 text-white" />
                            </button>

                            {/* Product Image */}
                            <div className="relative aspect-[3/4] overflow-hidden bg-[#0a0a14]">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                {/* Countdown Timer */}
                                {product.countdown && (
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#0a0a14]/90 backdrop-blur-md px-4 py-2 rounded-full border border-[#ff6b9d]/30">
                                        <div className="text-[#ff6b9d] text-xs font-bold font-mono">
                                            {product.countdown.days}d : {product.countdown.hours}h : {product.countdown.minutes}m : {product.countdown.seconds}s
                                        </div>
                                    </div>
                                )}

                                {/* Quick Add to Cart - Shows on Hover */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0a14] to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button className="w-full bg-[#00d9ff] hover:bg-[#00b8e6] text-[#0a0a14] font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105">
                                        <ShoppingCart className="w-5 h-5" />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-4">
                                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#00d9ff] transition-colors" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                    {product.name}
                                </h3>

                                <div className="flex items-center gap-3 mb-3">
                                    {product.originalPrice && (
                                        <span className="text-gray-500 line-through text-sm">
                                            ${product.originalPrice}
                                        </span>
                                    )}
                                    <span className="text-white font-bold text-xl">
                                        ${product.price}
                                    </span>
                                </div>

                                {/* Color Options */}
                                <div className="flex gap-2">
                                    {product.colors.map((color, index) => (
                                        <button
                                            key={index}
                                            className="w-6 h-6 rounded-full border-2 border-[#ffffff]/30 hover:border-[#00d9ff] transition-all duration-300 hover:scale-110"
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}