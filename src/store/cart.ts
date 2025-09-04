"use client";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getApiClient } from '@/lib/api';
import type { Product } from '@/lib/products';

interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  addedAt: string;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  isHydrated: boolean;
  addItem: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateItemOptions: (productId: string, size?: string, color?: string) => void;
  clearCart: () => void;
  selectItem: (productId: string, selected: boolean) => void;
  selectAll: (selected: boolean) => void;
  removeSelected: () => void;
  syncWithServer: () => Promise<void>;
  setHydrated: () => void;
  totalItems: number;
  totalPrice: number;
  selectedItems: CartItem[];
  selectedTotalPrice: number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      loading: false,
      error: null,
      isHydrated: false,
      
      addItem: (product, quantity = 1, size, color) => {
        const { items } = get();
        const existing = items.find(item => 
          item.product._id === product._id && 
          item.selectedSize === size && 
          item.selectedColor === color
        );
        
        if (existing) {
          set({
            items: items.map(item =>
              item.product._id === product._id && 
              item.selectedSize === size && 
              item.selectedColor === color
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          const newItem: CartItem = {
            product,
            quantity,
            selectedSize: size,
            selectedColor: color,
            addedAt: new Date().toISOString()
          };
          set({ items: [...items, newItem] });
        }
        
        // 尝试同步到服务器
        get().syncWithServer();
      },
      
      removeItem: (productId) => {
        const { items } = get();
        set({ items: items.filter(item => item.product._id !== productId) });
        get().syncWithServer();
      },
      
      updateQuantity: (productId, quantity) => {
        const { items } = get();
        if (quantity <= 0) {
          get().removeItem(productId);
        } else {
          set({
            items: items.map(item =>
              item.product._id === productId
                ? { ...item, quantity }
                : item
            )
          });
          get().syncWithServer();
        }
      },
      
      updateItemOptions: (productId, size, color) => {
        const { items } = get();
        set({
          items: items.map(item =>
            item.product._id === productId
              ? { ...item, selectedSize: size, selectedColor: color }
              : item
          )
        });
        get().syncWithServer();
      },
      
      clearCart: () => {
        set({ items: [] });
        get().syncWithServer();
      },
      
      selectItem: (productId, selected) => {
        const { items } = get();
        set({
          items: items.map(item =>
            item.product._id === productId
              ? { ...item, selected }
              : item
          )
        });
      },
      
      selectAll: (selected) => {
        const { items } = get();
        set({
          items: items.map(item => ({ ...item, selected }))
        });
      },
      
      removeSelected: () => {
        const { items } = get();
        set({ items: items.filter(item => !item.selected) });
        get().syncWithServer();
      },
      
      syncWithServer: async () => {
        const { items } = get();
        const token = typeof window !== 'undefined' ? window.localStorage.getItem('auth_token') : null;
        
        if (!token) return; // 未登录时不同步
        
        set({ loading: true, error: null });
        try {
          const api = getApiClient();
          await api.post('/cart/sync', { items });
        } catch (error) {
          console.error('同步购物车失败:', error);
          set({ error: '同步购物车失败' });
        } finally {
          set({ loading: false });
        }
      },
      
      setHydrated: () => {
        set({ isHydrated: true });
      },
      
      get totalItems() {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
      
      get totalPrice() {
        return get().items.reduce((sum, item) => {
          const price = item.product.price || 0;
          return sum + price * item.quantity;
        }, 0);
      },
      
      get selectedItems() {
        return get().items.filter(item => item.selected);
      },
      
      get selectedTotalPrice() {
        return get().selectedItems.reduce((sum, item) => {
          const price = item.product.price || 0;
          return sum + price * item.quantity;
        }, 0);
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items })
    }
  )
); 