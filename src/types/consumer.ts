import { ProduceGrade } from './farmer';

export interface ConsumerProduct {
  id: string;
  name: string;
  hindiName?: string;
  category: 'Vegetables' | 'Fruits' | 'Spices' | 'Tubers';
  farmerName: string;
  farmLocation: string;
  fpoCluster?: string;
  grade: ProduceGrade;
  availableKg: number;
  minOrderKg: number;
  consumerPricePerKg: number;
  farmerRealizationPerKg: number;
  logisticsFeePerKg: number;
  platformFeePerKg: number;
  harvestDate: string;
  harvestHoursAgo: number;
  coldChainTempCelsius: number;
  freshnessScore: number;
  image: string;
  description: string;
  provenanceBatchId: string;
}

export interface CartItem {
  product: ConsumerProduct;
  quantityKg: number;
}

export interface BulkDemandPost {
  id: string;
  buyerName: string;
  buyerType: string;
  commodity: string;
  requiredQuantityKg: number;
  maxTargetPricePerKg: number;
  deliveryLocation: string;
  targetDate: string;
  allocatedFarmers: {
    farmerName: string;
    location: string;
    allocatedKg: number;
    grade: ProduceGrade;
  }[];
  status: 'Open' | 'Consolidated' | 'Dispatched' | 'Completed';
  createdAt: string;
}
