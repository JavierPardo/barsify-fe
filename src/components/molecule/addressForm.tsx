import { Input } from "../atom";

interface AddressFormProps {
  address: string;
  onAddressChange: (address: string) => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({ address, onAddressChange }) => {
  return (
    <Input
      label="Dirección de Entrega"
      type="text"
      placeholder="Ej: Calle Principal 123"
      value={address}
      onChange={(e) => onAddressChange(e.target.value)}
      required
    />
  );
};
