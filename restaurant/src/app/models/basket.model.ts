import { CartItem } from './cart-item.model';

export interface Basket {
  id: string;
  items: CartItem[];
}
