import { useState, useMemo } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import Basket from './components/Basket';
import CheckoutModal from './components/CheckoutModal';
import WhatsAppOrderStep from './components/WhatsAppOrderStep';
import OrderSuccess from './components/OrderSuccess';
import { Product, CartItem, View, OrderDetails } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { generateOrderId } from './orderMessaging';

// New imported assets
import cookie1 from './assets/cookie_3870e1c0.jpg';
import cookie2 from './assets/cookie_b91fcfd8.jpg';
import cookie3 from './assets/cookie_bb8581e8.jpg';
import cookie4 from './assets/cookie_c12f755e.jpg';
import cookie5 from './assets/cookie_dc4d243b.jpg';
import cookie6 from './assets/cookie_fafebb36.jpg';
import appleSpiceCake from './assets/apple spice cake.jpeg';
import berryTart from './assets/berry tart.jpeg';
import biscoffTresLeches from './assets/biscoff tresleches.jpeg';
import brownButterCaramelCake from './assets/brown butter caramel cake.jpeg';
import carrotCake from './assets/carrot cake.jpeg';
import chocolateCaramelTart from './assets/chocolate caramel tart.jpeg';
import chocolateTresLeches from './assets/chocolate tres leches.jpeg';
import cookieCreamTresLeches from './assets/cookie and cream tres leches.jpeg';
import filterCoffeeTresLeches from './assets/filter kaapi tres leches.jpeg';
import fruitCreamTart from './assets/fruit cream tart.jpeg';
import lemonTart from './assets/lemon tart.jpeg';
import sinfulChocolateCake from './assets/sinful chocolate cake.jpeg';
import tiramisuCake from './assets/tiramisu cake.jpeg';
import vanillaAlmondCake from './assets/vanilla almond cake.jpeg';
import vanillaTresLeches from './assets/vanilla tres leches.jpeg';

const NEW_COOKIES: Product[] = [
  { id: 'c1', name: 'Classic Chocolate Chip (Single)', price: 90, unit: 'â‚¹90 / pc', category: 'Premium Cookies', image: cookie6 },
  { id: 'c1_pack', name: 'Classic Chocolate Chip (Pack of 3)', price: 250, unit: 'â‚¹250 / pack', category: 'Premium Cookies', image: cookie6 },
  
  { id: 'c2', name: 'Sugar Cookie (Single)', price: 90, unit: 'â‚¹90 / pc', category: 'Premium Cookies', image: cookie1 },
  { id: 'c2_pack', name: 'Sugar Cookie (Pack of 3)', price: 250, unit: 'â‚¹250 / pack', category: 'Premium Cookies', image: cookie1 },

  { id: 'c3', name: 'Red Velvet Cream Cheese (Single)', price: 110, unit: 'â‚¹110 / pc', category: 'Premium Cookies', image: cookie3 },
  { id: 'c3_pack', name: 'Red Velvet Cream Cheese (Pack of 3)', price: 320, unit: 'â‚¹320 / pack', category: 'Premium Cookies', image: cookie3 },

  { id: 'c4', name: 'Apple Pie Cookie (Single)', price: 110, unit: 'â‚¹110 / pc', category: 'Premium Cookies', image: cookie5 },
  { id: 'c4_pack', name: 'Apple Pie Cookie (Pack of 3)', price: 320, unit: 'â‚¹320 / pack', category: 'Premium Cookies', image: cookie5 },

  { id: 'c5', name: 'Chocolate Fudge Cookie (Single)', price: 120, unit: 'â‚¹120 / pc', category: 'Premium Cookies', image: cookie4 },
  { id: 'c5_pack', name: 'Chocolate Fudge Cookie (Pack of 3)', price: 350, unit: 'â‚¹350 / pack', category: 'Premium Cookies', image: cookie4 },

  { id: 'c6', name: 'Biscoff Cookie (Single)', price: 120, unit: 'â‚¹120 / pc', category: 'Premium Cookies', image: cookie2 },
  { id: 'c6_pack', name: 'Biscoff Cookie (Pack of 3)', price: 350, unit: 'â‚¹350 / pack', category: 'Premium Cookies', image: cookie2 },

  { id: 'b1', name: 'Assorted Cookies Box (3 pcs)', price: 350, unit: 'â‚¹350 / box', category: 'Cookie Boxes', image: cookie1 },
  { id: 'b2', name: 'Assorted Cookies Box (6 pcs)', price: 650, unit: 'â‚¹650 / box', category: 'Cookie Boxes', image: cookie3 },
  { id: 'b3', name: 'Assorted Cookies Box (12 pcs)', price: 1300, unit: 'â‚¹1300 / box', category: 'Cookie Boxes', image: cookie5 },
];

