import React, { useState, useEffect, createContext, useContext, type ReactNode, useCallback } from 'react';

// --- Contexto Global (Simula el estado del backend) ---
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'food' | 'drink';
  status: 'pending' | 'preparing' | 'ready' | 'served'; // Estado del item individual
}

interface Order {
  id: string;
  customerName: string; // Para delivery/pickup, o simplemente un identificador
  orderType: 'delivery' | 'pickup' | 'dine-in';
  tableNumber?: number; // Solo para dine-in
  deliveryAddress?: string; // Solo para delivery
  items: OrderItem[];
  total: number;
  isPaid: boolean;
  status: 'pending' | 'accepted' | 'preparing' | 'ready' | 'delivered' | 'picked-up' | 'served' | 'cancelled'; // Estado general de la orden
  createdAt: string;
  approvedByAdmin?: boolean; // Solo para órdenes no pagadas
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  type: 'food' | 'drink';
  category: 'Entrantes' | 'Platos Fuertes' | 'Guarniciones' | 'Bebidas con Alcohol' | 'Bebidas sin Alcohol' | 'Bebidas Calientes' | 'Postres';
}

interface AppContextType {
  currentRole: 'customer' | 'admin' | 'accountant' | 'waiter' | 'bartender' | 'cook';
  setCurrentRole: (role: AppContextType['currentRole']) => void;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  menuItems: MenuItem[];
  addOrder: (order: Order) => Promise<void>;
  updateOrderStatus: (orderId: string, newStatus: Order['status']) => Promise<void>;
  approveUnpaidOrder: (orderId: string) => Promise<void>;
  updateOrderItemStatus: (orderId: string, itemId: string, newStatus: OrderItem['status']) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// --- Mock Data (Simula la base de datos con categorías) ---
const MOCK_MENU_ITEMS: MenuItem[] = [
  { id: 'm1', name: 'Alitas BBQ', description: '6 alitas de pollo con salsa BBQ', price: 8.50, imageUrl: 'https://placehold.co/150x150/F87171/FFFFFF?text=Alitas', type: 'food', category: 'Entrantes' },
  { id: 'm2', name: 'Nachos Supreme', description: 'Nachos con queso, jalapeños y carne', price: 9.00, imageUrl: 'https://placehold.co/150x150/F87171/FFFFFF?text=Nachos', type: 'food', category: 'Entrantes' },
  { id: 'm3', name: 'Hamburguesa Clásica', description: 'Carne, queso, lechuga, tomate', price: 12.50, imageUrl: 'https://placehold.co/150x150/F87171/FFFFFF?text=Burger', type: 'food', category: 'Platos Fuertes' },
  { id: 'm4', name: 'Pizza Pepperoni', description: 'Pepperoni, mozzarella, salsa de tomate', price: 18.00, imageUrl: 'https://placehold.co/150x150/F87171/FFFFFF?text=Pizza', type: 'food', category: 'Platos Fuertes' },
  { id: 'm5', name: 'Ensalada César con Pollo', description: 'Lechuga, pollo, crutones, aderezo César', price: 10.00, imageUrl: 'https://placehold.co/150x150/F87171/FFFFFF?text=Salad', type: 'food', category: 'Platos Fuertes' },
  { id: 'm6', name: 'Papas Fritas', description: 'Porción grande de papas fritas', price: 5.00, imageUrl: 'https://placehold.co/150x150/F87171/FFFFFF?text=Fries', type: 'food', category: 'Guarniciones' },
  { id: 'm7', name: 'Arroz Blanco', description: 'Porción de arroz al vapor', price: 3.00, imageUrl: 'https://placehold.co/150x150/F87171/FFFFFF?text=Arroz', type: 'food', category: 'Guarniciones' },
  { id: 'm8', name: 'Coca-Cola', description: 'Bebida refrescante', price: 3.00, imageUrl: 'https://placehold.co/150x150/60A5FA/FFFFFF?text=Coke', type: 'drink', category: 'Bebidas sin Alcohol' },
  { id: 'm9', name: 'Jugo de Naranja', description: 'Jugo natural de naranja', price: 4.50, imageUrl: 'https://placehold.co/150x150/60A5FA/FFFFFF?text=Juice', type: 'drink', category: 'Bebidas sin Alcohol' },
  { id: 'm10', name: 'Cerveza Artesanal', description: 'Cerveza local', price: 7.00, imageUrl: 'https://placehold.co/150x150/60A5FA/FFFFFF?text=Beer', type: 'drink', category: 'Bebidas con Alcohol' },
  { id: 'm11', name: 'Vino Tinto', description: 'Copa de vino tinto de la casa', price: 8.00, imageUrl: 'https://placehold.co/150x150/60A5FA/FFFFFF?text=Wine', type: 'drink', category: 'Bebidas con Alcohol' },
  { id: 'm12', name: 'Café Expreso', description: 'Café fuerte y concentrado', price: 3.50, imageUrl: 'https://placehold.co/150x150/60A5FA/FFFFFF?text=Coffee', type: 'drink', category: 'Bebidas Calientes' },
  { id: 'm13', name: 'Té de Manzanilla', description: 'Infusión relajante de manzanilla', price: 3.00, imageUrl: 'https://placehold.co/150x150/60A5FA/FFFFFF?text=Tea', type: 'drink', category: 'Bebidas Calientes' },
  { id: 'm14', name: 'Tarta de Queso', description: 'Porción de tarta de queso con frutos rojos', price: 6.00, imageUrl: 'https://placehold.co/150x150/F87171/FFFFFF?text=Cheesecake', type: 'food', category: 'Postres' },
  { id: 'm15', name: 'Helado de Vainilla', description: 'Dos bolas de helado de vainilla', price: 4.00, imageUrl: 'https://placehold.co/150x150/F87171/FFFFFF?text=IceCream', type: 'food', category: 'Postres' },
];

const initialOrders: Order[] = [
  {
    id: 'ORD001',
    customerName: 'Cliente Demo',
    orderType: 'dine-in',
    tableNumber: 5,
    items: [
      { id: 'm3', name: 'Hamburguesa Clásica', price: 12.50, quantity: 1, type: 'food', status: 'preparing' },
      { id: 'm8', name: 'Coca-Cola', price: 3.00, quantity: 2, type: 'drink', status: 'preparing' },
    ],
    total: 18.50,
    isPaid: true,
    status: 'preparing',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ORD002',
    customerName: 'Maria Garcia',
    orderType: 'delivery',
    deliveryAddress: 'Calle Falsa 123, Ciudad',
    items: [
      { id: 'm4', name: 'Pizza Pepperoni', price: 18.00, quantity: 1, type: 'food', status: 'pending' },
      { id: 'm9', name: 'Jugo de Naranja', price: 4.50, quantity: 1, type: 'drink', status: 'pending' },
    ],
    total: 22.50,
    isPaid: false,
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000).toISOString(), // Hace 1 hora
    approvedByAdmin: false,
  },
];

