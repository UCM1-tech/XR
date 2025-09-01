"use client";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/lib/products';

interface FavoritesState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: Product) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        const { items } = get();
        if (!items.find(item => item._id === product._id)) {
          set({ items: [...items, product] });
        }
      },
      
      removeItem: (productId) => {
        const { items } = get();
        set({ items: items.filter(item => item._id !== productId) });
      },
      
      isFavorite: (productId) => {
        return get().items.some(item => item._id === productId);
      },
      
      toggleFavorite: (product) => {
        const { isFavorite, addItem, removeItem } = get();
        if (isFavorite(product._id)) {
          removeItem(product._id);
        } else {
          addItem(product);
        }
      }
    }),
    {
      name: 'favorites-storage'
    }
  )
); 