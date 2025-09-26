import React, { useState, useMemo } from 'react';

// --- SVG Icons (Self-contained components) ---
const ShoppingCartIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const PlusIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const MinusIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const Trash2Icon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
);

const XIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);


// --- Mock Product Data ---
const products = [
  { id: 1, name: 'Wireless Headphones', price: 99.99, category: 'Electronics', image: 'https://placehold.co/400x400/3498db/ffffff?text=Headphones' },
  { id: 2, name: 'Smart Watch', price: 199.99, category: 'Electronics', image: 'https://placehold.co/400x400/2ecc71/ffffff?text=Watch' },
  { id: 3, name: 'Coffee Maker', price: 49.99, category: 'Home Goods', image: 'https://placehold.co/400x400/e74c3c/ffffff?text=Coffee+Maker' },
  { id: 4, name: 'Leather Bound Journal', price: 24.99, category: 'Stationery', image: 'https://placehold.co/400x400/f1c40f/ffffff?text=Journal' },
  { id: 5, name: 'Blender', price: 79.99, category: 'Home Goods', image: 'https://placehold.co/400x400/9b59b6/ffffff?text=Blender' },
  { id: 6, name: 'Mechanical Keyboard', price: 129.99, category: 'Electronics', image: 'https://placehold.co/400x400/1abc9c/ffffff?text=Keyboard' },
  { id: 7, name: 'Fountain Pen Set', price: 39.99, category: 'Stationery', image: 'https://placehold.co/400x400/e67e22/ffffff?text=Pen+Set' },
  { id: 8, name: 'Air Fryer', price: 89.99, category: 'Home Goods', image: 'https://placehold.co/400x400/34495e/ffffff?text=Air+Fryer' },
];

const categories = ['All', ...new Set(products.map(p => p.category))];

