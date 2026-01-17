'use client';

const brands = [
    {
        id: 1,
        name: "PlayStation",
        logo: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=200&h=100&fit=crop"
    },
    {
        id: 2,
        name: "Xbox",
        logo: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=200&h=100&fit=crop"
    },
    {
        id: 3,
        name: "Nintendo",
        logo: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=200&h=100&fit=crop"
    },
    {
        id: 4,
        name: "Razer",
        logo: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=200&h=100&fit=crop"
    },
    {
        id: 5,
        name: "Logitech",
        logo: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=200&h=100&fit=crop"
    },
    {
        id: 6,
        name: "SteelSeries",
        logo: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=200&h=100&fit=crop"
    }
];

export default function GameBrandsSection() {
    return (
        <section className="w-full bg-[#0a0a14] py-24 relative overflow-hidden border-t border-[#ffffff]/5">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#00d9ff]/3 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#ff6b9d]/3 rounded-full blur-3xl" />

            <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {brands.map((brand) => (
                        <div
                            key={brand.id}
                            className="group flex items-center justify-center p-6 bg-[#1a1a2e]/30 border border-[#ffffff]/5 hover:border-yellow-300 rounded-xl transition-all duration-300 hover:bg-[#1a1a2e]/50 cursor-pointer"
                        >
                            <div className="relative w-full h-12 flex items-center justify-center">
                                <h3
                                    className="text-2xl font-bold text-white/60 group-hover:text-white transition-all duration-300"
                                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                                >
                                    {brand.name}
                                </h3>
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute inset-0 bg-linear-to-r from-[#00d9ff]/10 to-[#ff6b9d]/10 blur-xl" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}