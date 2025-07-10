import type { MenuItem } from "../../types";
import { Button } from "./button";

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-4 transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-red-200"
        onError={(e) => { e.currentTarget.src = `https://placehold.co/150x150/F87171/FFFFFF?text=${item.name.split(' ')[0]}`; }}
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{item.name}</h3>
      <p className="text-gray-600 text-sm text-center mb-3">{item.description}</p>
      <div className="flex items-center justify-between w-full">
        <span className="text-red-600 font-bold text-lg">${item.price.toFixed(2)}</span>
        <Button onClick={() => onAddToCart(item)} size="sm">
          Añadir
        </Button>
      </div>
    </div>
  );
};