import { Button } from "../atom";

interface PaymentSectionProps {
  onPay: () => void;
  onSkipPayment: () => void;
  isProcessing: boolean;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({ onPay, onSkipPayment, isProcessing }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Opciones de Pago</h3>
      <p className="text-gray-600 mb-4">Puede pagar ahora o su orden quedará pendiente de aprobación por el administrador.</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={onPay} disabled={isProcessing} className="flex-1" variant="success">
          {isProcessing ? 'Procesando...' : 'Pagar Ahora'}
        </Button>
        <Button onClick={onSkipPayment} disabled={isProcessing} className="flex-1" variant="secondary">
          Pagar Después
        </Button>
      </div>
    </div>
  );
};