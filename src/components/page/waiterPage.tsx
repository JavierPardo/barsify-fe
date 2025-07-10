import { useEffect, useState } from "react";
import { useAppContext } from "../../context";
import type { Order } from "../../types";
import { OrderService } from "../../service";
import { LoadingSpinner } from "../atom";
import { OrderList, RoleDashboard } from "../organism";

const orderService = new OrderService();

export const WaiterPage: React.FC = () => {
  const { orders, updateOrderStatus } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [waiterOrders, setWaiterOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      // En un caso real, un mesero podría ver todas las órdenes o solo las de su sección
      const allOrders = await orderService.getAllOrders(orders); // Pasa 'orders' del contexto
      setWaiterOrders(allOrders);
      setIsLoading(false);
    };
    fetchOrders();

    // Simula polling para actualizaciones en tiempo real (cada 5 segundos)
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [orders]); // Dependencia 'orders' para re-fetch cuando el contexto cambie

  const handleUpdateStatus = async (orderId: string, newStatus: Order['status']) => {
    await orderService.updateOrderStatus(orderId, newStatus, updateOrderStatus); // Pasa la función del contexto
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <RoleDashboard role="waiter">
      <OrderList
        title="Órdenes Activas"
        orders={waiterOrders.filter(o => !['delivered', 'picked-up', 'served', 'cancelled'].includes(o.status))}
        showCustomerInfo={true}
        showPaymentInfo={true}
        showWaiterActions={true}
        onUpdateStatus={handleUpdateStatus}
      />
      <div className="mt-8">
        <OrderList
          title="Órdenes Completadas"
          orders={waiterOrders.filter(o => ['delivered', 'picked-up', 'served'].includes(o.status))}
          showCustomerInfo={true}
          showPaymentInfo={true}
        />
      </div>
    </RoleDashboard>
  );
};