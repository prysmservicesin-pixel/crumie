import { ArrowLeft, CheckCircle2, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { CartItem, OrderDetails } from '../types';
import { getOrderTotal, openCafeWhatsApp } from '../orderMessaging';

interface WhatsAppOrderStepProps {
  items: CartItem[];
  details: OrderDetails;
  onBack: () => void;
  onSent: () => void;
}

export default function WhatsAppOrderStep({ items, details, onBack, onSent }: WhatsAppOrderStepProps) {
  const [hasOpenedWhatsApp, setHasOpenedWhatsApp] = useState(false);
  const total = getOrderTotal(items);

  const handleOpenWhatsApp = () => {
    openCafeWhatsApp(items, details);
    setHasOpenedWhatsApp(true);
  };

  return (
    <div className="min-h-screen bg-bakery-cream pt-24 pb-12 px-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white rounded-[32px] p-6 sm:p-8 shadow-xl border border-bakery-beige"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-bakery-brown/60 text-sm font-bold uppercase tracking-widest mb-6"
        >
          <ArrowLeft size={16} />
          Back to Basket
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-bakery-beige text-bakery-brown rounded-full mb-4">
            <MessageCircle size={30} />
          </div>
          <h2 className="text-3xl font-bold text-bakery-dark mb-2">Send your order on WhatsApp</h2>
          <p className="text-sm text-bakery-brown/60 leading-relaxed">
            Your order is ready, but it is not placed yet. Open WhatsApp, press send, then come back here to confirm.
          </p>
          {details.orderId && (
            <p className="mt-3 text-xs font-bold uppercase tracking-widest text-bakery-brown/40">
              {details.orderId}
            </p>
          )}
        </div>

        <div className="bg-bakery-beige/30 rounded-2xl p-5 mb-6">
          <h3 className="font-serif font-bold text-xl text-bakery-dark mb-4">Order Summary</h3>
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between gap-4 text-sm">
                <span className="text-bakery-dark/80">
                  {item.name} x {item.quantity}
                </span>
                <span className="font-bold text-bakery-brown">Rs. {item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between border-t border-bakery-beige mt-4 pt-4">
            <span className="font-serif italic text-bakery-brown/70">Total</span>
            <span className="text-2xl font-serif font-bold text-bakery-brown">Rs. {total}</span>
          </div>
        </div>

        <div className="bg-bakery-beige/20 rounded-2xl p-5 mb-8">
          <p className="text-[10px] uppercase tracking-widest font-bold text-bakery-brown/40 mb-1">Customer</p>
          <p className="font-bold text-bakery-dark">{details.fullName}</p>
          <p className="text-sm text-bakery-dark/70 mt-1">{details.phone}</p>
          <p className="text-sm text-bakery-dark/70 mt-1">{details.address}</p>
        </div>

        <div className="flex flex-col gap-3">
          <button onClick={handleOpenWhatsApp} className="btn-primary w-full py-4 text-lg">
            <MessageCircle size={20} />
            Open WhatsApp to Send
          </button>

          <button
            onClick={onSent}
            disabled={!hasOpenedWhatsApp}
            className="btn-secondary w-full py-4 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            <CheckCircle2 size={18} />
            I sent the WhatsApp message
          </button>

          {!hasOpenedWhatsApp && (
            <p className="text-center text-xs text-bakery-brown/40">
              The confirmation button unlocks after opening WhatsApp.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
