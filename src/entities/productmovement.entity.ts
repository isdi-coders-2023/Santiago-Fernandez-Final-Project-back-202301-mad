export type ProductMovement = {
  id: string;
  productSku: string;
  batch: string;
  date: Date;
  type: string;
  typeId: string;
  store: string;
  units: number;
  costPerUnit: number;
  pricePerUnit: number;
};
