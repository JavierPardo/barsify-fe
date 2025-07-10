import { useAppContext } from "../../context";
import type { Order } from "../../types";
import { CustomerOrderForm } from "../organism";

export const CustomerPage: React.FC = () => {
  const { menuItems } = useAppContext();
  const handleOrderPlaced = (order: Order) => {
    console.log('Order placed:', order);
    // Aquí podrías redirigir al cliente a una página de confirmación
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-orange-100 py-8">
      <CustomerOrderForm menuItems={menuItems} onOrderPlaced={handleOrderPlaced} />
    </div>
  );
};