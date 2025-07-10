import type { MenuItem, Order, OrderItem } from "../types";

export interface AppContextType {
  currentRole: 'customer' | 'admin' | 'accountant' | 'waiter' | 'bartender' | 'cook';
  setCurrentRole: (role: AppContextType['currentRole']) => void;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  menuItems: MenuItem[];
  addOrder: (order: Order) => Promise<void>;
  updateOrderStatus: (orderId: string, newStatus: Order['status']) => Promise<void>;
  approveUnpaidOrder: (orderId: string) => Promise<void>;
  updateOrderItemStatus: (orderId: string, itemId: string, newStatus: OrderItem['status']) => Promise<void>;
}