// --- Proveedor del Contexto ---
const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<AppContextType['currentRole']>('customer');
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [menuItems] = useState<MenuItem[]>(MOCK_MENU_ITEMS);

  // Simula una llamada a la API con un retraso
  const simulateApiCall = <T,>(data: T): Promise<T> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 500); // 500ms de retraso
    });
  };

  const addOrder = useCallback(async (newOrder: Order) => {
    // Simula la lógica del backend para aceptar órdenes
    const finalStatus: 'pending' | 'accepted' | 'preparing' | 'ready' | 'delivered' | 'picked-up' | 'served' | 'cancelled' = newOrder.isPaid ? 'accepted' : 'pending';
    const orderToSave = { ...newOrder, status: finalStatus, approvedByAdmin: newOrder.isPaid };
    const savedOrder: Order = await simulateApiCall<Order>(orderToSave); // Simula guardar en DB
    setOrders((prevOrders) => [...prevOrders, savedOrder]);
  }, []);

  const updateOrderStatus = useCallback(async (orderId: string, newStatus: Order['status']) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    await simulateApiCall(updatedOrders); // Simula actualizar en DB
    setOrders(updatedOrders);
  }, [orders]);

  const approveUnpaidOrder = useCallback(async (orderId: string) => {
    const updatedOrders: Order[] = orders.map((order) =>
      order.id === orderId && !order.isPaid && !order.approvedByAdmin
        ? { ...order, status: 'accepted', approvedByAdmin: true }
        : order
    );
    await simulateApiCall(updatedOrders); // Simula actualizar en DB
    setOrders(updatedOrders);
  }, [orders]);

  const updateOrderItemStatus = useCallback(async (orderId: string, itemId: string, newStatus: OrderItem['status']) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        const updatedItems = order.items.map(item =>
          item.id === itemId ? { ...item, status: newStatus } : item
        );
        // Opcional: Actualizar el estado de la orden si todos los items están listos
        const allItemsReady = updatedItems.every(item => item.status === 'ready' || item.status === 'served');
        const newOrderStatus = allItemsReady ? 'ready' : order.status;

        return { ...order, items: updatedItems, status: newOrderStatus };
      }
      return order;
    });
    await simulateApiCall(updatedOrders);
    setOrders(updatedOrders);
  }, [orders]);

  const contextValue = {
    currentRole,
    setCurrentRole,
    orders,
    setOrders,
    menuItems,
    addOrder,
    updateOrderStatus,
    approveUnpaidOrder,
    updateOrderItemStatus,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizado para usar el contexto
const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// --- Services Layer (Simula llamadas a 3rd party server) ---
// Estos servicios usarían 'fetch' o 'axios' en un entorno real.
// Ahora, interactúan con los datos pasados como argumentos en lugar de usar useAppContext directamente.


class OrderService {
  async createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'approvedByAdmin'>, addOrderContextFn: (order: Order) => Promise<void>): Promise<Order> {
    const newOrder: Order = {
      ...orderData,
      id: `ORD${Date.now().toString().slice(-6)}`, // ID simple
      createdAt: new Date().toISOString(),
      status: orderData.isPaid ? 'accepted' : 'pending', // Lógica inicial del backend
      approvedByAdmin: orderData.isPaid,
    };
    await addOrderContextFn(newOrder);
    return newOrder;
  }

  async getOrderById(orderId: string, ordersContext: Order[]): Promise<Order | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(ordersContext.find(o => o.id === orderId)), 300);
    });
  }

  async getAllOrders(ordersContext: Order[]): Promise<Order[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(ordersContext), 300);
    });
  }

  async getKitchenOrders(ordersContext: Order[]): Promise<Order[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(ordersContext.filter(order =>
        order.status === 'accepted' || order.status === 'preparing' || order.status === 'ready'
      ).filter(order => order.items.some(item => item.type === 'food'))), 300);
    });
  }

  async getBarOrders(ordersContext: Order[]): Promise<Order[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(ordersContext.filter(order =>
        order.status === 'accepted' || order.status === 'preparing' || order.status === 'ready'
      ).filter(order => order.items.some(item => item.type === 'drink'))), 300);
    });
  }

  async updateOrderStatus(orderId: string, newStatus: Order['status'], updateContextStatusFn: (orderId: string, newStatus: Order['status']) => Promise<void>): Promise<void> {
    await updateContextStatusFn(orderId, newStatus);
  }

  async approveOrder(orderId: string, approveContextOrderFn: (orderId: string) => Promise<void>): Promise<void> {
    await approveContextOrderFn(orderId);
  }

  async updateOrderItemStatus(orderId: string, itemId: string, newStatus: OrderItem['status'], updateContextOrderItemStatusFn: (orderId: string, itemId: string, newStatus: OrderItem['status']) => Promise<void>): Promise<void> {
    await updateContextOrderItemStatusFn(orderId, itemId, newStatus);
  }
}
const orderService = new OrderService(); // Instancia única

