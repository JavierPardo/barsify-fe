import { useEffect, useState } from "react";
import { useAppContext } from "../../context";
import { LoadingSpinner } from "../atom";
import { OrderList, RoleDashboard } from "../organism";
import { OrderService } from "../../service";
import type { Order, OrderItem } from "../../types";

const orderService = new OrderService();

export const BarPage: React.FC = () => {
  const { orders, updateOrderItemStatus } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [barOrders, setBarOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchBarOrders = async () => {
      setIsLoading(true);
      const ordersData = await orderService.getBarOrders(orders); // Pasa 'orders' del contexto
      setBarOrders(ordersData);
      setIsLoading(false);
    };
    fetchBarOrders();

    const interval = setInterval(fetchBarOrders, 5000);
    return () => clearInterval(interval);
  }, [orders]);

  const handleUpdateItemStatus = async (orderId: string, itemId: string, newStatus: OrderItem['status']) => {
    await orderService.updateOrderItemStatus(orderId, itemId, newStatus, updateOrderItemStatus); // Pasa la función del contexto
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <RoleDashboard role="bartender">
      <OrderList
        title="Órdenes de Bar"
        orders={barOrders}
        showCustomerInfo={true}
        showKitchenBarActions={true}
        onUpdateOrderItemStatus={handleUpdateItemStatus}
      />
    </RoleDashboard>
  );
};