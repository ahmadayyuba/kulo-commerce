import { Product } from '../types/product';

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
    throw new Error('Gagal mengambil data produk');
}
    const data = await response.json();
return data.map((item: any) => ({
    id: item.id,
    name: item.title,
    price: item.price, 
    rating: item.rating?.rate || 4.5,
    category: item.category,
    image: item.image,
}));
};