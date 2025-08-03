export type CustomSize = {
  chest: number; // in inches
  waist: number; // in inches
  hips: number;  // in inches
};

export type OrderItem = {
  orderItemId: string;
  itemName: string;
  category: string;
  price: number;
  customSize: CustomSize;
};

export type Order = {
  orderId: string;
  orderDate: string;
  totalAmount: number;
  items: OrderItem[];
};

export type CustomerStatus = 'active' | 'churned' | 'prospect';

export type Customer = {
  id: string;
  name: string;
  email: string;
  status: CustomerStatus;
  revenue: number;
  createdAt: string;
  orderCount: number;
  lastOrderDate: string | null;
  orders?: Order[]; // Optional for mock data generation
};