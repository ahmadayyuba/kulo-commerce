export interface Product {
    id: string | number;
    name: string;
    price: number;
    rating: number;
    image: string;
    category?: string;
}

export interface CartItemType {
    product: Product;
    quantity: number;
    selected?: boolean;
}
