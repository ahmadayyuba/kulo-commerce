import { Product } from '../types/product';

// 1. Ambil Semua Produk
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
    image: item.image,
    category: item.category,
    description: item.description, // ✅ Tambahkan description
    rating: item.rating || { rate: 4.5, count: 120 }, // ✅ Mengirim object rating lengkap
  }));
};

// 2. Ambil 1 Produk Berdasarkan ID
export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product detail');
  }
  const data = await response.json();

  return {
    id: data.id,
    name: data.title,
    price: data.price,
    image: data.image,
    category: data.category,
    description: data.description,
    rating: data.rating || { rate: 4.5, count: 120 },
  };
};