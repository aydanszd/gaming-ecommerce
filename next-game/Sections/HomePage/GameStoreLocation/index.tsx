'use client';

import { MapPin, Mail, Phone, Clock, ArrowRight } from 'lucide-react';

export default function GameStoreLocation() {
    return (
        <section className="w-full bg-[#0a0a14] py-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00d9ff]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff6b9d]/5 rounded-full blur-3xl" />

            <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                {/* Map Container */}
                <div className="relative rounded-3xl overflow-hidden border border-[#00d9ff]/30 shadow-[0_0_50px_rgba(0,217,255,0.2)]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
                        {/* Left Side - Store Info */}
                        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0a0a14] p-12 flex flex-col justify-center relative">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d9ff]/10 rounded-full blur-2xl" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#ff6b9d]/10 rounded-full blur-2xl" />

                            <div className="relative z-10">
                                {/* Store Title */}
                                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-[#00d9ff]/10 border border-[#00d9ff]/30 rounded-full backdrop-blur-sm">
                                    <MapPin className="w-4 h-4 text-[#00d9ff]" />
                                    <span className="text-xs font-bold text-[#00d9ff] tracking-wider uppercase">Our Location</span>
                                </div>

                                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                    Baku <span className="text-[#00d9ff]">Game Store</span>
                                </h2>

                                {/* Store Details */}
                                <div className="space-y-6 mb-10">
                                    {/* Address */}
                                    <div className="flex items-start gap-4 group">
                                        <div className="flex-shrink-0 w-12 h-12 bg-[#00d9ff]/10 rounded-full flex items-center justify-center border border-[#00d9ff]/30 group-hover:bg-[#00d9ff]/20 transition-all duration-300">
                                            <MapPin className="w-6 h-6 text-[#00d9ff]" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold mb-1">Address</h3>
                                            <p className="text-gray-400 text-sm">28 May Street, Baku, Azerbaijan</p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-start gap-4 group">
                                        <div className="flex-shrink-0 w-12 h-12 bg-[#00d9ff]/10 rounded-full flex items-center justify-center border border-[#00d9ff]/30 group-hover:bg-[#00d9ff]/20 transition-all duration-300">
                                            <Mail className="w-6 h-6 text-[#00d9ff]" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold mb-1">Email</h3>
                                            <p className="text-gray-400 text-sm">support@bakugamestore.com</p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-start gap-4 group">
                                        <div className="flex-shrink-0 w-12 h-12 bg-[#00d9ff]/10 rounded-full flex items-center justify-center border border-[#00d9ff]/30 group-hover:bg-[#00d9ff]/20 transition-all duration-300">
                                            <Phone className="w-6 h-6 text-[#00d9ff]" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold mb-1">Phone</h3>
                                            <p className="text-gray-400 text-sm">(+994) 12 345 6789</p>
                                        </div>
                                    </div>

                                    {/* Working Hours */}
                                    <div className="flex items-start gap-4 group">
                                        <div className="flex-shrink-0 w-12 h-12 bg-[#00d9ff]/10 rounded-full flex items-center justify-center border border-[#00d9ff]/30 group-hover:bg-[#00d9ff]/20 transition-all duration-300">
                                            <Clock className="w-6 h-6 text-[#00d9ff]" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold mb-2">Working Hours</h3>
                                            <div className="space-y-1 text-sm">
                                                <p className="text-gray-400">Mon - Fri, 10:00am - 10:00pm</p>
                                                <p className="text-gray-400">Saturday, 10:00am - 10:00pm</p>
                                                <p className="text-[#ff6b9d] font-semibold">Sunday Closed</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Get Directions Button */}
                                <button className="group inline-flex items-center gap-3 px-8 py-4 bg-[#00d9ff] hover:bg-[#00b8e6] text-[#0a0a14] font-bold rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(0,217,255,0.4)] hover:shadow-[0_0_40px_rgba(0,217,255,0.6)] hover:scale-105 active:scale-95">
                                    Get Directions
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* Right Side - Map */}
                        <div className="relative min-h-[600px] bg-[#1a1a2e]">
                            {/* Map Placeholder with Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#00d9ff]/20 to-[#ff6b9d]/20">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194472.49024552612!2d49.70778829999999!3d40.4093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d6bd6211cf9%3A0x343f6b5e7ae56c6b!2sBaku%2C%20Azerbaijan!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full h-full opacity-90"
                                ></iframe>
                            </div>

                            {/* Map Pin Marker */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                <div className="relative animate-bounce">
                                    <div className="w-16 h-16 bg-[#00d9ff] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(0,217,255,0.6)] border-4 border-white">
                                        <MapPin className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-[#00d9ff]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}