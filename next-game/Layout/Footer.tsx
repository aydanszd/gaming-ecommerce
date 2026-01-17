'use client';
import { Facebook, Twitter, Instagram, Youtube, Twitch, MapPin, Mail, Phone, ArrowRight, Gamepad2 } from 'lucide-react';

export default function GameStoreFooter() {
    return (
        <footer className="w-full bg-gray-950 border-t border-white/10">
            <div className="max-w-400 mx-auto px-6 sm:px-8 lg:px-12 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-3 group">
                                <Gamepad2 className="w-10 h-10 text-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.6)]" />
                                <span className="text-2xl font-bold bg-linear-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(234,179,8,0.4)]">
                                    GameStore
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm text-gray-400">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-yellow-400 shrink-0 mt-1" />
                                <p>28 May Street, Suite 567,<br />Baku, Azerbaijan</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-yellow-400 shrink-0" />
                                <a href="mailto:info@bakugamestore.com" className="hover:text-yellow-400 transition-colors">
                                    info@bakugamestore.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
                                <a href="tel:+994123456789" className="hover:text-yellow-400 transition-colors">
                                    (+994) 12 345-6789
                                </a>
                            </div>
                        </div>

                        <button className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-400 hover:text-white transition-colors group">
                            Get direction
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <div className="flex gap-3 pt-4">
                            {[Facebook, Twitter, Instagram, Youtube, Twitch].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-10 h-10 bg-gray-900 border border-white/10 hover:border-yellow-400 hover:bg-yellow-500/10 rounded-full flex items-center justify-center text-gray-400 hover:text-yellow-400 transition-all duration-300"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                            Help
                        </h4>
                        <ul className="space-y-2">
                            {['Privacy Policy', 'Returns + Exchanges', 'Shipping', 'Terms & Conditions', "FAQ's", 'Compare', 'My Wishlist'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-lg mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                            About us
                        </h4>
                        <ul className="space-y-3">
                            {['Our Story', 'Visit Our Store', 'Contact Us', 'Account'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-lg mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                            Sign Up for Email
                        </h4>
                        <p className="text-gray-400 text-sm mb-6">
                            Sign up to get first dibs on new arrivals, sales, exclusive content, events and more!
                        </p>

                        <div className="flex gap-2 mb-6">
                            <input
                                type="email"
                                placeholder="Enter your email...."
                                className="flex-1 px-4 py-3 bg-gray-900 border border-white/10 focus:border-yellow-400 rounded-lg text-white text-sm placeholder:text-gray-500 outline-none transition-colors"
                            />
                            <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95">
                                Subscribe
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex gap-4">
                            <select className="px-4 py-2 bg-gray-900 border border-white/10 rounded-lg text-white text-sm outline-none cursor-pointer hover:border-yellow-400 transition-colors">
                                <option>🇺🇸 USD</option>
                                <option>🇪🇺 EUR</option>
                                <option>🇦🇿 AZN</option>
                            </select>
                            <select className="px-4 py-2 bg-gray-900 border border-white/10 rounded-lg text-white text-sm outline-none cursor-pointer hover:border-yellow-400 transition-colors">
                                <option>English</option>
                                <option>Azərbaycan</option>
                                <option>Русский</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">
                            © 2025 GameStore. All Rights Reserved
                        </p>
                        <div className="flex items-center gap-3">
                            {['VISA', 'PayPal', 'Mastercard', 'AmEx', 'Discover'].map((payment) => (
                                <div
                                    key={payment}
                                    className="w-12 h-8 bg-gray-900 border border-white/10 rounded flex items-center justify-center text-[10px] text-gray-400 font-semibold hover:border-yellow-400 transition-colors"
                                >
                                    {payment === 'VISA' && 'VISA'}
                                    {payment === 'PayPal' && 'PP'}
                                    {payment === 'Mastercard' && 'MC'}
                                    {payment === 'AmEx' && 'AMEX'}
                                    {payment === 'Discover' && 'DC'}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}