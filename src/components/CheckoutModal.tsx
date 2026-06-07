import { X, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { OrderDetails } from '../types';
import { useState, FormEvent } from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (details: OrderDetails) => void;
}

export default function CheckoutModal({ isOpen, onClose, onConfirm }: CheckoutModalProps) {
  const [formData, setFormData] = useState<OrderDetails>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    alternatePhone: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onConfirm(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bakery-dark/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-lg bg-bakery-cream rounded-t-[40px] sm:rounded-[40px] p-8 max-h-[90vh] overflow-y-auto shadow-2xl overflow-hidden"
          >
            {/* Floral Decorations */}
            <div className="absolute top-20 -right-10 w-48 h-48 text-bakery-brown/5 pointer-events-none rotate-12">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="0.5">
                <path d="M50 50 Q70 10 90 50 T50 90 T10 50 T50 10" />
              </svg>
            </div>
            <div className="absolute bottom-40 -left-10 w-40 h-40 text-bakery-brown/5 pointer-events-none -rotate-45">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="0.5">
                <path d="M50 50 Q70 10 90 50 T50 90 T10 50 T50 10" />
              </svg>
            </div>

            <div className="flex justify-center mb-6 relative z-10">
              <div className="w-12 h-12 bg-bakery-beige rounded-full flex items-center justify-center text-bakery-brown">
                <Truck size={24} />
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-bakery-dark mb-2">Almost there!</h2>
              <p className="text-bakery-brown/60 italic">Tell us where to deliver 🚚</p>
              <p className="text-xs text-bakery-brown/40 mt-2">Just a few more details to bring the bakery to your doorstep.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest font-bold text-bakery-brown/60 ml-1">Full Name</label>
                <input 
                  required
                  type="text"
                  placeholder="e.g. Elena Gilbert"
                  className="input-field"
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest font-bold text-bakery-brown/60 ml-1">Phone Number</label>
                <input 
                  required
                  type="tel"
                  placeholder="+91 98765-43210"
                  className="input-field"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest font-bold text-bakery-brown/60 ml-1">Email</label>
                <input 
                  required
                  type="email"
                  placeholder="example@gmail.com"
                  className="input-field"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest font-bold text-bakery-brown/60 ml-1">Alternate Phone (Optional)</label>
                <input 
                  type="tel"
                  placeholder="Backup contact"
                  className="input-field"
                  value={formData.alternatePhone}
                  onChange={e => setFormData({...formData, alternatePhone: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest font-bold text-bakery-brown/60 ml-1">Delivery Address</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="Apartment, Street, Landmark..."
                  className="input-field resize-none"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>

              <div className="mt-4 flex flex-col gap-3">
                <button 
                  type="submit"
                  className="btn-primary w-full py-4 text-lg"
                >
                  Confirm & Place Order
                </button>
                <button 
                  type="button"
                  onClick={onClose}
                  className="text-bakery-brown/40 font-bold uppercase tracking-widest text-xs py-2 hover:text-bakery-brown transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
