"use client";

import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import { SmoothScroll } from '@/components/SmoothScroll';
import { ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';

export function Providers({ children }: { children: ReactNode }) {
  return (
    // reducedMotion="user": respeita o "reduzir movimento" do sistema operacional
    <MotionConfig reducedMotion="user">
      <CartProvider>
        {children}
        <CartDrawer />
        <SmoothScroll />
      </CartProvider>
    </MotionConfig>
  );
}
