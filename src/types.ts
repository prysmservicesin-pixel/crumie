export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  unit?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type View = 'menu' | 'basket' | 'checkout' | 'whatsapp' | 'success';

export interface OrderDetails {
  orderId?: string;
  fullName: string;
  phone: string;
  email: string;
  alternatePhone?: string;
  address: string;
}