// --- Main App Component ---
export default function App() {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, amount) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + amount;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') {
      return products;
    }
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory]);
  
  const cartTotal = useMemo(() => {
      return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  }, [cart]);

  const cartItemCount = useMemo(() => {
      return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);


  return (
    <div className="app-container">
      <style>
        {`
          /* Base Styles */
          .app-container {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
              'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
              sans-serif;
            background-color: #f5f5f5;
            min-height: 100vh;
          }
          
          /* Header */
          .app-header {
            background-color: #fff;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 0;
            z-index: 20;
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .app-header-container {
            max-width: 1280px;
            margin: 0 auto;
            width: 100%;
            padding: 0 1.5rem;
          }
          .app-header-title {
            font-size: 1.5rem;
            font-weight: bold;
            color: #2d3748;
          }
          .cart-button {
            position: relative;
            padding: 0.5rem;
            border-radius: 9999px;
            background: transparent;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          .cart-button:hover {
            background-color: #f7fafc;
          }
          .cart-count {
            position: absolute;
            top: -0.25rem;
            right: -0.25rem;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 1.25rem;
            width: 1.25rem;
            background-color: #4c51bf;
            color: #fff;
            font-size: 0.75rem;
            border-radius: 9999px;
          }
          
          /* Main Content */
          .main-content {
            max-width: 1280px;
            margin: 0 auto;
            padding: 2rem 1.5rem;
          }
          
          /* Category Filters */
          .category-filters {
            margin-bottom: 2rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          .category-button {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
            font-weight: 500;
            border-radius: 9999px;
            border: 1px solid #e2e8f0;
            cursor: pointer;
            transition: background-color 0.2s, color 0.2s;
            background-color: #fff;
            color: #4a5568;
          }
          .category-button:hover {
            background-color: #f7fafc;
          }
          .category-button.active {
            background-color: #4c51bf;
            color: #fff;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          
          /* Product Grid */
          .product-grid {
            display: grid;
            grid-template-columns: repeat(1, minmax(0, 1fr));
            gap: 2rem;
          }
          @media (min-width: 640px) {
            .product-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }
          @media (min-width: 768px) {
            .product-grid {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
          }
          @media (min-width: 1024px) {
            .product-grid {
              grid-template-columns: repeat(4, minmax(0, 1fr));
            }
          }
          
          /* Product Card */
          .product-card {
            background-color: #fff;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: transform 0.3s ease-in-out;
          }
          .product-card:hover {
            transform: translateY(-4px);
          }
          .product-image {
            width: 100%;
            height: 12rem;
            object-fit: cover;
          }
          .product-info {
            padding: 1rem;
          }
          .product-title {
            font-size: 1.125rem;
            font-weight: 600;
            color: #2d3748;
            height: 3.5rem; /* fixed height to prevent layout shift */
          }
          .product-category {
            font-size: 0.875rem;
            color: #718096;
            margin-bottom: 0.5rem;
          }
          .product-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 1rem;
          }
          .product-price {
            font-size: 1.25rem;
            font-weight: bold;
            color: #1a202c;
          }
          .add-to-cart-button {
            padding: 0.5rem 1rem;
            background-color: #4c51bf;
            color: #fff;
            font-size: 0.875rem;
            font-weight: 500;
            border-radius: 9999px;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          .add-to-cart-button:hover {
            background-color: #434190;
          }
          
          /* Cart Sidebar */
          .cart-overlay {
            position: fixed;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 30;
            transition: opacity 0.3s;
          }
          .cart-overlay.hidden {
            opacity: 0;
            pointer-events: none;
          }
          .cart-sidebar {
            position: fixed;
            top: 0;
            right: 0;
            height: 100%;
            width: 100%;
            max-width: 24rem;
            background-color: #fff;
            box-shadow: -4px 0 10px rgba(0, 0, 0, 0.1);
            z-index: 40;
            transform: translateX(100%);
            transition: transform 0.3s;
            display: flex;
            flex-direction: column;
          }
          .cart-sidebar.open {
            transform: translateX(0);
          }
          .cart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            border-bottom: 1px solid #e2e8f0;
          }
          .cart-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #2d3748;
          }
          .cart-close-button {
            padding: 0.5rem;
            border-radius: 9999px;
            background: transparent;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          .cart-close-button:hover {
            background-color: #f7fafc;
          }
          .cart-items-list {
            flex-grow: 1;
            overflow-y: auto;
            padding: 1rem;
          }
          .cart-empty-message {
            text-align: center;
            color: #718096;
            margin-top: 2rem;
          }
          .cart-list-items {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .cart-footer {
            padding: 1rem;
            border-top: 1px solid #e2e8f0;
          }
          .cart-total-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
          }
          .cart-total-label {
            font-size: 1.125rem;
            font-weight: 500;
            color: #4a5568;
          }
          .cart-total-value {
            font-size: 1.5rem;
            font-weight: bold;
            color: #1a202c;
          }
          .checkout-button {
            width: 100%;
            background-color: #4c51bf;
            color: #fff;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            font-weight: 600;
            font-size: 1.125rem;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          .checkout-button:hover {
            background-color: #434190;
          }
          
          /* Cart Item */
          .cart-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.5rem 0;
          }
          .cart-item-image {
            width: 4rem;
            height: 4rem;
            object-fit: cover;
            border-radius: 0.375rem;
          }
          .cart-item-info {
            flex-grow: 1;
          }
          .cart-item-name {
            font-weight: 500;
            color: #2d3748;
          }
          .cart-item-price {
            font-size: 0.875rem;
            color: #718096;
          }
          .quantity-controls {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-top: 0.5rem;
          }
          .quantity-button {
            padding: 0.25rem;
            border-radius: 9999px;
            border: 1px solid #e2e8f0;
            background: transparent;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          .quantity-button:hover {
            background-color: #f7fafc;
          }
          .quantity-display {
            width: 2rem;
            text-align: center;
            font-weight: 500;
          }
          .cart-item-total {
            font-weight: 600;
            color: #2d3748;
          }
        `}
      </style>

      {/* Header */}
      <header className="app-header">
        <div className="app-header-container">
          <div className="flex justify-between items-center py-4">
            <h1 className="app-header-title">Shopify</h1>
            <button onClick={() => setIsCartOpen(true)} className="cart-button">
              <ShoppingCartIcon className="h-6 w-6 text-gray-600" />
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* Category Filters */}
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`category-button ${activeCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </main>
      
      {/* Shopping Cart Sidebar */}
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        cartTotal={cartTotal}
      />
    </div>
  );
}

// --- Child Components ---
function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <div className="product-footer">
          <p className="product-price">${product.price}</p>
          <button
            onClick={() => onAddToCart(product)}
            className="add-to-cart-button"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function CartSidebar({ isOpen, onClose, cart, onUpdateQuantity, cartTotal }) {
    return (
        <>
            {/* Overlay */}
            <div 
                className={`cart-overlay ${!isOpen ? 'hidden' : ''}`}
                onClick={onClose}
            ></div>

            {/* Sidebar */}
            <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="cart-header">
                        <h2 className="cart-title">Your Cart</h2>
                        <button onClick={onClose} className="cart-close-button">
                            <XIcon className="h-6 w-6 text-gray-600" />
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="cart-items-list">
                        {cart.length === 0 ? (
                            <p className="cart-empty-message">Your cart is empty.</p>
                        ) : (
                            <ul className="cart-list-items">
                                {cart.map(item => (
                                    <CartItem key={item.id} item={item} onUpdateQuantity={onUpdateQuantity} />
                                ))}
                            </ul>
                        )}
                    </div>
                    
                    {/* Footer */}
                    {cart.length > 0 && (
                        <div className="cart-footer">
                            <div className="cart-total-info">
                                <span className="cart-total-label">Subtotal:</span>
                                <span className="cart-total-value">${cartTotal}</span>
                            </div>
                            <button className="checkout-button">
                                Proceed to Checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

function CartItem({ item, onUpdateQuantity }) {
    return (
        <li className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-info">
                <h4 className="cart-item-name">{item.name}</h4>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
                <div className="quantity-controls">
                    <button onClick={() => onUpdateQuantity(item.id, -1)} className="quantity-button">
                        {item.quantity === 1 ? <Trash2Icon className="h-4 w-4 text-red-500" /> : <MinusIcon className="h-4 w-4 text-gray-600" />}
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, 1)} className="quantity-button">
                        <PlusIcon className="h-4 w-4 text-gray-600" />
                    </button>
                </div>
            </div>
            <p className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</p>
        </li>
    );
}
