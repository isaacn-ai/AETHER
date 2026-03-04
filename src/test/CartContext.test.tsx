import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import { CartProvider, useCart } from '@/context/CartContext';
import type { Product } from '@/types';

const mockProduct: Product = {
  id: 'titan-gold-serum',
  name: 'Titan Gold Serum',
  slug: 'titan-gold-serum',
  price: 189,
  description: 'Test description',
  shortDescription: 'Short description',
  category: 'serums',
  collection: 'gold',
  tags: ['anti-aging'],
  rating: 4.9,
  reviewCount: 342,
  ingredients: ['Gold'],
  benefits: ['Reduces wrinkles'],
  howToUse: 'Apply daily',
  size: '30ml',
  badge: 'bestseller',
  inStock: true,
  gradient: 'product-gradient-gold',
  accentColor: '#C5A572',
};

const mockProduct2: Product = {
  ...mockProduct,
  id: 'golden-radiance-cream',
  name: 'Golden Radiance Cream',
  slug: 'golden-radiance-cream',
  price: 165,
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('initializes with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.subtotal).toBe(0);
  });

  it('adds item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct);
    });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].product.id).toBe('titan-gold-serum');
    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.totalItems).toBe(1);
  });

  it('adds item with custom quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct, 3);
    });
    expect(result.current.items[0].quantity).toBe(3);
    expect(result.current.totalItems).toBe(3);
  });

  it('increments quantity when same item added', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct, 2);
      result.current.addItem(mockProduct, 1);
    });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(3);
  });

  it('removes item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct);
    });
    act(() => {
      result.current.removeItem('titan-gold-serum');
    });
    expect(result.current.items).toHaveLength(0);
  });

  it('updates item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct);
    });
    act(() => {
      result.current.updateQuantity('titan-gold-serum', 5);
    });
    expect(result.current.items[0].quantity).toBe(5);
  });

  it('removes item when quantity updated to 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct);
    });
    act(() => {
      result.current.updateQuantity('titan-gold-serum', 0);
    });
    expect(result.current.items).toHaveLength(0);
  });

  it('clears all items', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct2);
    });
    act(() => {
      result.current.clearCart();
    });
    expect(result.current.items).toHaveLength(0);
  });

  it('calculates subtotal correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct, 2); // 189 * 2 = 378
      result.current.addItem(mockProduct2, 1); // 165
    });
    expect(result.current.subtotal).toBe(543);
  });

  it('applies free shipping over threshold ($150)', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct, 1); // $189 > $150
    });
    expect(result.current.shipping).toBe(0);
  });

  it('charges shipping under threshold', () => {
    const cheapProduct: Product = { ...mockProduct, price: 50 };
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(cheapProduct, 1); // $50 < $150
    });
    expect(result.current.shipping).toBe(12);
  });

  it('calculates tax at 8%', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct, 1); // 189
    });
    expect(result.current.tax).toBeCloseTo(189 * 0.08, 2);
  });

  it('persists cart to localStorage', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct);
    });
    const stored = localStorage.getItem('titan_cart');
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored!);
    expect(parsed[0].product.id).toBe('titan-gold-serum');
  });

  it('loads cart from localStorage on mount', () => {
    const cartData = [{ product: mockProduct, quantity: 2 }];
    localStorage.setItem('titan_cart', JSON.stringify(cartData));

    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
  });

  it('opens cart when item added', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.isOpen).toBe(false);
    act(() => {
      result.current.addItem(mockProduct);
    });
    expect(result.current.isOpen).toBe(true);
  });

  it('toggles cart open/close', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.openCart());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.closeCart());
    expect(result.current.isOpen).toBe(false);
    act(() => result.current.toggleCart());
    expect(result.current.isOpen).toBe(true);
  });

  it('throws when used outside CartProvider', () => {
    expect(() => renderHook(() => useCart())).toThrow(
      'useCart must be used within a CartProvider'
    );
  });
});
