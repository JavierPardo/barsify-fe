import { useCallback, useState, type ReactNode } from "react";
import type { MenuItem, Order, OrderItem } from "../types";
import type { AppContextType } from "./appContextType";
import { AppContext } from "./appContext";


// --- Proveedor del Contexto ---
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

