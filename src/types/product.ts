export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    description?: string; // ✅ Tambahkan ini
    rating?: {
    rate: number;
    count: number;
  } | number; // ✅ Support format object dan number
}
export interface CartItemType {
    product: Product;
    quantity: number;
    selected?: boolean;
}
