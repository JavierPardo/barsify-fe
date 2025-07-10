import type { Order } from "../../types";

interface OrderStatusDisplayProps {
  status: Order['status'];
}

export const OrderStatusDisplay: React.FC<OrderStatusDisplayProps> = ({ status }) => {
  let statusText = '';
  let statusColor = 'text-gray-700';

  switch (status) {
    case 'pending':
      statusText = 'Pendiente de Aprobación';
      statusColor = 'text-yellow-600';
      break;
    case 'accepted':
      statusText = 'Aceptada';
      statusColor = 'text-blue-600';
      break;
    case 'preparing':
      statusText = 'En Preparación';
      statusColor = 'text-orange-600';
      break;
    case 'ready':
      statusText = 'Lista para Entrega/Recoger/Servir';
      statusColor = 'text-green-600';
      break;
    case 'delivered':
      statusText = 'Entregada';
      statusColor = 'text-green-800';
      break;
    case 'picked-up':
      statusText = 'Recogida';
      statusColor = 'text-green-800';
      break;
    case 'served':
      statusText = 'Servida';
      statusColor = 'text-green-800';
      break;
    case 'cancelled':
      statusText = 'Cancelada';
      statusColor = 'text-red-700';
      break;
    default:
      statusText = 'Desconocido';
      statusColor = 'text-gray-500';
  }

  return (
    <span className={`font-semibold ${statusColor}`}>
      {statusText}
    </span>
  );
};
