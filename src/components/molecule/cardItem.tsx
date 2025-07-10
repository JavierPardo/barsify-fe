import type { OrderItem } from "../../types";
import { Button, QuantitySelector } from "../atom";


interface CartItemProps {
  item: OrderItem;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemoveItem }) => {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm mb-2">
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">{item.name}</h4>
        <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-3">
        <QuantitySelector
          quantity={item.quantity}
          onIncrease={() => onUpdateQuantity(item.id, item.quantity + 1)}
          onDecrease={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
        />
        <span className="font-bold text-gray-700 w-16 text-right">${(item.price * item.quantity).toFixed(2)}</span>
        <Button variant="danger" size="sm" onClick={() => onRemoveItem(item.id)} className="p-1 w-8 h-8 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </Button>
      </div>
    </div>
  );
};