const IMAGE_MATCHED_PRODUCTS: Product[] = [
  { id: '1', name: 'Filter Coffee Tres Leches', price: 350, unit: 'Rs. 350 / unit', category: 'Signature Cakes', image: filterCoffeeTresLeches },
  { id: '2', name: 'Vanilla Tres Leches', price: 350, unit: 'Rs. 350 / unit', category: 'Signature Cakes', image: vanillaTresLeches },
  { id: '3', name: 'Chocolate Tres Leches', price: 350, unit: 'Rs. 350 / unit', category: 'Signature Cakes', image: chocolateTresLeches },
  { id: '4', name: 'Cookie and Cream Tres Leches', price: 350, unit: 'Rs. 350 / unit', category: 'Signature Cakes', image: cookieCreamTresLeches },
  { id: '5', name: 'Biscoff Tres Leches', price: 350, unit: 'Rs. 350 / unit', category: 'Signature Cakes', image: biscoffTresLeches },
  { id: '6', name: 'Tiramisu Cake', price: 350, unit: 'Rs. 350 / unit', category: 'Signature Cakes', image: tiramisuCake },
  { id: '7', name: 'Sinful Chocolate Cake', price: 350, unit: 'Rs. 350 / unit', category: 'Signature Cakes', image: sinfulChocolateCake },
  { id: '8', name: 'Vanilla Almond Cake', price: 350, unit: 'Rs. 350 / unit', category: 'Signature Cakes', image: vanillaAlmondCake },
  { id: '9', name: 'Apple Spice Cake', price: 350, unit: 'Rs. 350 / unit', category: 'Signature Cakes', image: appleSpiceCake },
  { id: '10', name: 'Brown Butter Caramel Cake', price: 350, unit: 'Rs. 350 / unit', category: 'Signature Cakes', image: brownButterCaramelCake },
  { id: '11', name: 'Carrot Cake', price: 350, unit: 'Rs. 350 / unit', category: 'Signature Cakes', image: carrotCake },
  { id: '12', name: 'Berry Tart', price: 300, unit: 'Rs. 300 / unit', category: 'Tarts', image: berryTart },
  { id: '13', name: 'Lemon Tart', price: 300, unit: 'Rs. 300 / unit', category: 'Tarts', image: lemonTart },
  { id: '14', name: 'Fruit Cream Tart', price: 300, unit: 'Rs. 300 / unit', category: 'Tarts', image: fruitCreamTart },
  { id: '15', name: 'Chocolate Caramel Tart', price: 300, unit: 'Rs. 300 / unit', category: 'Tarts', image: chocolateCaramelTart }
];

const ALL_PRODUCTS = [...IMAGE_MATCHED_PRODUCTS, ...NEW_COOKIES];

const CATEGORIES = ['All Delights', 'Premium Cookies', 'Cookie Boxes', 'Signature Cakes', 'Tarts'];

