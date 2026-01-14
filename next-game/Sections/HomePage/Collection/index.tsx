'use client';

import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: "Women's",
    items: 23,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop"
  },
  {
    id: 2,
    name: "Men's",
    items: 9,
    image: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=400&h=400&fit=crop"
  },
  {
    id: 3,
    name: "Jewelry",
    items: 31,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop"
  },
  {
    id: 4,
    name: "Sneakers",
    items: 21,
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop"
  },
  {
    id: 5,
    name: "Bags",
    items: 5,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop"
  },
  {
    id: 6,
    name: "Glasses",
    items: 14,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop"
  }
];

export default function Collection() {
  return (
    <section className="w-full bg-[#f5f5f0] py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-light text-gray-900">
            Season Collection
          </h2>
          <button className="group flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors border-b border-gray-900 hover:border-gray-600 pb-1">
            View all categories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer"
            >
              {/* Circular Image */}
              <div className="relative aspect-square mb-6 overflow-hidden rounded-full bg-white shadow-sm group-hover:shadow-xl transition-shadow duration-300">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Category Info */}
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {category.items} items
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}