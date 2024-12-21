import { faker } from "@faker-js/faker";

export interface DashboardData {
  consultations: number;
  ordersPlaced: number;
  conversion: number;
  totalSalesValue: number;
  avgOrderValue: number;
  commissionPaid: number;
  orders: Order[];
}

interface Order {
  id: string;
  productName: string;
  date: string;
  time: string;
  timeSpent: string;
  orderValue: number;
  commission: number;
}

export const fetchDashboardData = async (): Promise<DashboardData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const orders = Array(4)
    .fill(null)
    .map(() => ({
      id: faker.string.uuid(),
      productName: faker.commerce.productName(),
      date: faker.date.recent().toLocaleDateString(),
      time: faker.date.recent().toLocaleTimeString(),
      timeSpent: `${faker.number.int({ min: 1, max: 3 })}h ${faker.number.int({
        min: 1,
        max: 59,
      })}m`,
      orderValue: parseFloat(faker.commerce.price()),
      commission: parseFloat(faker.commerce.price({ max: 100 })),
    }));

  return {
    consultations: faker.number.int({ min: 10, max: 50 }),
    ordersPlaced: faker.number.int({ min: 5, max: 30 }),
    conversion: faker.number.int({ min: 30, max: 70 }),
    totalSalesValue: faker.number.int({ min: 1000, max: 5000 }),
    avgOrderValue: faker.number.int({ min: 100, max: 500 }),
    commissionPaid: faker.number.int({ min: 100, max: 1000 }),
    orders,
  };
};
