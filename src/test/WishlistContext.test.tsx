import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import { WishlistProvider, useWishlist } from '@/context/WishlistContext';
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
  inStock: true,
  gradient: 'product-gradient-gold',
  accentColor: '#C5A572',
};

const mockProduct2: Product = {
  ...mockProduct,
  id: 'golden-cream',
  name: 'Golden Cream',
  slug: 'golden-cream',
  price: 165,
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <WishlistProvider>{children}</WishlistProvider>
);

describe('WishlistContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with empty wishlist', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
  });

  it('adds item to wishlist', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct);
    });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.totalItems).toBe(1);
  });

  it('does not add duplicate items', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct);
    });
    expect(result.current.items).toHaveLength(1);
  });

  it('removes item from wishlist', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct);
    });
    act(() => {
      result.current.removeItem('titan-gold-serum');
    });
    expect(result.current.items).toHaveLength(0);
  });

  it('toggles item in and out of wishlist', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    act(() => result.current.toggleItem(mockProduct));
    expect(result.current.isInWishlist('titan-gold-serum')).toBe(true);
    act(() => result.current.toggleItem(mockProduct));
    expect(result.current.isInWishlist('titan-gold-serum')).toBe(false);
  });

  it('checks if product is in wishlist', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    expect(result.current.isInWishlist('titan-gold-serum')).toBe(false);
    act(() => {
      result.current.addItem(mockProduct);
    });
    expect(result.current.isInWishlist('titan-gold-serum')).toBe(true);
    expect(result.current.isInWishlist('golden-cream')).toBe(false);
  });

  it('handles multiple items', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct2);
    });
    expect(result.current.items).toHaveLength(2);
    expect(result.current.totalItems).toBe(2);
  });

  it('persists wishlist to localStorage', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct);
    });
    const stored = localStorage.getItem('titan_wishlist');
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored!);
    expect(parsed[0].id).toBe('titan-gold-serum');
  });

  it('loads wishlist from localStorage on mount', () => {
    localStorage.setItem('titan_wishlist', JSON.stringify([mockProduct]));
    const { result } = renderHook(() => useWishlist(), { wrapper });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe('titan-gold-serum');
  });

  it('throws when used outside WishlistProvider', () => {
    expect(() => renderHook(() => useWishlist())).toThrow(
      'useWishlist must be used within a WishlistProvider'
    );
  });
});
