import { LogisticsFleetVehicle, ConsolidatedTrip } from '@/types/logistics';
import { mockFleetVehicles, mockConsolidatedTrips } from './mockData/mockLogisticsData';

export const logisticsService = {
  getFleet(): Promise<LogisticsFleetVehicle[]> {
    return Promise.resolve(mockFleetVehicles);
  },

  getTrips(): Promise<ConsolidatedTrip[]> {
    return Promise.resolve(mockConsolidatedTrips);
  },

  getTripById(id: string): Promise<ConsolidatedTrip | null> {
    const trip = mockConsolidatedTrips.find(t => t.id === id || t.tripCode === id) || null;
    return Promise.resolve(trip);
  }
};
