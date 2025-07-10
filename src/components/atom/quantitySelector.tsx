import { Button } from "./button";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center space-x-2">
      <Button onClick={onDecrease} size="sm" variant="secondary" className="w-8 h-8 flex items-center justify-center p-0">-</Button>
      <span className="text-lg font-semibold w-6 text-center">{quantity}</span>
      <Button onClick={onIncrease} size="sm" variant="secondary" className="w-8 h-8 flex items-center justify-center p-0">+</Button>
    </div>
  );
};