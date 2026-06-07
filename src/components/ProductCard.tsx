import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onUpdateQuantity: (id: string, delta: number) => void;
}

export default function ProductCard({ product, quantity, onUpdateQuantity }: ProductCardProps) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bakery-card p-4 flex flex-col gap-4 h-full"
    >
      <div className="aspect-square rounded-2xl overflow-hidden bg-bakery-beige">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="flex flex-col gap-1 flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-bakery-dark leading-tight">{product.name}</h3>
          <span className="text-lg font-serif font-bold text-bakery-brown">₹{product.price}</span>
        </div>
        {product.unit && <p className="text-sm text-bakery-brown/60 italic">{product.unit}</p>}
      </div>

      {quantity === 0 ? (
        <button 
          onClick={() => onUpdateQuantity(product.id, 1)}
          className="w-full py-3 bg-bakery-accent/30 text-bakery-brown rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-bakery-accent/50 transition-colors"
        >
          <ShoppingCart size={18} />
          Add to Bag
        </button>
      ) : (
        <div className="flex items-center justify-between bg-bakery-beige rounded-xl p-1">
          <button 
            onClick={() => onUpdateQuantity(product.id, -1)}
            className="p-2 text-bakery-brown hover:bg-white rounded-lg transition-colors"
          >
            <Minus size={18} />
          </button>
          <span className="font-bold text-bakery-brown">{quantity}</span>
          <button 
            onClick={() => onUpdateQuantity(product.id, 1)}
            className="p-2 text-bakery-brown hover:bg-white rounded-lg transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
      )}
    </motion.div>
  );
}
