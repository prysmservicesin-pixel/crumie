import { ArrowLeft, ArrowRight, Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import { motion } from 'motion/react';

interface BasketProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onBack: () => void;
  onPlaceOrder: () => void;
}

export default function Basket({ items, onUpdateQuantity, onBack, onPlaceOrder }: BasketProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32 px-6 bg-bakery-cream relative overflow-hidden">
      {/* Floral Decorations */}
      <div className="absolute top-40 -right-20 w-80 h-80 text-bakery-brown/5 pointer-events-none rotate-12">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="0.5">
          <path d="M50 50 Q70 10 90 50 T50 90 T10 50 T50 10" />
          <path d="M50 50 L50 0 M50 50 L100 50 M50 50 L0 50 M50 50 L50 100" />
          <circle cx="50" cy="50" r="5" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 text-bakery-brown/5 pointer-events-none -rotate-45">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="0.5">
          <path d="M30 30 C40 10 60 10 70 30 C80 50 70 70 50 80 C60 100 40 120 20 110 C0 120 -20 100 -10 80 C-30 70 -20 50 -10 30 C0 10 20 10 30 30" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto w-full z-10 flex flex-col">
        <button 
          onClick={onBack}
          className="flex items-center self-start gap-2 text-bakery-brown/60 text-sm font-bold uppercase tracking-widest mb-6"
        >
          <ArrowLeft size={16} />
          Back to Menu
        </button>

      <div className="mb-8">
        <h2 className="text-4xl font-bold text-bakery-dark mb-2">Your Basket</h2>
        <p className="text-bakery-brown/60 italic">Curated selections from our morning bake.</p>
      </div>

      <div className="flex flex-col gap-6 mb-12">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-bakery-brown/40 italic mb-4">Your basket is empty</p>
            <button onClick={onBack} className="btn-secondary">Explore Menu</button>
          </div>
        ) : (
          items.map((item) => (
            <motion.div 
              key={item.id}
              layout
              className="flex gap-4 items-center"
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-bakery-beige flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-grow">
                <h3 className="font-semibold text-lg leading-tight">{item.name}</h3>
                <p className="text-sm text-bakery-brown/60 italic mb-2">₹{item.price} / unit</p>
                
                <div className="flex items-center justify-between bg-bakery-beige rounded-lg px-2 py-1 w-32">
                  <button 
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="p-1 text-bakery-brown hover:bg-white rounded-md"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-bold text-sm">{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="p-1 text-bakery-brown hover:bg-white rounded-md"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              
              <div className="text-right flex flex-col items-end gap-2">
                <span className="font-serif font-bold text-lg text-bakery-brown">₹{item.price * item.quantity}</span>
                <button 
                  onClick={() => onUpdateQuantity(item.id, -item.quantity)}
                  className="text-bakery-brown/40 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

        <div className="bg-bakery-beige/50 border-l-4 border-bakery-brown p-6 rounded-r-2xl mb-12">
          <h4 className="font-serif font-bold text-bakery-brown mb-2">Baker's Note</h4>
          <p className="text-sm text-bakery-dark/80 leading-relaxed">
            All orders will be prepared on SATURDAY and will be delivered on Sunday.
          </p>
        </div>
      </div>

      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-bakery-cream/90 backdrop-blur-md border-t border-bakery-beige">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest font-bold text-bakery-brown/60">Total Items ({items.length})</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-serif font-bold text-bakery-brown">₹{total}</span>
                <span className="text-[10px] text-bakery-brown/40">+ taxes & shipping</span>
              </div>
            </div>
            
            <button 
              onClick={onPlaceOrder}
              className="btn-primary h-16 px-8 text-lg"
            >
              Place Order
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
