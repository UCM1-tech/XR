"use client";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getApiClient } from '@/lib/api';
import type { Product } from '@/lib/products';

interface FavoriteItem {
  product: Product;
  addedAt: string;
  note?: string;
  category?: string;
}

interface FavoritesState {
  items: FavoriteItem[];
  loading: boolean;
  error: string | null;
  addItem: (product: Product, note?: string, category?: string) => void;
  removeItem: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: Product, note?: string, category?: string) => void;
  updateNote: (productId: string, note: string) => void;
  updateCategory: (productId: string, category: string) => void;
  clearFavorites: () => void;
  syncWithServer: () => Promise<void>;
  getFavoritesByCategory: (category?: string) => FavoriteItem[];
  searchFavorites: (query: string) => FavoriteItem[];
  totalItems: number;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      loading: false,
      error: null,
      
      addItem: (product, note, category) => {
        const { items } = get();
        if (!items.find(item => item.product._id === product._id)) {
          const newItem: FavoriteItem = {
            product,
            addedAt: new Date().toISOString(),
            note,
            category
          };
          set({ items: [...items, newItem] });
          get().syncWithServer();
        }
      },
      
      removeItem: (productId) => {
        const { items } = get();
        set({ items: items.filter(item => item.product._id !== productId) });
        get().syncWithServer();
      },
      
      isFavorite: (productId) => {
        return get().items.some(item => item.product._id === productId);
      },
      
      toggleFavorite: (product, note, category) => {
        const { isFavorite, addItem, removeItem } = get();
        if (isFavorite(product._id)) {
          removeItem(product._id);
        } else {
          addItem(product, note, category);
        }
      },
      
      updateNote: (productId, note) => {
        const { items } = get();
        set({
          items: items.map(item =>
            item.product._id === productId
              ? { ...item, note }
              : item
          )
        });
        get().syncWithServer();
      },
      
      updateCategory: (productId, category) => {
        const { items } = get();
        set({
          items: items.map(item =>
            item.product._id === productId
              ? { ...item, category }
              : item
          )
        });
        get().syncWithServer();
      },
      
      clearFavorites: () => {
        set({ items: [] });
        get().syncWithServer();
      },
      
      syncWithServer: async () => {
        const { items } = get();
        const token = typeof window !== 'undefined' ? window.localStorage.getItem('auth_token') : null;
        
        if (!token) return; // 未登录时不同步
        
        set({ loading: true, error: null });
        try {
          const api = getApiClient();
          await api.post('/favorites/sync', { items });
        } catch (error) {
          console.error('同步收藏失败:', error);
          set({ error: '同步收藏失败' });
        } finally {
          set({ loading: false });
        }
      },
      
      getFavoritesByCategory: (category) => {
        const { items } = get();
        if (!category) return items;
        return items.filter(item => item.category === category);
      },
      
      searchFavorites: (query) => {
        const { items } = get();
        const lowerQuery = query.toLowerCase();
        return items.filter(item => 
          item.product.name.toLowerCase().includes(lowerQuery) ||
          item.product.description?.toLowerCase().includes(lowerQuery) ||
          item.note?.toLowerCase().includes(lowerQuery) ||
          item.category?.toLowerCase().includes(lowerQuery)
        );
      },
      
      get totalItems() {
        return get().items.length;
      }
    }),
    {
      name: 'favorites-storage',
      partialize: (state) => ({ items: state.items })
    }
  )
); 