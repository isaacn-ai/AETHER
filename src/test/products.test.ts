import { describe, it, expect } from 'vitest';
import { products } from '@/data/products';
import type { Product } from '@/types';

describe('Product data', () => {
  it('has at least one product', () => {
    expect(products.length).toBeGreaterThan(0);
  });

  it('every product has required fields', () => {
    const requiredFields: (keyof Product)[] = [
      'id', 'name', 'slug', 'price', 'description', 'shortDescription',
      'category', 'collection', 'rating', 'reviewCount', 'ingredients',
      'benefits', 'howToUse', 'size', 'inStock', 'gradient', 'accentColor',
    ];
    for (const product of products) {
      for (const field of requiredFields) {
        expect(product[field], `Product "${product.name}" missing "${field}"`).toBeDefined();
      }
    }
  });

  it('every product has a unique id', () => {
    const ids = products.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('every product has a unique slug', () => {
    const slugs = products.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it('all prices are positive numbers', () => {
    for (const product of products) {
      expect(product.price, `${product.name} has invalid price`).toBeGreaterThan(0);
    }
  });

  it('all ratings are between 0 and 5', () => {
    for (const product of products) {
      expect(product.rating).toBeGreaterThanOrEqual(0);
      expect(product.rating).toBeLessThanOrEqual(5);
    }
  });

  it('slug matches id format (kebab-case)', () => {
    for (const product of products) {
      expect(product.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('all products belong to valid collections', () => {
    const validCollections = ['gold', 'crystal', 'pearl', 'essentials'];
    for (const product of products) {
      expect(validCollections, `${product.name} has invalid collection`).toContain(product.collection);
    }
  });

  it('all products belong to valid categories', () => {
    const validCategories = [
      'serums', 'moisturizers', 'cleansers', 'masks',
      'eye-care', 'sun-protection', 'toners', 'mists',
    ];
    for (const product of products) {
      expect(validCategories, `${product.name} has invalid category`).toContain(product.category);
    }
  });

  it('products have non-empty ingredient lists', () => {
    for (const product of products) {
      expect(product.ingredients.length, `${product.name} has no ingredients`).toBeGreaterThan(0);
    }
  });

  it('products have non-empty benefits', () => {
    for (const product of products) {
      expect(product.benefits.length, `${product.name} has no benefits`).toBeGreaterThan(0);
    }
  });

  it('sale products have original price higher than current price', () => {
    const saleProducts = products.filter((p) => p.badge === 'sale');
    for (const product of saleProducts) {
      if (product.originalPrice !== undefined) {
        expect(product.originalPrice).toBeGreaterThan(product.price);
      }
    }
  });
});
