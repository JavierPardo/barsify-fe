export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'food' | 'drink';
  status: 'pending' | 'preparing' | 'ready' | 'served'; // Estado del item individual
}