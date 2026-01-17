'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Menu, X, Search, Gamepad2, Joystick, Headphones, Flame, LogOut } from 'lucide-react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [useBackend, setUseBackend] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            setIsLoggedIn(!!token);
            setUserName(user.username || '');
            setUseBackend(!!token);
        };

        const fetchBackendCart = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await fetch('http://localhost:5000/api/cart', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setCartCount(data.items?.length || 0);
                }
            } catch (error) {
                console.error('Error fetching cart:', error);
                updateLocalStorageCart();
            }
        };

        const updateLocalStorageCart = () => {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            setCartCount(cart.length);
        };

        checkAuth();
        
        if (useBackend) {
            fetchBackendCart();
        } else {
            updateLocalStorageCart();
        }

        const interval = setInterval(() => {
            if (useBackend) {
                fetchBackendCart();
            } else {
                updateLocalStorageCart();
            }
        }, 2000);

        const handleStorageChange = () => {
            checkAuth();
            if (!useBackend) {
                updateLocalStorageCart();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            clearInterval(interval);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [useBackend]);

    const handleLogout = () => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('http://localhost:5000/api/cart/clear', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).catch(err => console.error('Logout cart clear error:', err));
        }

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        
        setIsLoggedIn(false);
        setUserName('');
        setCartCount(0);
        
        window.location.href = '/';
    };

    return (
        <nav className="sticky top-0 z-50 bg-[rgba(10,10,20,0.95)] backdrop-blur-xl border-b-2 border-[rgba(255,193,7,0.3)] shadow-[0_4px_20px_rgba(255,193,7,0.2)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link
                        href="/"
                        className="flex items-center gap-3 group"
                    >
                        <Gamepad2 className="w-10 h-10 text-[#ffc107] drop-shadow-[0_0_15px_rgba(255,193,7,0.6)]" />
                        <span className="text-2xl font-bold bg-linear-to-r from-[#ffc107] to-[#ffeb3b] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(255,193,7,0.4)]">
                            GameStore
                        </span>
                    </Link>
                    
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/games"
                            className="text-gray-200 hover:text-[#ffc107] transition-colors relative group font-medium"
                        >
                            Oyunlar
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-[#ffc107] to-[#ffeb3b] group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link
                            href="/console"
                            className="text-gray-200 hover:text-[#ffc107] transition-colors relative group font-medium"
                        >
                            Konsollar
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-[#ffc107] to-[#ffeb3b] group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link
                            href="/accessories"
                            className="text-gray-200 hover:text-[#ffc107] transition-colors relative group font-medium"
                        >
                            Aksesuarlar
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-[#ffc107] to-[#ffeb3b] group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </div>
                    
                    <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Oyun axtar..."
                                className="w-full px-4 py-2 pl-10 bg-[rgba(0,0,0,0.6)] border border-[rgba(255,193,7,0.4)] rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#ffc107] focus:ring-2 focus:ring-[rgba(255,193,7,0.5)] transition-all"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <Link
                            href="/Basket"
                            className="relative p-2 hover:bg-[rgba(255,193,7,0.2)] rounded-full transition-colors group"
                            title={useBackend ? 'Backend Cart' : 'Local Cart'}
                        >
                            <ShoppingCart className="w-6 h-6 text-gray-200 group-hover:text-[#ffc107] transition-colors" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-linear-to-r from-[#ffc107] to-[#ffeb3b] rounded-full flex items-center justify-center text-xs font-bold text-black shadow-lg animate-pulse">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {isLoggedIn ? (
                            <div className="flex items-center gap-2">
                                <span className="hidden md:block text-gray-300 text-sm">
                                    {userName}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 hover:bg-[rgba(255,193,7,0.2)] rounded-full transition-colors group"
                                    title="Logout"
                                >
                                    <LogOut className="w-6 h-6 text-gray-200 group-hover:text-[#ffc107] transition-colors" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/Login"
                                className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#ffc107] to-[#ffeb3b] hover:from-[#ffeb3b] hover:to-[#ffc107] rounded-full transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,193,7,0.5)]"
                            >
                                <User className="w-5 h-5 text-black" />
                                <span className="hidden md:block text-black font-medium">Daxil ol</span>
                            </Link>
                        )}

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 hover:bg-[rgba(255,193,7,0.2)] rounded-full transition-colors"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6 text-gray-200" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-200" />
                            )}
                        </button>
                    </div>
                </div>
                
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-[rgba(255,193,7,0.3)] bg-[rgba(0,0,0,0.3)]">
                        <div className="px-2 mb-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Oyun axtar..."
                                    className="w-full px-4 py-2 pl-10 bg-[rgba(0,0,0,0.6)] border border-[rgba(255,193,7,0.4)] rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#ffc107] transition-all"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                        
                        {isLoggedIn && (
                            <div className="px-6 py-3 mb-2 bg-[rgba(255,193,7,0.1)] rounded-lg">
                                <p className="text-[#ffc107] font-medium">{userName}</p>
                                <p className="text-gray-400 text-sm">{useBackend ? 'Backend Cart' : 'Local Cart'}</p>
                            </div>
                        )}
                        
                        <div className="flex flex-col gap-2 px-2">
                            <Link
                                href="/games"
                                className="px-4 py-3 text-gray-200 hover:bg-[rgba(255,193,7,0.3)] rounded-lg transition-colors flex items-center gap-3"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Gamepad2 className="w-5 h-5 text-[#ffc107]" />
                                Oyunlar
                            </Link>
                            <Link
                                href="/console"
                                className="px-4 py-3 text-gray-200 hover:bg-[rgba(255,193,7,0.3)] rounded-lg transition-colors flex items-center gap-3"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Joystick className="w-5 h-5 text-[#ffc107]" />
                                Konsollar
                            </Link>
                            <Link
                                href="/accessories"
                                className="px-4 py-3 text-gray-200 hover:bg-[rgba(255,193,7,0.3)] rounded-lg transition-colors flex items-center gap-3"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Headphones className="w-5 h-5 text-[#ffc107]" />
                                Aksesuarlar
                            </Link>
                            <Link
                                href="/sale"
                                className="px-4 py-3 text-[#ffc107] hover:bg-[rgba(255,193,7,0.2)] rounded-lg transition-colors font-semibold flex items-center gap-3"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Flame className="w-5 h-5 text-[#ffc107]" />
                                Endirimlər
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}