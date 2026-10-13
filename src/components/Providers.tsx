"use client";

import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import { SmoothScroll } from '@/components/SmoothScroll';
import { ReactNode } from 'react';
import { LazyMotion, MotionConfig } from 'framer-motion';

const loadFeatures = () => import('./motionFeatures').then((mod) => mod.default);

export function Providers({ children }: { children: ReactNode }) {
  return (
    // reducedMotion="user": respeita o "reduzir movimento" do sistema operacional.
    // LazyMotion + <m.*>: só o núcleo do framer-motion entra no bundle inicial (strict acusa um <motion.*> esquecido)
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        <CartProvider>
          {children}
          <CartDrawer />
          <SmoothScroll />
        </CartProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
