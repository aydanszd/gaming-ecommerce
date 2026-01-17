import React from 'react';
export const LoadingState: React.FC = () => (
    <section className="w-full bg-[#0a0a14] py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex justify-center items-center min-h-100">
                <div className="animate-pulse">
                    <div className="text-yellow-300 text-2xl font-bold">Loading products...</div>
                </div>
            </div>
        </div>
    </section>
);

export const ErrorState: React.FC<{ error: string }> = ({ error }) => (
    <section className="w-full bg-[#0a0a14] py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex justify-center items-center min-h-100">
                <div className="text-red-500 text-xl">Error: {error}</div>
            </div>
        </div>
    </section>
);