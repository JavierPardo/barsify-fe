import { useEffect, useState } from "react";
import { useAppContext } from "../../context";
import type { Order } from "../../types";
import { LoadingSpinner } from "../atom";
import { OrderList, RoleDashboard } from "../organism";
import { OrderService } from "../../service";

const orderService = new OrderService();

export const AccountantPage: React.FC = () => {
  const { orders } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [accountantOrders, setAccountantOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      const allOrders = await orderService.getAllOrders(orders); // Pasa 'orders' del contexto
      setAccountantOrders(allOrders);
      setIsLoading(false);
    };
    fetchOrders();

    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [orders]);

  const totalRevenue = accountantOrders
    .filter(order => order.isPaid && ['accepted', 'preparing', 'ready', 'delivered', 'picked-up', 'served'].includes(order.status))
    .reduce((sum, order) => sum + order.total, 0);

  const pendingPayments = accountantOrders
    .filter(order => !order.isPaid && order.status !== 'cancelled')
    .reduce((sum, order) => sum + order.total, 0);

  if (isLoading) return <LoadingSpinner />;

  return (
    <RoleDashboard role="accountant">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-100 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold text-green-800 mb-2">Ingresos Totales (Órdenes Pagadas)</h3>
          <p className="text-4xl font-extrabold text-green-700">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold text-yellow-800 mb-2">Pagos Pendientes (Órdenes No Pagadas)</h3>
          <p className="text-4xl font-extrabold text-yellow-700">${pendingPayments.toFixed(2)}</p>
        </div>
      </div>

      <OrderList
        title="Todas las Órdenes para Contabilidad"
        orders={accountantOrders}
        showCustomerInfo={true}
        showPaymentInfo={true}
      />
    </RoleDashboard>
  );
};