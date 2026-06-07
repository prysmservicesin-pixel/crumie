import { ShoppingBag, Menu } from 'lucide-react';
import { motion } from 'motion/react';
import crumieLogo from '../assets/crumie-logo-wordmark.png';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
}

export default function Header({ cartCount, onCartClick, onLogoClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-bakery-cream/80 backdrop-blur-md z-50 border-b border-bakery-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full flex items-center justify-between">
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={onLogoClick}
      >
        <img src={crumieLogo} alt="Crumie cookies and cakes" className="h-11 w-auto" />
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          className="relative p-2 text-bakery-brown hover:bg-bakery-beige rounded-full transition-colors"
          onClick={onCartClick}
        >
          <ShoppingBag size={24} />
          {cartCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-0 right-0 bg-bakery-brown text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-bakery-cream"
            >
              {cartCount}
            </motion.span>
          )}
        </button>
        
        <button className="p-2 text-bakery-brown hover:bg-bakery-beige rounded-full transition-colors">
          <Menu size={24} />
        </button>
      </div>
      </div>
    </header>
  );
}
