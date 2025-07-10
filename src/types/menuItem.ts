

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  type: 'food' | 'drink';
  category: 'Entrantes' | 'Platos Fuertes' | 'Guarniciones' | 'Bebidas con Alcohol' | 'Bebidas sin Alcohol' | 'Bebidas Calientes' | 'Postres';
}