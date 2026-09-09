import { RoadVehicleType } from './delivery';

export interface LogisticsOperator {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: 'logistics';
  vehicleType: RoadVehicleType;
  vehicleNumber: string;
  vehicleCapacityKg: number;
  reeferEnabled: boolean;
  operatingRegion: string;
  preferredRoutes: string[];
  createdAt: string;
}

export interface LogisticsFleetVehicle {
  id: string;
  vehicleNumber: string;
  vehicleType: RoadVehicleType;
  capacityKg: number;
  currentLoadKg: number;
  driverName: string;
  driverPhone: string;
  status: 'In Transit' | 'Available' | 'Maintenance' | 'Loading';
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
    status: 'Loaded' | 'Pending' | 'En Route';
  }[];
  status: 'IN TRANSIT' | 'DELIVERED' | 'SCHEDULED' | 'LOADING';
  estimatedArrival: string;
  coldChainTemp: number;
  spoilageRisk: 'LOW' | 'MEDIUM' | 'HIGH';
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
