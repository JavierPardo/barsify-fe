import { useState } from "react";
import type { MenuItem, Order, OrderItem } from "../../types";
import { useAppContext } from "../../context";
import { OrderService } from "../../service";
import { Input, MenuItemCard, Modal } from "../atom";
import { AddressForm, CartItem, OrderTypeSelector, PaymentSection, TableNumberInput } from "../molecule";

interface CustomerOrderFormProps {
  menuItems: MenuItem[];
  onOrderPlaced: (order: Order) => void;
}

export const CustomerOrderForm: React.FC<CustomerOrderFormProps> = ({ menuItems, onOrderPlaced }) => {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [orderType, setOrderType] = useState<'delivery' | 'pickup' | 'dine-in'>('delivery');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const { addOrder } = useAppContext(); // Usa el hook aquí, dentro del componente
const orderService = new OrderService(); // Instancia única

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1, status: 'pending' }];
    });
  };

  const updateCartItemQuantity = (itemId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeCartItem = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = async (isPaid: boolean) => {
    if (cart.length === 0) {
      setModalTitle('Carrito Vacío');
      setModalMessage('Por favor, añade algunos ítems a tu orden antes de continuar.');
      setIsModalOpen(true);
      return;
    }

    if (!customerName.trim()) {
      setModalTitle('Información Faltante');
      setModalMessage('Por favor, ingresa tu nombre.');
      setIsModalOpen(true);
      return;
    }

    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      setModalTitle('Información Faltante');
      setModalMessage('Por favor, ingresa tu dirección de entrega para pedidos a domicilio.');
      setIsModalOpen(true);
      return;
    }

    if (orderType === 'dine-in' && !tableNumber.trim()) {
      setModalTitle('Información Faltante');
      setModalMessage('Por favor, ingresa el número de mesa para pedidos en mesa.');
      setIsModalOpen(true);
      return;
    }

    setIsProcessingOrder(true);
    try {
      const newOrder: Omit<Order, 'id' | 'createdAt' | 'status' | 'approvedByAdmin'> = {
        customerName: customerName.trim(),
        orderType,
        items: cart,
        total: calculateTotal(),
        isPaid,
        ...(orderType === 'delivery' && { deliveryAddress }),
        ...(orderType === 'dine-in' && { tableNumber: parseInt(tableNumber) }),
      };

      // Pasa la función addOrder del contexto al servicio
      const placedOrder = await orderService.createOrder(newOrder, addOrder);
      onOrderPlaced(placedOrder); // Notifica al componente padre
      setCart([]); // Limpiar carrito
      setDeliveryAddress('');
      setTableNumber('');
      setCustomerName('');

      setModalTitle('¡Orden Realizada!');
      setModalMessage(`Tu orden #${placedOrder.id} ha sido recibida. Estado: ${placedOrder.isPaid ? 'Aceptada' : 'Pendiente de Aprobación'}.`);
      setIsModalOpen(true);

    } catch (error) {
      setModalTitle('Error al Realizar Orden');
      setModalMessage('Hubo un problema al procesar tu orden. Por favor, inténtalo de nuevo.');
      setIsModalOpen(true);
      console.error('Error placing order:', error);
    } finally {
      setIsProcessingOrder(false);
    }
  };

  // Agrupa los ítems del menú por categoría
  const groupedMenuItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<MenuItem['category'], MenuItem[]>);

  // Define el orden de las categorías
  const categoryOrder: MenuItem['category'][] = [
    'Entrantes',
    'Platos Fuertes',
    'Guarniciones',
    'Bebidas sin Alcohol',
    'Bebidas con Alcohol',
    'Bebidas Calientes',
    'Postres',
  ];

  return (
    <div className="container mx-auto p-4 bg-gray-50 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Realizar Pedido</h2>

      <Input
        label="Tu Nombre"
        type="text"
        placeholder="Ej: Juan Pérez"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        required
      />

      <OrderTypeSelector selectedType={orderType} onSelectType={setOrderType} />

      {orderType === 'delivery' && (
        <AddressForm address={deliveryAddress} onAddressChange={setDeliveryAddress} />
      )}
      {orderType === 'dine-in' && (
        <TableNumberInput tableNumber={tableNumber} onTableNumberChange={setTableNumber} />
      )}

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Nuestro Menú</h3>
        {categoryOrder.map(category => {
          const itemsInCategory = groupedMenuItems[category];
          if (!itemsInCategory || itemsInCategory.length === 0) {
            return null;
          }
          return (
            <div key={category} className="mb-8">
              <h4 className="text-2xl font-bold text-gray-700 mb-4 border-b-2 border-red-300 pb-2">{category}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {itemsInCategory.map((item) => (
                  <MenuItemCard key={item.id} item={item} onAddToCart={addToCart} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Tu Carrito ({cart.length} ítems)</h3>
        {cart.length === 0 ? (
          <p className="text-gray-600 text-center">Tu carrito está vacío. ¡Añade algo del menú!</p>
        ) : (
          <>
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateCartItemQuantity}
                onRemoveItem={removeCartItem}
              />
            ))}
            <div className="border-t pt-4 mt-4 flex justify-between items-center">
              <span className="text-xl font-bold text-gray-800">Total:</span>
              <span className="text-2xl font-extrabold text-red-600">${calculateTotal().toFixed(2)}</span>
            </div>
          </>
        )}
      </div>

      <PaymentSection
        onPay={() => handlePlaceOrder(true)}
        onSkipPayment={() => handlePlaceOrder(false)}
        isProcessing={isProcessingOrder}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalTitle}>
        <p className="text-gray-700">{modalMessage}</p>
      </Modal>
    </div>
  );
};