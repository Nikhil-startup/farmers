import { MarketPrice, PriceTrendPoint } from "@/types/farmer";
import { apiClient } from "@/lib/apiClient";

export const marketPriceService = {
  async getMarketPrices(commodity?: string): Promise<MarketPrice[]> {
    try {
      return await apiClient<MarketPrice[]>('/api/mandi-prices', {
        method: 'GET',
        params: { commodity },
      });
    } catch {
      return [];
    }
  },

  async getPriceTrends(commodity: string): Promise<PriceTrendPoint[]> {
    try {
      return await apiClient<PriceTrendPoint[]>('/api/mandi-prices/trends', {
        method: 'GET',
        params: { commodity },
      });
    } catch {
      return [];
    }
  }
};