import { ConsumerProduct, CartItem, BulkDemandPost } from '@/types/consumer';
import { mockConsumerProducts, mockBulkDemands } from './mockData/mockConsumerProducts';

const CART_KEY = 'agriflow_consumer_cart';

export const consumerService = {
  getProducts(): Promise<ConsumerProduct[]> {
    return Promise.resolve(mockConsumerProducts);
  },

  getProductById(id: string): Promise<ConsumerProduct | null> {
    const item = mockConsumerProducts.find(p => p.id === id) || null;
    return Promise.resolve(item);
  },

  getBulkDemands(): Promise<BulkDemandPost[]> {
    return Promise.resolve(mockBulkDemands);
  },

  getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(CART_KEY);
      return stored ? JSON.parse(stored) : [
        { product: mockConsumerProducts[0], quantityKg: 100 }
      ];
    } catch {
      return [{ product: mockConsumerProducts[0], quantityKg: 100 }];
    }
  },

  addToCart(product: ConsumerProduct, quantityKg: number): CartItem[] {
    const cart = this.getCart();
    const existingIndex = cart.findIndex(c => c.product.id === product.id);
    if (existingIndex >= 0) {
      cart[existingIndex].quantityKg += quantityKg;
    } else {
      cart.push({ product, quantityKg });
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
    return cart;
  },

  removeFromCart(productId: string): CartItem[] {
    const cart = this.getCart().filter(c => c.product.id !== productId);
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
    return cart;
  },

  clearCart(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CART_KEY);
    }
  }
};
