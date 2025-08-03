import { faker } from '@faker-js/faker';
import { subDays } from 'date-fns';
import { Customer, Order, OrderItem, CustomSize, CustomerStatus } from './types';

// Helper function to generate a random custom size
const generateCustomSize = (): CustomSize => ({
  chest: faker.number.int({ min: 30, max: 50 }),
  waist: faker.number.int({ min: 25, max: 45 }),
  hips: faker.number.int({ min: 30, max: 50 }),
});

// Helper function to generate order items
const generateOrderItems = (count: number): OrderItem[] => {
  const categories = ['Jackets', 'Trousers', 'Dresses', 'Shirts', 'Suits'];
  return Array.from({ length: count }, (_, i) => ({
    orderItemId: faker.string.uuid(),
    itemName: `Bespoke ${faker.commerce.productName()}`,
    category: categories[faker.number.int({ min: 0, max: categories.length - 1 })],
    price: faker.number.float({ 
      min: 100, 
      max: 1000, 
      fractionDigits: 2  // Using fractionDigits for 2 decimal places
    }),
    customSize: generateCustomSize(),
  }));
};

// Helper function to generate orders for a customer
const generateOrders = (customerId: string, count: number): Order[] => {
  return Array.from({ length: count }, (_, i) => {
    const itemCount = faker.number.int({ min: 1, max: 5 });
    const items = generateOrderItems(itemCount);
    const totalAmount = parseFloat(items.reduce((sum, item) => sum + item.price, 0).toFixed(2));
    
    return {
      orderId: faker.string.uuid(),
      orderDate: subDays(new Date(), faker.number.int({ min: 0, max: 365 })).toISOString(),
      totalAmount,
      items,
    };
  });
};

// Main function to generate customers with orders
export const generateMockCustomers = (count: number): Customer[] => {
  const statuses: CustomerStatus[] = ['active', 'churned', 'prospect'];
  
  return Array.from({ length: count }, (_, i) => {
    const orderCount = faker.number.int({ min: 0, max: 10 });
    const orders = generateOrders(`customer-${i}`, orderCount);
    const revenue = parseFloat(orders.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2));
    const lastOrderDate = orderCount > 0 
      ? orders.reduce((latest, order) => 
          order.orderDate > latest ? order.orderDate : latest, '') 
      : null;
    
    return {
      id: `customer-${i}`,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      status: statuses[faker.number.int({ min: 0, max: statuses.length - 1 })],
      revenue,
      createdAt: subDays(new Date(), faker.number.int({ min: 365, max: 730 })).toISOString(),
      orderCount,
      lastOrderDate,
      orders,
    };
  });
};

// Generate mock data (100 customers)
export const mockCustomers = generateMockCustomers(100);

// Utility function to get a customer by ID
export const getCustomerById = (id: string) => {
  return mockCustomers.find(customer => customer.id === id);
};

// Utility function to get orders by customer ID
export const getOrdersByCustomerId = (customerId: string) => {
  const customer = getCustomerById(customerId);
  return customer ? customer.orders || [] : [];
};