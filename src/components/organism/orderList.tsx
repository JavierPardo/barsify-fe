import { useState } from "react";
import type { Order, OrderItem } from "../../types";
import { Button, Modal } from "../atom";
import { OrderStatusDisplay } from "../molecule";

interface OrderListProps {
  orders: Order[];
  title: string;
  onUpdateStatus?: (orderId: string, newStatus: Order['status']) => void;
  onApproveOrder?: (orderId: string) => void;
  onUpdateOrderItemStatus?: (orderId: string, itemId: string, newStatus: OrderItem['status']) => void;
  showCustomerInfo?: boolean;
  showPaymentInfo?: boolean;
  showAdminActions?: boolean;
  showWaiterActions?: boolean;
  showKitchenBarActions?: boolean;
}

export const OrderList: React.FC<OrderListProps> = ({
  orders,
  title,
  onUpdateStatus,
  onApproveOrder,
  onUpdateOrderItemStatus,
  showCustomerInfo = false,
  showPaymentInfo = false,
  showAdminActions = false,
  showWaiterActions = false,
  showKitchenBarActions = false,
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openOrderDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const selectedOrder = orders.find(order => order.id === selectedOrderId);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{title}</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">No hay órdenes para mostrar.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-gray-800">Orden #{order.id}</h3>
                <OrderStatusDisplay status={order.status} />
              </div>
              {showCustomerInfo && (
                <p className="text-gray-700">
                  <span className="font-semibold">Cliente:</span> {order.customerName}
                  {order.orderType === 'dine-in' && ` (Mesa: ${order.tableNumber})`}
                  {order.orderType === 'delivery' && ` (Dir: ${order.deliveryAddress})`}
                </p>
              )}
              <p className="text-gray-700">
                <span className="font-semibold">Tipo:</span> {order.orderType === 'delivery' ? 'A Domicilio' : order.orderType === 'pickup' ? 'Para Recoger' : 'En Mesa'}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Total:</span> <span className="font-bold text-red-600">${order.total.toFixed(2)}</span>
              </p>
              {showPaymentInfo && (
                <p className="text-gray-700">
                  <span className="font-semibold">Pago:</span>{' '}
                  <span className={order.isPaid ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                    {order.isPaid ? 'Pagado' : 'Pendiente'}
                  </span>
                  {order.isPaid === false && order.approvedByAdmin === false && (
                    <span className="ml-2 text-yellow-600 text-sm">(Requiere Aprobación)</span>
                  )}
                </p>
              )}
              <p className="text-gray-700 text-sm mt-1">
                <span className="font-semibold">Fecha:</span> {new Date(order.createdAt).toLocaleString()}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <Button variant="secondary" size="sm" onClick={() => openOrderDetails(order.id)}>
                  Ver Detalles
                </Button>

                {showAdminActions && !order.isPaid && !order.approvedByAdmin && order.status === 'pending' && onApproveOrder && (
                  <Button variant="success" size="sm" onClick={() => onApproveOrder(order.id)}>
                    Aprobar Orden
                  </Button>
                )}

                {showWaiterActions && onUpdateStatus && (
                  <>
                    {order.status === 'accepted' && (
                      <Button variant="primary" size="sm" onClick={() => onUpdateStatus(order.id, 'preparing')}>
                        Iniciar Preparación
                      </Button>
                    )}
                    {order.status === 'ready' && order.orderType === 'dine-in' && (
                      <Button variant="success" size="sm" onClick={() => onUpdateStatus(order.id, 'served')}>
                        Marcar Servida
                      </Button>
                    )}
                    {order.status === 'ready' && order.orderType === 'delivery' && (
                      <Button variant="success" size="sm" onClick={() => onUpdateStatus(order.id, 'delivered')}>
                        Marcar Entregada
                      </Button>
                    )}
                    {order.status === 'ready' && order.orderType === 'pickup' && (
                      <Button variant="success" size="sm" onClick={() => onUpdateStatus(order.id, 'picked-up')}>
                        Marcar Recogida
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Detalles de Orden #${selectedOrder.id}`}>
          <div className="space-y-3">
            <p><span className="font-semibold">Cliente:</span> {selectedOrder.customerName}</p>
            <p><span className="font-semibold">Tipo de Orden:</span> {selectedOrder.orderType === 'delivery' ? 'A Domicilio' : selectedOrder.orderType === 'pickup' ? 'Para Recoger' : 'En Mesa'}</p>
            {selectedOrder.orderType === 'dine-in' && <p><span className="font-semibold">Mesa:</span> {selectedOrder.tableNumber}</p>}
            {selectedOrder.orderType === 'delivery' && <p><span className="font-semibold">Dirección:</span> {selectedOrder.deliveryAddress}</p>}
            <p><span className="font-semibold">Estado General:</span> <OrderStatusDisplay status={selectedOrder.status} /></p>
            <p><span className="font-semibold">Total:</span> ${selectedOrder.total.toFixed(2)}</p>
            <p><span className="font-semibold">Pagada:</span> {selectedOrder.isPaid ? 'Sí' : 'No'}</p>
            {!selectedOrder.isPaid && !selectedOrder.approvedByAdmin && (
              <p className="text-yellow-600 font-semibold">Pendiente de aprobación del administrador.</p>
            )}

            <h4 className="text-lg font-bold mt-4 mb-2">Ítems de la Orden:</h4>
            <ul className="space-y-2">
              {selectedOrder.items.map(item => (
                <li key={item.id} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                  <div>
                    <span className="font-semibold">{item.name}</span> x {item.quantity} (${item.price.toFixed(2)} c/u)
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Estado: {item.status === 'pending' ? 'Pendiente' : item.status === 'preparing' ? 'Preparando' : item.status === 'ready' ? 'Listo' : 'Servido'}</span>
                    {showKitchenBarActions && onUpdateOrderItemStatus && (
                      <>
                        {item.status === 'pending' && (
                          <Button size="sm" variant="primary" onClick={() => onUpdateOrderItemStatus(selectedOrder.id, item.id, 'preparing')}>
                            Preparar
                          </Button>
                        )}
                        {item.status === 'preparing' && (
                          <Button size="sm" variant="success" onClick={() => onUpdateOrderItemStatus(selectedOrder.id, item.id, 'ready')}>
                            Listo
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      )}
    </div>
  );
};