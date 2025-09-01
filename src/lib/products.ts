import { getApiClient } from '@/lib/api';

export interface Product {
  _id: string;
  name: string;
  description?: string;
  price?: number;
  category?: string;
  brand?: string;
  images?: { url: string; altText?: string }[];
}

export async function fetchProducts(): Promise<Product[]> {
  const api = getApiClient();
  const { data } = await api.get('/products');
  return data as Product[];
}

export async function searchProducts(q: string): Promise<Product[]> {
  const api = getApiClient();
  const { data } = await api.get('/products/search', { params: { q } });
  return data as Product[];
}

export async function fetchProductById(id: string): Promise<Product> {
  const api = getApiClient();
  const { data } = await api.get(`/products/${id}`);
  return data as Product;
}

