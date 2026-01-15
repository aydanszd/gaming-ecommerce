'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Menu, X, Search, Gamepad2, Joystick, Headphones, Flame } from 'lucide-react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(3);

    return (
        <nav className="sticky top-0 z-50 bg-[rgba(10,10,20,0.95)] backdrop-blur-xl border-b-2 border-[rgba(0,136,255,0.3)] shadow-[0_4px_20px_rgba(0,136,255,0.2)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link
                        href="/"
                        className="flex items-center gap-3 group"
                    >
                        <Gamepad2 className="w-10 h-10 text-[#0088ff]  drop-shadow-[0_0_15px_rgba(0,136,255,0.6)]" />
                        <span className="text-2xl font-(family-name:--font-orbitron) bg-linear-to-r from-[#0088ff] to-[#ff8888] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,136,255,0.4)]">
                            GameStore
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/games"
                            className="text-gray-200 hover:text-[#0088ff] transition-colors font-(family-name:--font-orbitron) relative group font-medium"
                        >
                            Oyunlar
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-[#0088ff] to-[#ff8888] group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link
                            href="/console"
                            className="text-gray-200 font-(family-name:--font-orbitron) hover:text-[#0088ff] transition-colors relative group font-medium"
                        >
                            Konsollar
                            <span className="absolute font-(family-name:--font-orbitron) bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-[#0088ff] to-[#ff8888] group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link
                            href="/accessories"
                            className="text-gray-200 font-(family-name:--font-orbitron) hover:text-[#0088ff] transition-colors relative group font-medium"
                        >
                            Aksesuarlar
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-[#0088ff] to-[#ff8888] group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </div>
                    <div className="hidden lg:flex items-center flex-1 max-w-md mx-8 font-(family-name:--font-orbitron)">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Oyun axtar..."
                                className="w-full px-4 py-2 pl-10 bg-[rgba(0,0,0,0.6)] border border-[rgba(0,136,255,0.4)] rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#0088ff] focus:ring-2 focus:ring-[rgba(0,136,255,0.5)] transition-all"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/cart"
                            className="relative p-2 hover:bg-[rgba(0,136,255,0.2)] rounded-full transition-colors group"
                        >
                            <ShoppingCart className="w-6 h-6 text-gray-200 group-hover:text-[#0088ff] transition-colors" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-linear-to-r from-[#ff8888] to-[#ff6666] rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <Link
                            href="/profile"
                            className="p-2 hover:bg-[rgba(0,136,255,0.2)] rounded-full transition-colors group"
                        >
                            <User className="w-6 h-6 text-gray-200 group-hover:text-[#0088ff] transition-colors" />
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 hover:bg-[rgba(0,136,255,0.2)] rounded-full transition-colors"
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
                    <div className="md:hidden py-4 border-t border-[rgba(0,136,255,0.3)] bg-[rgba(0,0,0,0.3)]">
                        <div className="px-2 mb-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Oyun axtar..."
                                    className="w-full px-4 py-2 pl-10 bg-[rgba(0,0,0,0.6)] border border-[rgba(0,136,255,0.4)] rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#0088ff] transition-all"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 px-2">
                            <Link
                                href="/games"
                                className="px-4 py-3 text-gray-200 hover:bg-[rgba(0,136,255,0.3)] rounded-lg transition-colors flex items-center gap-3"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Gamepad2 className="w-5 h-5 text-[#0088ff]" />
                                Oyunlar
                            </Link>
                            <Link
                                href="/console"
                                className="px-4 py-3 text-gray-200 hover:bg-[rgba(0,136,255,0.3)] rounded-lg transition-colors flex items-center gap-3"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Joystick className="w-5 h-5 text-[#0088ff]" />
                                Konsollar
                            </Link>
                            <Link
                                href="/accessories"
                                className="px-4 py-3 text-gray-200 hover:bg-[rgba(0,136,255,0.3)] rounded-lg transition-colors flex items-center gap-3"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Headphones className="w-5 h-5 text-[#0088ff]" />
                                Aksesuarlar
                            </Link>
                            <Link
                                href="/sale"
                                className="px-4 py-3 text-[#ff8888] hover:bg-[rgba(255,136,136,0.2)] rounded-lg transition-colors font-semibold flex items-center gap-3"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Flame className="w-5 h-5 text-[#ff8888]" />
                                Endirimlər
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}