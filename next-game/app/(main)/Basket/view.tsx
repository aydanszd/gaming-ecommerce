'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Check } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

type CartItem = {
    _id: string;
    product?: {
        _id: string;
        name: string;
        title?: string;
        price: number;
        image: string;
    };
    title?: string;
    name: string;
    description?: string;
    price: number;
    color?: string;
    image: string;
    quantity: number;
};

const shippingOptions = [
    { id: 'standard', label: 'Standard Shipping (5-7 days)', cost: 10 },
    { id: 'express', label: 'Express Shipping (2-3 days)', cost: 25 },
    { id: 'overnight', label: 'Overnight Delivery', cost: 40 },
];

export default function BasketPage() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [useBackend, setUseBackend] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    // Protected Route - Login yoxlamasi
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
                // Login olmayibsa, Login sehifesine yonlendir
                toast.error('Please login to view your basket', {
                    duration: 2000,
                    position: 'top-center',
                });
                router.push('/Login');
                return false;
            }
            
            setIsLoggedIn(true);
            setUseBackend(true);
            setIsChecking(false);
            return true;
        };

        if (checkAuth()) {
            loadCartItems(true);
        }
    }, [router]);

    const loadCartItems = async (hasToken: boolean) => {
        setLoading(true);
        try {
            if (hasToken) {
                await loadBackendCart();
            } else {
                loadLocalStorageCart();
            }
        } catch (error) {
            console.error('Error loading cart:', error);
            loadLocalStorageCart();
        } finally {
            setLoading(false);
        }
    };

    const loadBackendCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch('http://localhost:5000/api/cart', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to load cart');
            }

            const data = await response.json();
            console.log('✅ Backend cart loaded:', data);

            const formattedItems = data.items?.map((item: any) => ({
                _id: item.product?._id || item._id,
                product: item.product,
                name: item.product?.name || item.name || 'Unknown',
                title: item.product?.title || item.title,
                price: item.price,
                image: item.product?.image || item.image || '',
                quantity: item.quantity,
                color: item.color,
                description: item.description
            })) || [];

            setCartItems(formattedItems);
        } catch (error) {
            console.error('❌ Backend cart error:', error);
            loadLocalStorageCart();
        }
    };

    const loadLocalStorageCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(cart);
    };

    const updateQuantity = async (id: string, delta: number) => {
        const item = cartItems.find(item => item._id === id);
        if (!item) return;
        
        const newQuantity = Math.max(1, item.quantity + delta);

        if (useBackend) {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const productId = item.product?._id || item._id;
                
                const response = await fetch(`http://localhost:5000/api/cart/update/${productId}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        quantity: newQuantity 
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to update quantity');
                }

                const data = await response.json();
                console.log('✅ Quantity updated:', data);
                
                await loadBackendCart();
                
                toast.success('Quantity updated', {
                    duration: 1500,
                    position: 'top-right',
                    style: {
                        background: '#1a1a2e',
                        color: '#fff',
                        border: '2px solid #facc15',
                        borderRadius: '12px',
                        padding: '12px',
                    },
                });
            } catch (error) {
                console.error('❌ Update quantity error:', error);
                toast.error(error instanceof Error ? error.message : 'Failed to update quantity');
            }
        } else {
            const updatedCart = cartItems.map(item => 
                item._id === id 
                    ? { ...item, quantity: newQuantity }
                    : item
            );
            setCartItems(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            window.dispatchEvent(new Event('storage'));
            
            toast.success('Quantity updated', {
                duration: 1500,
                position: 'top-right',
                style: {
                    background: '#1a1a2e',
                    color: '#fff',
                    border: '2px solid #facc15',
                    borderRadius: '12px',
                    padding: '12px',
                },
            });
        }
    };

    const removeItem = async (id: string, name: string) => {
        if (useBackend) {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const item = cartItems.find(item => item._id === id);
                const productId = item?.product?._id || id;
                
                const response = await fetch(`http://localhost:5000/api/cart/remove/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to remove item');
                }

                console.log('✅ Item removed from backend');
                await loadBackendCart();
                
                toast.success(`${name} removed from cart`, {
                    duration: 2000,
                    position: 'top-right',
                    style: {
                        background: '#1a1a2e',
                        color: '#fff',
                        border: '2px solid #ff6b9d',
                        borderRadius: '12px',
                        padding: '16px',
                    },
                });
            } catch (error) {
                console.error('❌ Remove item error:', error);
                toast.error('Failed to remove item');
            }
        } else {
            const updatedCart = cartItems.filter(item => item._id !== id);
            setCartItems(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            window.dispatchEvent(new Event('storage'));
            
            toast.success(`${name} removed from cart`, {
                duration: 2000,
                position: 'top-right',
                style: {
                    background: '#1a1a2e',
                    color: '#fff',
                    border: '2px solid #ff6b9d',
                    borderRadius: '12px',
                    padding: '16px',
                },
            });
        }
    };

    const applyPromoCode = () => {
        if (promoCode.trim().toUpperCase() === 'GAME20') {
            setDiscount(20);
            toast.success('Promo code applied! $20 discount', {
                duration: 3000,
                position: 'top-right',
                style: {
                    background: '#1a1a2e',
                    color: '#fff',
                    border: '2px solid #facc15',
                    borderRadius: '12px',
                    padding: '16px',
                },
                icon: '🎉',
            });
        } else {
            setDiscount(0);
            toast.error('Invalid promo code', {
                duration: 2000,
                position: 'top-right',
            });
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + selectedShipping.cost - discount;
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleCheckout = () => {
        toast.success('Proceeding to checkout...', {
            duration: 2000,
            position: 'top-center',
            icon: '🚀',
        });
    };
    if (isChecking || loading) {
        return (
            <div className="min-h-screen bg-[#0a0a14] text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-300 mx-auto mb-4"></div>
                    <p className="text-gray-400">{isChecking ? 'Checking authentication...' : 'Loading cart...'}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-[#0a0a14] text-white">
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
                    <div 
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(250,204,21,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(250,204,21,0.1) 1px, transparent 1px)
                            `,
                            backgroundSize: '60px 60px',
                        }}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                    <div className="mb-8">
                        <button 
                            onClick={() => router.push('/')}
                            className="flex items-center gap-2 text-gray-400 hover:text-yellow-300 transition-colors mb-4"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Continue Shopping
                        </button>
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-yellow-300 to-amber-400">
                                    Shopping Basket
                                </h1>
                                <p className="text-gray-400 mt-2">{totalItems} items in your cart</p>
                            </div>
                        </div>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-32 h-32 bg-[#1a1a2e] rounded-full flex items-center justify-center mb-6 border-2 border-white/10">
                                <ShoppingBag className="w-16 h-16 text-gray-500" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Your basket is empty</h2>
                            <p className="text-gray-400 mb-6">Add some products to get started</p>
                            <button 
                                onClick={() => router.push('/')}
                                className="px-8 py-3 bg-linear-to-r from-yellow-400 to-amber-500 rounded-xl font-bold hover:shadow-lg hover:shadow-yellow-400/30 transition-all text-gray-900"
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-4">
                                {cartItems.map((item) => (
                                    <div 
                                        key={item._id}
                                        className="bg-[#1a1a2e] rounded-2xl p-6 border border-white/10 hover:border-yellow-400/30 transition-all"
                                    >
                                        <div className="flex gap-4">
                                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-[#0a0a14] shrink-0">
                                                <img 
                                                    src={item.image || 'https://placehold.co/200x200/1a1a2e/facc15?text=No+Image'}
                                                    alt={item.title || item.name}
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = 'https://placehold.co/200x200/1a1a2e/facc15?text=No+Image';
                                                    }}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-bold text-white mb-1 truncate">
                                                            {item.title || item.name}
                                                        </h3>
                                                        {item.description && (
                                                            <p className="text-sm text-gray-400 line-clamp-2">
                                                                {item.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item._id, item.title || item.name)}
                                                        className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>

                                                {item.color && (
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <span className="text-sm text-gray-400">Color:</span>
                                                        <div 
                                                            className="w-6 h-6 rounded-full border-2 border-white/30"
                                                            style={{ backgroundColor: item.color }}
                                                        />
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-between mt-4">
                                                    <div className="flex items-center gap-3 bg-[#0a0a14] rounded-lg p-1 border border-white/10">
                                                        <button
                                                            onClick={() => updateQuantity(item._id, -1)}
                                                            disabled={item.quantity <= 1}
                                                            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-yellow-400/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item._id, 1)}
                                                            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-yellow-400/20 transition-colors"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-2xl font-bold text-yellow-300">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </p>
                                                        <p className="text-xs text-gray-400">
                                                            ${item.price.toFixed(2)} each
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="lg:col-span-1">
                                <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-white/10 sticky top-4">
                                    <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">
                                        Order Summary
                                    </h2>

                                    <div className="mb-6">
                                        <label className="text-sm text-gray-400 mb-3 block">Shipping Method</label>
                                        <div className="space-y-2">
                                            {shippingOptions.map((option) => (
                                                <button
                                                    key={option.id}
                                                    onClick={() => setSelectedShipping(option)}
                                                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                                                        selectedShipping.id === option.id
                                                            ? 'border-yellow-400 bg-yellow-400/10'
                                                            : 'border-white/10 hover:border-white/20'
                                                    }`}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                                                selectedShipping.id === option.id
                                                                    ? 'border-yellow-400'
                                                                    : 'border-white/30'
                                                            }`}>
                                                                {selectedShipping.id === option.id && (
                                                                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                                                                )}
                                                            </div>
                                                            <span className="text-sm">{option.label}</span>
                                                        </div>
                                                        <span className="font-bold">${option.cost}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="text-sm text-gray-400 mb-2 block">Promo Code</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value)}
                                                placeholder="GAME20"
                                                className="flex-1 bg-[#0a0a14] border border-white/10 rounded-lg px-4 py-2 focus:border-yellow-400 focus:outline-none transition-colors"
                                            />
                                            <button
                                                onClick={applyPromoCode}
                                                className="px-4 py-2 bg-yellow-400/20 hover:bg-yellow-400/30 border border-yellow-400/50 rounded-lg font-bold transition-all"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                        {discount > 0 && (
                                            <p className="text-green-400 text-xs mt-2 flex items-center gap-1">
                                                <Check className="w-4 h-4" />
                                                Discount applied: -${discount}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Subtotal ({totalItems} items)</span>
                                            <span className="font-bold">${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Shipping</span>
                                            <span className="font-bold">${selectedShipping.cost.toFixed(2)}</span>
                                        </div>
                                        {discount > 0 && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-400">Discount</span>
                                                <span className="font-bold text-green-400">-${discount.toFixed(2)}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-lg font-bold">Total</span>
                                        <span className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-yellow-300 to-amber-400">
                                            ${total.toFixed(2)}
                                        </span>
                                    </div>

                                    <button
                                        onClick={handleCheckout}
                                        className="w-full py-4 bg-linear-to-r from-yellow-400 to-amber-500 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-yellow-400/30 transition-all transform hover:scale-105 text-gray-900"
                                    >
                                        Proceed to Checkout
                                    </button>
                                    <p className="text-xs text-gray-500 text-center mt-4">
                                        Secure checkout powered by Stripe
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <Toaster />
        </>
    );
}