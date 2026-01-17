'use client';
import { Package, CreditCard, RotateCcw, Headphones, ArrowRight } from 'lucide-react';
const banners = [
    {
        id: 1,
        title: "Essential Gaming",
        badge: "UP TO 30% OFF",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
        bgColor: "from-[#1a1a2e] to-[#16213e]"
    },
    {
        id: 2,
        title: "VR Experience",
        badge: "UP TO 30% OFF",
        image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&h=600&fit=crop",
        bgColor: "from-[#16213e] to-[#1a1a2e]"
    },
    {
        id: 3,
        title: "Premium Accessories",
        badge: "UP TO 30% OFF",
        image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&h=600&fit=crop",
        bgColor: "from-[#1a1a2e] to-[#0f3460]"
    }
];

const features = [
    {
        icon: Package,
        title: "Free Shipping",
        description: "Free shipping over order $120",
        color: "#facc15"
    },
    {
        icon: CreditCard,
        title: "Flexible Payment",
        description: "Pay with Multiple Credit Cards",
        color: "#facc15"
    },
    {
        icon: RotateCcw,
        title: "14 Day Returns",
        description: "Within 30 days for an exchange",
        color: "#facc15"
    },
    {
        icon: Headphones,
        title: "Premium Support",
        description: "Outstanding premium support",
        color: "#facc15"
    }
];

export default function GameBannersFeatures() {
    return (
        <section className="w-full bg-[#0a0a14] py-20 relative overflow-hidden">
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#ff6b9d]/5 rounded-full blur-3xl" />
            <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {banners.map((banner, index) => (
                        <div
                            key={banner.id}
                            className="group relative rounded-2xl overflow-hidden h-125 cursor-pointer border border-[#ffffff]/10 hover:border-yellow-400/50 transition-all duration-500"
                        >
                            <div className={`absolute inset-0 bg-linear-to-br ${banner.bgColor}`}>
                                <img
                                    src={banner.image}
                                    alt={banner.title}
                                    className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a14] via-[#0a0a14]/50 to-transparent" />
                            </div>

                            <div className="absolute  inset-0 p-8 flex flex-col justify-end">
                                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-yellow-400/20 border border-yellow-400/30 rounded-full backdrop-blur-md self-start">
                                    <span className="text-xs font-bold text-yellow-400 tracking-wider">{banner.badge}</span>
                                </div>

                                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                    {banner.title}
                                </h3>

                                <button className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-yellow-400 border border-white/20 hover:border-yellow-400 text-white hover:text-[#0a0a14] font-semibold rounded-full backdrop-blur-sm transition-all duration-300 self-start">
                                    Shop now
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(250,204,21,0.3)]" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="group flex items-start gap-4 p-6 bg-[#1a1a2e]/50 border border-[#ffffff]/10 hover:border-yellow-400/50 rounded-xl backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(250,204,21,0.2)]"
                            >
                                <div className="shrink-0 w-14 h-14 bg-yellow-400/10 rounded-full flex items-center justify-center border border-yellow-400/30 group-hover:bg-yellow-400/20 group-hover:border-yellow-400 transition-all duration-300">
                                    <Icon className="w-7 h-7 text-yellow-400" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-bold text-lg mb-1 group-hover:text-yellow-400 transition-colors" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                        {feature.title}
                                    </h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}