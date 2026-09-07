import { Order, RoadLogisticsTracking } from "@/types/farmer";
import { apiClient } from "@/lib/apiClient";

export const trackingService = {
  async getOrders(): Promise<Order[]> {
    try {
      return await apiClient<Order[]>('/api/farmer/orders', { method: 'GET' });
    } catch {
      return [];
    }
  },

  async getTrackingDetails(logisticsId: string): Promise<RoadLogisticsTracking | null> {
    try {
      return await apiClient<RoadLogisticsTracking>(`/api/tracking/${logisticsId}`, { method: 'GET' });
    } catch {
      return null;
    }
  }
};