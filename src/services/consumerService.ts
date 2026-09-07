import { ConsumerProduct, CartItem, BulkDemandPost } from '@/types/consumer';
import { apiClient } from '@/lib/apiClient';

export const consumerService = {
  async getProducts(params?: { category?: string; grade?: string }): Promise<ConsumerProduct[]> {
    try {
      return await apiClient<ConsumerProduct[]>('/api/marketplace/products', {
        method: 'GET',
        params: params as Record<string, string | number | boolean | undefined>,
      });
    } catch {
      return [];
    }
  },

  async getProductById(id: string): Promise<ConsumerProduct | null> {
    try {
      return await apiClient<ConsumerProduct>(`/api/marketplace/products/${id}`, { method: 'GET' });
    } catch {
      return null;
    }
  },

  async getBulkDemands(): Promise<BulkDemandPost[]> {
    try {
      return await apiClient<BulkDemandPost[]>('/api/consumer/demands', { method: 'GET' });
    } catch {
      return [];
    }
  },

  async createBulkDemand(data: Partial<BulkDemandPost>): Promise<BulkDemandPost | null> {
    try {
      return await apiClient<BulkDemandPost>('/api/consumer/demands', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch {
      return null;
    }
  },

  async getCart(): Promise<CartItem[]> {
    try {
      return await apiClient<CartItem[]>('/api/cart', { method: 'GET' });
    } catch {
      return [];
    }
  },

  async addToCart(productId: string, quantityKg: number): Promise<CartItem[]> {
    try {
      return await apiClient<CartItem[]>('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ productId, quantityKg }),
      });
    } catch {
      return [];
    }
  },

  async removeFromCart(productId: string): Promise<CartItem[]> {
    try {
      return await apiClient<CartItem[]>(`/api/cart/${productId}`, { method: 'DELETE' });
    } catch {
      return [];
    }
  },

  async clearCart(): Promise<void> {
    try {
      await apiClient('/api/cart', { method: 'DELETE' });
    } catch {
      // ignore
    }
  },

  async checkout(orderData: {
    items: { productId: string; quantityKg: number }[];
    destinationAddress: string;
    contactPerson: string;
    contactPhone: string;
    paymentType?: string;
  }): Promise<{ orderId: string; trackingId?: string; status: string } | null> {
    try {
      return await apiClient<{ orderId: string; trackingId?: string; status: string }>('/api/orders', {
        method: 'POST',
        body: JSON.stringify(orderData),
      });
    } catch {
      return null;
    }
  }
};