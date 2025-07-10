import { Input } from "../atom";

interface TableNumberInputProps {
  tableNumber: string;
  onTableNumberChange: (tableNumber: string) => void;
}

export const TableNumberInput: React.FC<TableNumberInputProps> = ({ tableNumber, onTableNumberChange }) => {
  return (
    <Input
      label="Número de Mesa"
      type="number"
      placeholder="Ej: 7"
      value={tableNumber}
      onChange={(e) => onTableNumberChange(e.target.value)}
      min="1"
      required
    />
  );
};