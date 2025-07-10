import type { OrderItem } from "./orderItem";

export interface Order {
  id: string;
  customerName: string; // Para delivery/pickup, o simplemente un identificador
  orderType: 'delivery' | 'pickup' | 'dine-in';
  tableNumber?: number; // Solo para dine-in
  deliveryAddress?: string; // Solo para delivery
  items: OrderItem[];
  total: number;
  isPaid: boolean;
  status: 'pending' | 'accepted' | 'preparing' | 'ready' | 'delivered' | 'picked-up' | 'served' | 'cancelled'; // Estado general de la orden
  createdAt: string;
  approvedByAdmin?: boolean; // Solo para órdenes no pagadas
}