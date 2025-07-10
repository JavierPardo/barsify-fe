import type { Order, OrderItem } from "../types";


export class OrderService {
  async createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'approvedByAdmin'>, addOrderContextFn: (order: Order) => Promise<void>): Promise<Order> {
    const newOrder: Order = {
      ...orderData,
      id: `ORD${Date.now().toString().slice(-6)}`, // ID simple
      createdAt: new Date().toISOString(),
      status: orderData.isPaid ? 'accepted' : 'pending', // Lógica inicial del backend
      approvedByAdmin: orderData.isPaid,
    };
    await addOrderContextFn(newOrder);
    return newOrder;
  }

  async getOrderById(orderId: string, ordersContext: Order[]): Promise<Order | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(ordersContext.find(o => o.id === orderId)), 300);
    });
  }

  async getAllOrders(ordersContext: Order[]): Promise<Order[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(ordersContext), 300);
    });
  }

  async getKitchenOrders(ordersContext: Order[]): Promise<Order[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(ordersContext.filter(order =>
        order.status === 'accepted' || order.status === 'preparing' || order.status === 'ready'
      ).filter(order => order.items.some(item => item.type === 'food'))), 300);
    });
  }

  async getBarOrders(ordersContext: Order[]): Promise<Order[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(ordersContext.filter(order =>
        order.status === 'accepted' || order.status === 'preparing' || order.status === 'ready'
      ).filter(order => order.items.some(item => item.type === 'drink'))), 300);
    });
  }

  async updateOrderStatus(orderId: string, newStatus: Order['status'], updateContextStatusFn: (orderId: string, newStatus: Order['status']) => Promise<void>): Promise<void> {
    await updateContextStatusFn(orderId, newStatus);
  }

  async approveOrder(orderId: string, approveContextOrderFn: (orderId: string) => Promise<void>): Promise<void> {
    await approveContextOrderFn(orderId);
  }

  async updateOrderItemStatus(orderId: string, itemId: string, newStatus: OrderItem['status'], updateContextOrderItemStatusFn: (orderId: string, itemId: string, newStatus: OrderItem['status']) => Promise<void>): Promise<void> {
    await updateContextOrderItemStatusFn(orderId, itemId, newStatus);
  }
}