export default function App() {
  const [currentView, setCurrentView] = useState<View>('menu');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All Delights');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [submittedOrderItems, setSubmittedOrderItems] = useState<CartItem[]>([]);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        const newQuantity = existing.quantity + delta;
        if (newQuantity <= 0) return prev.filter(item => item.id !== id);
        return prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item);
      }
      if (delta > 0) {
        const product = ALL_PRODUCTS.find(p => p.id === id);
        if (product) return [...prev, { ...product, quantity: delta }];
      }
      return prev;
    });
  };

  const handleConfirmOrder = (details: OrderDetails) => {
    const orderWithId = {
      ...details,
      orderId: generateOrderId(),
    };

    setOrderDetails(orderWithId);
    setSubmittedOrderItems(cart);
    setIsCheckoutOpen(false);
    setCurrentView('whatsapp');
  };

  const handleOrderSent = () => {
    setCart([]);
    setCurrentView('success');
  };

  const filteredProducts = ALL_PRODUCTS.filter(p => {
    if (selectedCategory === 'All Delights') {
      return p.category !== 'Cookie Boxes';
    }
    return p.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-bakery-cream selection:bg-bakery-accent/30">
      <Header 
        cartCount={cartCount} 
        onCartClick={() => setCurrentView('basket')}
        onLogoClick={() => setCurrentView('menu')}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatePresence mode="wait">
          {currentView === 'menu' && (
            <motion.div 
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-24 pb-12"
            >
              <div className="mb-8 relative">
                {/* Floral Decorations */}
                <div className="absolute -top-10 -left-10 w-48 h-48 text-bakery-brown/10 pointer-events-none -rotate-12">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                    <path d="M50 20 C60 10 80 10 90 20 C100 30 90 50 70 60 C80 80 60 100 40 90 C20 100 0 80 10 60 C-10 50 0 30 10 20 C20 10 40 10 50 20" />
                    <path d="M50 50 L50 100 M50 70 L30 80 M50 80 L70 90" stroke="currentColor" strokeWidth="1" fill="none" />
                  </svg>
                </div>
                <div className="absolute top-40 -right-10 w-64 h-64 text-bakery-brown/5 pointer-events-none rotate-45">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                    <path d="M30 20 C40 10 60 10 70 20 C80 30 70 50 50 60 C60 80 40 100 20 90 C0 100 -10 80 0 60 C-10 50 0 30 10 20 C20 10 40 10 30 20" />
                  </svg>
                </div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute -top-16 -left-16 w-32 h-32 pointer-events-none"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-bakery-brown">
                    <path d="M50 0 C70 0 100 30 100 50 C100 70 70 100 50 100 C30 100 0 70 0 50 C0 30 30 0 50 0" />
                  </svg>
                </motion.div>
                <h2 className="text-5xl font-bold text-bakery-dark mb-4 relative z-10">Art of Baking</h2>
                
                <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar relative z-10 w-full">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex-1 min-w-max whitespace-nowrap px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all text-center ${
                        selectedCategory === cat 
                          ? 'bg-bakery-accent text-bakery-brown shadow-sm' 
                          : 'bg-bakery-beige text-bakery-brown/60 hover:bg-bakery-beige/80'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <h3 className="text-3xl font-serif font-bold text-bakery-dark mb-6">Explore the Menu</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {filteredProducts.map(product => (
                  <div key={product.id} className="h-full">
                    <ProductCard 
                      product={product}
                      quantity={cart.find(item => item.id === product.id)?.quantity || 0}
                      onUpdateQuantity={updateQuantity}
                    />
                  </div>
                ))}
              </div>

              {selectedCategory === 'All Delights' && (
                <div>
                  <h3 className="text-3xl font-serif font-bold text-bakery-dark mb-6">Assorted Cookie Boxes</h3>
                  <div className="w-full overflow-x-auto snap-x snap-mandatory flex gap-6 pb-6 no-scrollbar">
                    {ALL_PRODUCTS.filter(p => p.category === 'Cookie Boxes').map(product => (
                      <div key={`slide-${product.id}`} className="snap-start shrink-0 w-72">
                        <ProductCard 
                          product={product}
                          quantity={cart.find(item => item.id === product.id)?.quantity || 0}
                          onUpdateQuantity={updateQuantity}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-12 bg-bakery-beige/30 rounded-[32px] p-8 border border-bakery-beige">
                <h4 className="text-xl font-serif font-bold text-bakery-brown mb-4">A Baker's Note on Quality</h4>
                <p className="text-bakery-dark/70 italic leading-relaxed mb-6">
                  "We don't use preservatives, additives, or shortcuts. Every loaf is shaped by hand and every cake is frosted with love. We believe food should be as honest as the grain it started from."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-bakery-beige">
                    <img src="https://picsum.photos/seed/chef/100/100" alt="Chef" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-bakery-dark">Dhruv</p>
                    <p className="text-[10px] uppercase tracking-widest text-bakery-brown/40">Head Baker</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'basket' && (
            <motion.div 
              key="basket"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Basket 
                items={cart}
                onUpdateQuantity={updateQuantity}
                onBack={() => setCurrentView('menu')}
                onPlaceOrder={() => setIsCheckoutOpen(true)}
              />
            </motion.div>
          )}

          {currentView === 'success' && orderDetails && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <OrderSuccess 
                items={submittedOrderItems}
                details={orderDetails}
                onHome={() => {
                  setCart([]);
                  setSubmittedOrderItems([]);
                  setOrderDetails(null);
                  setCurrentView('menu');
                }}
              />
            </motion.div>
          )}

          {currentView === 'whatsapp' && orderDetails && (
            <motion.div 
              key="whatsapp"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <WhatsAppOrderStep
                items={submittedOrderItems}
                details={orderDetails}
                onBack={() => setCurrentView('basket')}
                onSent={handleOrderSent}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onConfirm={handleConfirmOrder}
      />
    </div>
  );
}
