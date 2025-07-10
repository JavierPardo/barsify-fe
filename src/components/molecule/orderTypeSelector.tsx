
interface OrderTypeSelectorProps {
  selectedType: 'delivery' | 'pickup' | 'dine-in';
  onSelectType: (type: 'delivery' | 'pickup' | 'dine-in') => void;
}

export const OrderTypeSelector: React.FC<OrderTypeSelectorProps> = ({ selectedType, onSelectType }) => {
  return (
    <div className="flex justify-around bg-gray-100 p-2 rounded-lg shadow-inner mb-4">
      {['delivery', 'pickup', 'dine-in'].map((type) => (
        <button
          key={type}
          className={`px-4 py-2 rounded-lg font-semibold transition duration-200 ${selectedType === type
            ? 'bg-red-500 text-white shadow-md'
            : 'bg-transparent text-gray-700 hover:bg-gray-200'
            }`}
          onClick={() => onSelectType(type as 'delivery' | 'pickup' | 'dine-in')}
        >
          {type === 'delivery' ? 'A Domicilio' : type === 'pickup' ? 'Para Recoger' : 'En Mesa'}
        </button>
      ))}
    </div>
  );
};