// --- Atoms ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', children, className = '', ...props }) => {
  const baseStyles = 'font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out';
  const variantStyles = {
    primary: 'bg-red-500 hover:bg-red-600 text-white shadow-md',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-sm',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md',
    success: 'bg-green-500 hover:bg-green-600 text-white shadow-md',
  };
  const sizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg px-6 py-3',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
      <input
        className={`shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 ${className}`}
        {...props}
      />
    </div>
  );
};

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart }) => {
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

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center space-x-2">
      <Button onClick={onDecrease} size="sm" variant="secondary" className="w-8 h-8 flex items-center justify-center p-0">-</Button>
      <span className="text-lg font-semibold w-6 text-center">{quantity}</span>
      <Button onClick={onIncrease} size="sm" variant="secondary" className="w-8 h-8 flex items-center justify-center p-0">+</Button>
    </div>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        <div className="mb-6">
          {children}
        </div>
        {footer && <div className="border-t pt-4 flex justify-end space-x-2">{footer}</div>}
      </div>
    </div>
  );
};

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-red-500"></div>
  </div>
);

// --- Molecules ---
interface CartItemProps {
  item: OrderItem;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemoveItem }) => {
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

interface OrderTypeSelectorProps {
  selectedType: 'delivery' | 'pickup' | 'dine-in';
  onSelectType: (type: 'delivery' | 'pickup' | 'dine-in') => void;
}

const OrderTypeSelector: React.FC<OrderTypeSelectorProps> = ({ selectedType, onSelectType }) => {
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

interface PaymentSectionProps {
  onPay: () => void;
  onSkipPayment: () => void;
  isProcessing: boolean;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({ onPay, onSkipPayment, isProcessing }) => {
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

interface AddressFormProps {
  address: string;
  onAddressChange: (address: string) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ address, onAddressChange }) => {
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

interface TableNumberInputProps {
  tableNumber: string;
  onTableNumberChange: (tableNumber: string) => void;
}

const TableNumberInput: React.FC<TableNumberInputProps> = ({ tableNumber, onTableNumberChange }) => {
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

interface OrderStatusDisplayProps {
  status: Order['status'];
}

const OrderStatusDisplay: React.FC<OrderStatusDisplayProps> = ({ status }) => {
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


// --- Organisms ---
interface CustomerOrderFormProps {
  menuItems: MenuItem[];
  onOrderPlaced: (order: Order) => void;
}

const CustomerOrderForm: React.FC<CustomerOrderFormProps> = ({ menuItems, onOrderPlaced }) => {
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

interface OrderListProps {
  orders: Order[];
  title: string;
  onUpdateStatus?: (orderId: string, newStatus: Order['status']) => void;
  onApproveOrder?: (orderId: string) => void;
  onUpdateOrderItemStatus?: (orderId: string, itemId: string, newStatus: OrderItem['status']) => void;
  showCustomerInfo?: boolean;
  showPaymentInfo?: boolean;
  showAdminActions?: boolean;
  showWaiterActions?: boolean;
  showKitchenBarActions?: boolean;
}

const OrderList: React.FC<OrderListProps> = ({
  orders,
  title,
  onUpdateStatus,
  onApproveOrder,
  onUpdateOrderItemStatus,
  showCustomerInfo = false,
  showPaymentInfo = false,
  showAdminActions = false,
  showWaiterActions = false,
  showKitchenBarActions = false,
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openOrderDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const selectedOrder = orders.find(order => order.id === selectedOrderId);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{title}</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">No hay órdenes para mostrar.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-gray-800">Orden #{order.id}</h3>
                <OrderStatusDisplay status={order.status} />
              </div>
              {showCustomerInfo && (
                <p className="text-gray-700">
                  <span className="font-semibold">Cliente:</span> {order.customerName}
                  {order.orderType === 'dine-in' && ` (Mesa: ${order.tableNumber})`}
                  {order.orderType === 'delivery' && ` (Dir: ${order.deliveryAddress})`}
                </p>
              )}
              <p className="text-gray-700">
                <span className="font-semibold">Tipo:</span> {order.orderType === 'delivery' ? 'A Domicilio' : order.orderType === 'pickup' ? 'Para Recoger' : 'En Mesa'}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Total:</span> <span className="font-bold text-red-600">${order.total.toFixed(2)}</span>
              </p>
              {showPaymentInfo && (
                <p className="text-gray-700">
                  <span className="font-semibold">Pago:</span>{' '}
                  <span className={order.isPaid ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                    {order.isPaid ? 'Pagado' : 'Pendiente'}
                  </span>
                  {order.isPaid === false && order.approvedByAdmin === false && (
                    <span className="ml-2 text-yellow-600 text-sm">(Requiere Aprobación)</span>
                  )}
                </p>
              )}
              <p className="text-gray-700 text-sm mt-1">
                <span className="font-semibold">Fecha:</span> {new Date(order.createdAt).toLocaleString()}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <Button variant="secondary" size="sm" onClick={() => openOrderDetails(order.id)}>
                  Ver Detalles
                </Button>

                {showAdminActions && !order.isPaid && !order.approvedByAdmin && order.status === 'pending' && onApproveOrder && (
                  <Button variant="success" size="sm" onClick={() => onApproveOrder(order.id)}>
                    Aprobar Orden
                  </Button>
                )}

                {showWaiterActions && onUpdateStatus && (
                  <>
                    {order.status === 'accepted' && (
                      <Button variant="primary" size="sm" onClick={() => onUpdateStatus(order.id, 'preparing')}>
                        Iniciar Preparación
                      </Button>
                    )}
                    {order.status === 'ready' && order.orderType === 'dine-in' && (
                      <Button variant="success" size="sm" onClick={() => onUpdateStatus(order.id, 'served')}>
                        Marcar Servida
                      </Button>
                    )}
                    {order.status === 'ready' && order.orderType === 'delivery' && (
                      <Button variant="success" size="sm" onClick={() => onUpdateStatus(order.id, 'delivered')}>
                        Marcar Entregada
                      </Button>
                    )}
                    {order.status === 'ready' && order.orderType === 'pickup' && (
                      <Button variant="success" size="sm" onClick={() => onUpdateStatus(order.id, 'picked-up')}>
                        Marcar Recogida
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Detalles de Orden #${selectedOrder.id}`}>
          <div className="space-y-3">
            <p><span className="font-semibold">Cliente:</span> {selectedOrder.customerName}</p>
            <p><span className="font-semibold">Tipo de Orden:</span> {selectedOrder.orderType === 'delivery' ? 'A Domicilio' : selectedOrder.orderType === 'pickup' ? 'Para Recoger' : 'En Mesa'}</p>
            {selectedOrder.orderType === 'dine-in' && <p><span className="font-semibold">Mesa:</span> {selectedOrder.tableNumber}</p>}
            {selectedOrder.orderType === 'delivery' && <p><span className="font-semibold">Dirección:</span> {selectedOrder.deliveryAddress}</p>}
            <p><span className="font-semibold">Estado General:</span> <OrderStatusDisplay status={selectedOrder.status} /></p>
            <p><span className="font-semibold">Total:</span> ${selectedOrder.total.toFixed(2)}</p>
            <p><span className="font-semibold">Pagada:</span> {selectedOrder.isPaid ? 'Sí' : 'No'}</p>
            {!selectedOrder.isPaid && !selectedOrder.approvedByAdmin && (
              <p className="text-yellow-600 font-semibold">Pendiente de aprobación del administrador.</p>
            )}

            <h4 className="text-lg font-bold mt-4 mb-2">Ítems de la Orden:</h4>
            <ul className="space-y-2">
              {selectedOrder.items.map(item => (
                <li key={item.id} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                  <div>
                    <span className="font-semibold">{item.name}</span> x {item.quantity} (${item.price.toFixed(2)} c/u)
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Estado: {item.status === 'pending' ? 'Pendiente' : item.status === 'preparing' ? 'Preparando' : item.status === 'ready' ? 'Listo' : 'Servido'}</span>
                    {showKitchenBarActions && onUpdateOrderItemStatus && (
                      <>
                        {item.status === 'pending' && (
                          <Button size="sm" variant="primary" onClick={() => onUpdateOrderItemStatus(selectedOrder.id, item.id, 'preparing')}>
                            Preparar
                          </Button>
                        )}
                        {item.status === 'preparing' && (
                          <Button size="sm" variant="success" onClick={() => onUpdateOrderItemStatus(selectedOrder.id, item.id, 'ready')}>
                            Listo
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      )}
    </div>
  );
};

interface RoleDashboardProps {
  role: AppContextType['currentRole'];
  children: React.ReactNode;
}

const RoleDashboard: React.FC<RoleDashboardProps> = ({ role, children }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Panel de Control - {role.charAt(0).toUpperCase() + role.slice(1)}
      </h1>
      {children}
    </div>
  );
};

// --- Pages ---
const CustomerPage: React.FC = () => {
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

const WaiterPage: React.FC = () => {
  const { orders, updateOrderStatus } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [waiterOrders, setWaiterOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      // En un caso real, un mesero podría ver todas las órdenes o solo las de su sección
      const allOrders = await orderService.getAllOrders(orders); // Pasa 'orders' del contexto
      setWaiterOrders(allOrders);
      setIsLoading(false);
    };
    fetchOrders();

    // Simula polling para actualizaciones en tiempo real (cada 5 segundos)
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [orders]); // Dependencia 'orders' para re-fetch cuando el contexto cambie

  const handleUpdateStatus = async (orderId: string, newStatus: Order['status']) => {
    await orderService.updateOrderStatus(orderId, newStatus, updateOrderStatus); // Pasa la función del contexto
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <RoleDashboard role="waiter">
      <OrderList
        title="Órdenes Activas"
        orders={waiterOrders.filter(o => !['delivered', 'picked-up', 'served', 'cancelled'].includes(o.status))}
        showCustomerInfo={true}
        showPaymentInfo={true}
        showWaiterActions={true}
        onUpdateStatus={handleUpdateStatus}
      />
      <div className="mt-8">
        <OrderList
          title="Órdenes Completadas"
          orders={waiterOrders.filter(o => ['delivered', 'picked-up', 'served'].includes(o.status))}
          showCustomerInfo={true}
          showPaymentInfo={true}
        />
      </div>
    </RoleDashboard>
  );
};

const AdminPage: React.FC = () => {
  const { orders, approveUnpaidOrder, updateOrderStatus } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [adminOrders, setAdminOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      const allOrders = await orderService.getAllOrders(orders); // Pasa 'orders' del contexto
      setAdminOrders(allOrders);
      setIsLoading(false);
    };
    fetchOrders();

    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [orders]);

  const handleApproveOrder = async (orderId: string) => {
    await orderService.approveOrder(orderId, approveUnpaidOrder); // Pasa la función del contexto
  };

  const handleUpdateStatus = async (orderId: string, newStatus: Order['status']) => {
    await orderService.updateOrderStatus(orderId, newStatus, updateOrderStatus); // Pasa la función del contexto
  };

  if (isLoading) return <LoadingSpinner />;

  const pendingApprovalOrders = adminOrders.filter(o => o.status === 'pending' && !o.isPaid && !o.approvedByAdmin);
  const allOtherOrders = adminOrders.filter(o => !(o.status === 'pending' && !o.isPaid && !o.approvedByAdmin));

  return (
    <RoleDashboard role="admin">
      <OrderList
        title="Órdenes Pendientes de Aprobación"
        orders={pendingApprovalOrders}
        showCustomerInfo={true}
        showPaymentInfo={true}
        showAdminActions={true}
        onApproveOrder={handleApproveOrder}
      />
      <div className="mt-8">
        <OrderList
          title="Todas las Demás Órdenes"
          orders={allOtherOrders}
          showCustomerInfo={true}
          showPaymentInfo={true}
          showWaiterActions={true} // Admin puede también cambiar estados
          onUpdateStatus={handleUpdateStatus}
        />
      </div>
    </RoleDashboard>
  );
};

const KitchenPage: React.FC = () => {
  const { orders, updateOrderItemStatus } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [kitchenOrders, setKitchenOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchKitchenOrders = async () => {
      setIsLoading(true);
      const ordersData = await orderService.getKitchenOrders(orders); // Pasa 'orders' del contexto
      setKitchenOrders(ordersData);
      setIsLoading(false);
    };
    fetchKitchenOrders();

    const interval = setInterval(fetchKitchenOrders, 5000);
    return () => clearInterval(interval);
  }, [orders]);

  const handleUpdateItemStatus = async (orderId: string, itemId: string, newStatus: OrderItem['status']) => {
    await orderService.updateOrderItemStatus(orderId, itemId, newStatus, updateOrderItemStatus); // Pasa la función del contexto
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <RoleDashboard role="cook">
      <OrderList
        title="Órdenes de Cocina"
        orders={kitchenOrders}
        showCustomerInfo={true}
        showKitchenBarActions={true}
        onUpdateOrderItemStatus={handleUpdateItemStatus}
      />
    </RoleDashboard>
  );
};

const BarPage: React.FC = () => {
  const { orders, updateOrderItemStatus } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [barOrders, setBarOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchBarOrders = async () => {
      setIsLoading(true);
      const ordersData = await orderService.getBarOrders(orders); // Pasa 'orders' del contexto
      setBarOrders(ordersData);
      setIsLoading(false);
    };
    fetchBarOrders();

    const interval = setInterval(fetchBarOrders, 5000);
    return () => clearInterval(interval);
  }, [orders]);

  const handleUpdateItemStatus = async (orderId: string, itemId: string, newStatus: OrderItem['status']) => {
    await orderService.updateOrderItemStatus(orderId, itemId, newStatus, updateOrderItemStatus); // Pasa la función del contexto
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <RoleDashboard role="bartender">
      <OrderList
        title="Órdenes de Bar"
        orders={barOrders}
        showCustomerInfo={true}
        showKitchenBarActions={true}
        onUpdateOrderItemStatus={handleUpdateItemStatus}
      />
    </RoleDashboard>
  );
};

const AccountantPage: React.FC = () => {
  const { orders } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [accountantOrders, setAccountantOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      const allOrders = await orderService.getAllOrders(orders); // Pasa 'orders' del contexto
      setAccountantOrders(allOrders);
      setIsLoading(false);
    };
    fetchOrders();

    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [orders]);

  const totalRevenue = accountantOrders
    .filter(order => order.isPaid && ['accepted', 'preparing', 'ready', 'delivered', 'picked-up', 'served'].includes(order.status))
    .reduce((sum, order) => sum + order.total, 0);

  const pendingPayments = accountantOrders
    .filter(order => !order.isPaid && order.status !== 'cancelled')
    .reduce((sum, order) => sum + order.total, 0);

  if (isLoading) return <LoadingSpinner />;

  return (
    <RoleDashboard role="accountant">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-100 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold text-green-800 mb-2">Ingresos Totales (Órdenes Pagadas)</h3>
          <p className="text-4xl font-extrabold text-green-700">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold text-yellow-800 mb-2">Pagos Pendientes (Órdenes No Pagadas)</h3>
          <p className="text-4xl font-extrabold text-yellow-700">${pendingPayments.toFixed(2)}</p>
        </div>
      </div>

      <OrderList
        title="Todas las Órdenes para Contabilidad"
        orders={accountantOrders}
        showCustomerInfo={true}
        showPaymentInfo={true}
      />
    </RoleDashboard>
  );
};

// --- Layout y Navegación Principal ---
const Header: React.FC = () => {
  const { currentRole, setCurrentRole } = useAppContext();

  return (
    <header className="bg-red-700 text-white p-4 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-3xl font-extrabold mb-4 sm:mb-0">Mi Restaurante</h1>
        <nav className="flex flex-wrap justify-center sm:justify-end gap-3">
          <Button variant={currentRole === 'customer' ? 'secondary' : 'primary'} onClick={() => setCurrentRole('customer')} className="!bg-white !text-red-700 hover:!bg-gray-100">Cliente</Button>
          <Button variant={currentRole === 'waiter' ? 'secondary' : 'primary'} onClick={() => setCurrentRole('waiter')} className="!bg-white !text-red-700 hover:!bg-gray-100">Mesero</Button>
          <Button variant={currentRole === 'cook' ? 'secondary' : 'primary'} onClick={() => setCurrentRole('cook')} className="!bg-white !text-red-700 hover:!bg-gray-100">Cocinero</Button>
          <Button variant={currentRole === 'bartender' ? 'secondary' : 'primary'} onClick={() => setCurrentRole('bartender')} className="!bg-white !text-red-700 hover:!bg-gray-100">Bartender</Button>
          <Button variant={currentRole === 'admin' ? 'secondary' : 'primary'} onClick={() => setCurrentRole('admin')} className="!bg-white !text-red-700 hover:!bg-gray-100">Administrador</Button>
          <Button variant={currentRole === 'accountant' ? 'secondary' : 'primary'} onClick={() => setCurrentRole('accountant')} className="!bg-white !text-red-700 hover:!bg-gray-100">Contador</Button>
        </nav>
      </div>
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center mt-8 shadow-inner">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Mi Restaurante. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

// --- Componente Principal de la Aplicación ---
const App: React.FC = () => {
  return (
    <AppProvider> {/* Envuelve toda la aplicación con AppProvider */}
      <div className="min-h-screen flex flex-col font-sans">
        {/* Tailwind CSS CDN para propósitos de demostración/previsualización.
            En un proyecto Vite real, Tailwind se configuraría a través de PostCSS
            y se compilaría, no se cargaría directamente desde un CDN en el HTML. */}
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
            body {
              font-family: 'Inter', sans-serif;
            }
          `}
        </style>
        <Header />
        <main className="flex-grow">
          <AppContent /> {/* Componente que usa useAppContext */}
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
};

// Nuevo componente para contener la lógica que usa el contexto
const AppContent: React.FC = () => {
  const { currentRole } = useAppContext();

  const renderPage = () => {
    switch (currentRole) {
      case 'customer':
        return <CustomerPage />;
      case 'waiter':
        return <WaiterPage />;
      case 'admin':
        return <AdminPage />;
      case 'cook':
        return <KitchenPage />;
      case 'bartender':
        return <BarPage />;
      case 'accountant':
        return <AccountantPage />;
      default:
        return <CustomerPage />;
    }
  };

  return (
    <>
      {renderPage()}
    </>
  );
};

export default App;

