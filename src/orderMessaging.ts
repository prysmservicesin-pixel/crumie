import { CartItem, OrderDetails } from './types';

const CAFE_NAME = 'Crumie';
const OWNER_WHATSAPP_NUMBER = import.meta.env.VITE_OWNER_WHATSAPP_NUMBER ?? '';

const formatCurrency = (amount: number) => `Rs. ${amount}`;

const formatItems = (items: CartItem[]) =>
  items
    .map((item) => {
      const lineTotal = item.price * item.quantity;
      return `- ${item.name} x ${item.quantity} = ${formatCurrency(lineTotal)}`;
    })
    .join('\n');

export const getOrderTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const generateOrderId = () => {
  const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const randomPart = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `CR-${datePart}-${randomPart}`;
};

export const buildOwnerOrderMessage = (items: CartItem[], details: OrderDetails) => {
  const alternatePhone = details.alternatePhone?.trim()
    ? `Alternate phone: ${details.alternatePhone.trim()}\n`
    : '';

  return [
    `New ${CAFE_NAME} order`,
    `Order ID: ${details.orderId}`,
    '',
    'Items:',
    formatItems(items),
    '',
    `Total: ${formatCurrency(getOrderTotal(items))}`,
    '',
    'Customer:',
    `Name: ${details.fullName}`,
    `Phone: ${details.phone}`,
    alternatePhone.trimEnd(),
    `Email: ${details.email}`,
    `Address: ${details.address}`,
    '',
    'Please confirm availability, delivery charges, and payment details with the customer.',
  ]
    .filter(Boolean)
    .join('\n');
};

export const buildCustomerReceiptMessage = (items: CartItem[], details: OrderDetails) =>
  [
    `My ${CAFE_NAME} order receipt`,
    `Order ID: ${details.orderId}`,
    '',
    'Items:',
    formatItems(items),
    '',
    `Total: ${formatCurrency(getOrderTotal(items))}`,
    `Deliver to: ${details.address}`,
    '',
    `${CAFE_NAME} will confirm availability, delivery charges, and payment details shortly.`,
  ].join('\n');

export const buildCafeWhatsAppUrl = (message: string) => {
  const encodedMessage = encodeURIComponent(message);

  if (!OWNER_WHATSAPP_NUMBER.trim()) {
    return `https://wa.me/?text=${encodedMessage}`;
  }

  return `https://wa.me/${OWNER_WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodedMessage}`;
};

export const openCafeWhatsApp = (items: CartItem[], details: OrderDetails) => {
  const url = buildCafeWhatsAppUrl(buildOwnerOrderMessage(items, details));
  window.open(url, '_blank', 'noopener,noreferrer');
};
