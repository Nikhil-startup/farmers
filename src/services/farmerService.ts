import { Produce, QualityGradeResult } from "@/types/farmer";
import { apiClient } from "@/lib/apiClient";

export const farmerService = {
  async getProduceList(): Promise<Produce[]> {
    try {
      return await apiClient<Produce[]>('/api/farmer/produce', { method: 'GET' });
    } catch {
      return [];
    }
  },

  async addProduce(item: Omit<Produce, "id" | "createdAt" | "status">): Promise<Produce | null> {
    try {
      return await apiClient<Produce>('/api/farmer/produce', {
        method: 'POST',
        body: JSON.stringify(item),
      });
    } catch {
      return null;
    }
  },

  async updateProduceStatus(id: string, status: Produce["status"]): Promise<boolean> {
    try {
      await apiClient(`/api/farmer/produce/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      return true;
    } catch {
      return false;
    }
  },

  async gradeProduce(cropName: string, imageBase64?: string): Promise<QualityGradeResult | null> {
    try {
      return await apiClient<QualityGradeResult>('/api/farmer/grade', {
        method: 'POST',
        body: JSON.stringify({ cropName, imageBase64 }),
      });
    } catch {
      return null;
    }
  }
};