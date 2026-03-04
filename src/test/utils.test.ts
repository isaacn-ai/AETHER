import { describe, it, expect } from 'vitest';
import { cn, formatPrice, slugify } from '@/lib/utils';

describe('cn (className merger)', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    const condition = false;
    expect(cn('base', condition && 'hidden', 'visible')).toBe('base visible');
  });

  it('resolves Tailwind conflicts (last wins)', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8');
  });

  it('handles empty arguments', () => {
    expect(cn()).toBe('');
  });
});

describe('formatPrice', () => {
  it('formats whole number prices', () => {
    expect(formatPrice(189)).toBe('$189.00');
  });

  it('formats decimal prices', () => {
    expect(formatPrice(29.99)).toBe('$29.99');
  });

  it('formats zero', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });

  it('formats large prices with commas', () => {
    expect(formatPrice(1299)).toBe('$1,299.00');
  });
});

describe('slugify', () => {
  it('converts spaces to hyphens', () => {
    expect(slugify('Titan Gold Serum')).toBe('titan-gold-serum');
  });

  it('lowercases text', () => {
    expect(slugify('GOLDEN RADIANCE')).toBe('golden-radiance');
  });

  it('removes special characters', () => {
    expect(slugify('Serum & Cream!')).toBe('serum-cream');
  });

  it('handles multiple spaces', () => {
    expect(slugify('eye  care  cream')).toBe('eye-care-cream');
  });
});
