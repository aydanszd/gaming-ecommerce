export interface Product {
    _id: string;
    name: string;
    title?: string;
    description: string;
    price: number;
    salePrice?: number;
    originalPrice?: number;
    discount?: number;
    color?: string;
    image: string;
    isBestSeller?: boolean;
    isNewArrival?: boolean;
    isOnSale?: boolean;
    quantity?: number;
}

export type TabType = 'bestseller' | 'newarrivals' | 'onsale';