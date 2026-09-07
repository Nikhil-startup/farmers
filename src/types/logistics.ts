import { DeliveryStatus, RoadVehicleType, SpoilageRiskLevel } from './delivery';

export interface LogisticsFleetVehicle {
  id: string;
  vehicleNumber: string;
  vehicleType: RoadVehicleType;
  capacityKg: number;
  currentLoadKg: number;
  driverName: string;
  driverPhone: string;
  status: 'Available' | 'Assigned' | 'In Transit' | 'Loading' | 'Maintenance';
  reeferActive: boolean;
  currentTempCelsius: number;
  currentLocation: string;
  currentLat: number;
  currentLng: number;
  assignedTripId?: string;
}

export interface ConsolidatedTrip {
  id: string;
  tripCode: string;
  vehicle: LogisticsFleetVehicle;
  sourceHub: string;
  destinationHub: string;
  totalDistanceKm: number;
  distanceCompletedKm: number;
  commodity: string;
  totalKg: number;
  pickups: {
    fpoName: string;
    location: string;
    qtyKg: number;
    status: 'Pending' | 'Loaded';
  }[];
  status: DeliveryStatus;
  estimatedArrival: string;
  coldChainTemp: number;
  spoilageRisk: SpoilageRiskLevel;
  returnLoad?: {
    id: string;
    route: string;
    commodity: string;
    weightKg: number;
    additionalEarnings: number;
    emptyDistanceAvoidedKm: number;
    isClaimed: boolean;
  };
}
