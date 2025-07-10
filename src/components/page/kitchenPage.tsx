import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context";
import type { Order, OrderItem } from "../../types";
import { LoadingSpinner } from "../atom";
import { OrderList, RoleDashboard } from "../organism";
import { OrderService } from "../../service";

const orderService = new OrderService();

export const KitchenPage: React.FC = () => {
  const { orders, updateOrderItemStatus } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [kitchenOrders, setKitchenOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchKitchenOrders = async () => {
      setIsLoading(true);
      const ordersData = await orderService.getKitchenOrders(orders); // Pasa 'orders' del contexto
      setKitchenOrders(ordersData);
      setIsLoading(false);
    };
    fetchKitchenOrders();

    const interval = setInterval(fetchKitchenOrders, 5000);
    return () => clearInterval(interval);
  }, [orders]);

  const handleUpdateItemStatus = async (orderId: string, itemId: string, newStatus: OrderItem['status']) => {
    await orderService.updateOrderItemStatus(orderId, itemId, newStatus, updateOrderItemStatus); // Pasa la función del contexto
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <RoleDashboard role="cook">
      <OrderList
        title="Órdenes de Cocina"
        orders={kitchenOrders}
        showCustomerInfo={true}
        showKitchenBarActions={true}
        onUpdateOrderItemStatus={handleUpdateItemStatus}
      />
    </RoleDashboard>
  );
};