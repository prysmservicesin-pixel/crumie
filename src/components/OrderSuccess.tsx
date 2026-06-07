import { ArrowRight, CheckCircle2, Clipboard, MessageCircle, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { CartItem, OrderDetails } from '../types';
import {
  buildCafeWhatsAppUrl,
  buildCustomerReceiptMessage,
  buildOwnerOrderMessage,
  getOrderTotal,
} from '../orderMessaging';

interface OrderSuccessProps {
  items: CartItem[];
  details: OrderDetails;
  onHome: () => void;
}

export default function OrderSuccess({ items, details, onHome }: OrderSuccessProps) {
  const total = getOrderTotal(items);
  const orderDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const customerReceipt = buildCustomerReceiptMessage(items, details);

  const handleSendToCafe = () => {
    window.open(buildCafeWhatsAppUrl(buildOwnerOrderMessage(items, details)), '_blank', 'noopener,noreferrer');
  };

  const handleShareReceipt = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Crumie order receipt',
        text: customerReceipt,
      });
      return;
    }

    await navigator.clipboard.writeText(customerReceipt);
    window.alert('Receipt copied. You can paste it into WhatsApp or Notes.');
  };

  return (
    <div className="min-h-screen bg-bakery-cream pt-24 pb-12 px-6 flex flex-col items-center">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md bg-white rounded-[40px] p-8 shadow-xl border border-bakery-beige relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-48 bg-bakery-beige/30 -z-10" />
        
        <div className="text-center mb-8">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-bakery-brown text-white rounded-full mb-4"
          >
            <CheckCircle2 size={32} />
          </motion.div>
          <h2 className="text-3xl font-bold text-bakery-dark mb-1 italic">wohoooo</h2>
          <h3 className="text-2xl font-bold text-bakery-brown">order sent</h3>
          {details.orderId && (
            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-bakery-brown/40">
              {details.orderId}
            </p>
          )}
        </div>

        <div className="flex justify-between items-end mb-6 border-b border-bakery-beige pb-4">
          <h4 className="font-serif font-bold text-xl text-bakery-dark">Order Items</h4>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest font-bold text-bakery-brown/40">Order Date</p>
            <p className="font-bold text-bakery-brown">{orderDate}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 items-center">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-bakery-beige flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <p className="font-bold text-sm leading-tight">{item.name}</p>
                <p className="text-xs text-bakery-brown/60 italic">Qty: {item.quantity}</p>
              </div>
              <span className="font-serif font-bold text-bakery-brown">₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="bg-bakery-beige/30 rounded-2xl p-6 mb-8">
          <div className="mb-4">
            <p className="text-[10px] uppercase tracking-widest font-bold text-bakery-brown/40 mb-1">Customer</p>
            <p className="font-bold text-bakery-dark">{details.fullName}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-bakery-brown/40 mb-1">Delivery Address</p>
            <p className="text-xs text-bakery-dark/80 leading-relaxed">{details.address}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <span className="text-xl font-serif italic text-bakery-brown/60">Total Amount</span>
          <span className="text-3xl font-serif font-bold text-bakery-brown">₹{total}</span>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            onClick={handleSendToCafe}
            className="btn-primary w-full py-4"
          >
            <MessageCircle size={20} />
            Resend to Crumie
          </button>

          <button 
            onClick={handleShareReceipt}
            className="btn-secondary w-full py-4 flex items-center justify-center gap-2"
          >
            {navigator.share ? <Share2 size={18} /> : <Clipboard size={18} />}
            Share Receipt
          </button>

          <button 
            onClick={onHome}
            className="flex items-center justify-center gap-2 text-bakery-brown/60 hover:text-bakery-brown transition-colors text-sm font-bold uppercase tracking-widest py-2"
          >
            Back to Home
            <ArrowRight size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
