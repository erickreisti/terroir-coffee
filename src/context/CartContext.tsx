"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const STORAGE_KEY = 'terroir-cart';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  isSubscription?: boolean;
};

type CartContextType = {
  items: CartItem[];
  isCartOpen: boolean;
  isHydrated: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persiste o carrinho para sobreviver a um refresh (ex.: no /checkout)
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- leitura única do localStorage após montar
      if (saved) setItems(JSON.parse(saved));
    } catch {}
    setIsHydrated(true);
  }, []);
  useEffect(() => {
    if (!isHydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }, [items, isHydrated]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);
      if (existing) {
        return prev.map((i) => 
          i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    openCart();
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) => 
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, isCartOpen, isHydrated, openCart, closeCart, addItem, removeItem, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
