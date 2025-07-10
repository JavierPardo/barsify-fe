import { useEffect, useState } from "react";
import type { Order } from "../../types";
import { LoadingSpinner } from "../atom";
import { OrderList, RoleDashboard } from "../organism";
import { OrderService } from "../../service";
import { useAppContext } from "../../context";

const orderService = new OrderService();

export const AdminPage: React.FC = () => {
    const { orders, approveUnpaidOrder, updateOrderStatus } = useAppContext();
    const [isLoading, setIsLoading] = useState(true);
    const [adminOrders, setAdminOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            const allOrders = await orderService.getAllOrders(orders); // Pasa 'orders' del contexto
            setAdminOrders(allOrders);
            setIsLoading(false);
        };
        fetchOrders();

        const interval = setInterval(fetchOrders, 5000);
        return () => clearInterval(interval);
    }, [orders]);

    const handleApproveOrder = async (orderId: string) => {
        await orderService.approveOrder(orderId, approveUnpaidOrder); // Pasa la función del contexto
    };

    const handleUpdateStatus = async (orderId: string, newStatus: Order['status']) => {
        await orderService.updateOrderStatus(orderId, newStatus, updateOrderStatus); // Pasa la función del contexto
    };

    if (isLoading) return <LoadingSpinner />;

    const pendingApprovalOrders = adminOrders.filter(o => o.status === 'pending' && !o.isPaid && !o.approvedByAdmin);
    const allOtherOrders = adminOrders.filter(o => !(o.status === 'pending' && !o.isPaid && !o.approvedByAdmin));

    return (
        <RoleDashboard role="admin">
            <OrderList
                title="Órdenes Pendientes de Aprobación"
                orders={pendingApprovalOrders}
                showCustomerInfo={true}
                showPaymentInfo={true}
                showAdminActions={true}
                onApproveOrder={handleApproveOrder}
            />
            <div className="mt-8">
                <OrderList
                    title="Todas las Demás Órdenes"
                    orders={allOtherOrders}
                    showCustomerInfo={true}
                    showPaymentInfo={true}
                    showWaiterActions={true} // Admin puede también cambiar estados
                    onUpdateStatus={handleUpdateStatus}
                />
            </div>
        </RoleDashboard>
    );
};