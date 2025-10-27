/* 
FOR FRONTEND & BACKEND CONNECTION

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProductList from './ProductList';
import ProductView from './ProductView';
import ProductForm from './ProductForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {}
        <Route path="/product-list" element={<ProductList />} />
        
        {}
        <Route path="/product/:productId" element={<ProductView />} />
        
        {}
        <Route path="/add-product" element={<ProductForm />} />
      </Routes>
    </Router>
  </React.StrictMode>
); */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';

import Login from './Login'; 

import vintageWashiTapeImg from './integrationStyle/images/vintage-washi-tape.png';
import pastelAcrylicPaintsImg from './integrationStyle/images/pastel-acrylic-paints.png';
import a3CuttingMatImg from './integrationStyle/images/a3-cutting-mat.png';
import fineDetailBrushSetImg from './integrationStyle/images/fine-detail-brush-set.png';
import diyClayKitImg from './integrationStyle/images/diy-clay-kit.png';
import premiumSketchbookImg from './integrationStyle/images/premium-sketchbook.png';
import vibrantWatercolorSetImg from './integrationStyle/images/vibrant-watercolor-set.png';
import luxuryRollerballPenImg from './integrationStyle/images/luxury-rollerball-pen.png';

const { useState, useEffect } = React;

const initialProducts = [
    {
        id: 1,
        name: 'Vibrant Watercolor Set',
        description: '12 colors with high pigment saturation and travel brush. This is a high-quality artist-grade set for both studio and plein air painting.',
        price: 35.99,
        imageUrl: vibrantWatercolorSetImg 
    },
    {
        id: 2,
        name: 'Luxury Rollerball Pen',
        description: 'Smooth-writing pen with a sleek, metallic finish. Perfect for journaling or office use.',
        price: 12.99,
        imageUrl: luxuryRollerballPenImg
    },
    {
        id: 3,
        name: 'Premium Sketchbook',
        description: 'A professional-grade sketchbook with 80 sheets of heavyweight paper, ideal for all dry media.',
        price: 19.50,
        imageUrl: premiumSketchbookImg
    },
    {
        id: 4,
        name: 'DIY Clay Kit',
        description: 'Everything you need to sculpt and create custom figures. Includes five colored clays, tools, and a guide.',
        price: 25.00,
        imageUrl: diyClayKitImg
    },
    {
        id: 5,
        name: 'Fine Detail Brush Set',
        description: 'Set of 10 miniature brushes for precise acrylic, watercolor, and oil painting.',
        price: 15.75,
        imageUrl: fineDetailBrushSetImg
    },
    {
        id: 6,
        name: 'A3 Cutting Mat',
        description: 'Self-healing, double-sided mat with grid lines, essential for any crafter or designer.',
        price: 18.00,
        imageUrl: a3CuttingMatImg
    },
    {
        id: 7,
        name: 'Pastel Acrylic Paints',
        description: 'Set of 12 soft-hued acrylic paints, perfect for subtle artwork and background washes.',
        price: 28.99,
        imageUrl: pastelAcrylicPaintsImg
    },
    {
        id: 8,
        name: 'Vintage Washi Tape',
        description: 'Collection of 8 rolls of decorative paper tape with intricate vintage patterns.',
        price: 9.99,
        imageUrl: vintageWashiTapeImg
    },
];

const BRAND_PINK_TEXT = 'text-[#e54b67]'; 
const LIGHT_PINK_BG = 'bg-[#ffe1e8]';
const ACTIVE_BG_COLOR = 'bg-[#ff8ba7]';
const ACCENT_GREEN_BG = 'bg-[#b7e4c7]';
const HERO_BLUE_BG = 'bg-[#eaf1ff]';


const getCartFromStorage = () => {
    try {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        
        return storedCart.map(item => ({
            ...item,
            price: Number(item.price) || 0,
            quantity: Number(item.quantity) > 0 ? Number(item.quantity) : 1,
        }));
    } catch (error) {
        console.error("Error loading cart from storage:", error);
        return [];
    }
};

const saveCartToStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};


const AdminDashboard = ({ onLogout }) => (
    <div className="admin-dashboard-container">
        <div className="admin-dashboard-box">
            
            <h2 className="admin-dashboard-title">Admin Dashboard</h2>
            
            <p className="admin-welcome-text">
                Welcome, Administrator. Manage your e-commerce operations efficiently.
            </p>

            {/* Action Buttons */}
            <div className="admin-action-buttons">
                
                <button className="admin-primary-btn">
                    Manage Products
                </button>
                
                <button className="admin-secondary-btn">
                    View Orders
                </button>
                
                <button onClick={onLogout} className="admin-logout-btn">
                    Logout
                </button>
            </div>
        </div>
    </div>
);


const Navbar = ({ navigate, currentPage, cartItemCount, onLogout, userRole }) => {
    
    const [localCartCount, setLocalCartCount] = useState(cartItemCount);

    useEffect(() => {
        const cart = getCartFromStorage();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setLocalCartCount(count);
    }, [cartItemCount]);

    let navItems = [];
    if (userRole === 'user') {
        navItems = [
            { name: 'Home', page: 'home' },
            { name: 'Products', page: 'products' },
        ];
    }

    return (
        <header className="navbar">
            <h1 className="brand" onClick={() => navigate('home')}>Crafty Corner</h1>
            
            <nav>
                <ul>
                    {userRole === 'user' && navItems.map((item) => (
                        <button
                            key={item.page}
                            onClick={() => navigate(item.page)}
                            className={`nav-link ${item.page === currentPage ? 'active' : ''}`}
                        >
                            {item.name}
                        </button>
                    ))}

                    {userRole === 'user' && (
                        <button
                            onClick={() => navigate('cart')}
                            className="cart-link"
                            aria-label="View Shopping Cart"
                        >
                            <span className="font-semibold">Cart</span>
                            {localCartCount > 0 && (
                                <span className="cart-count-badge">
                                    {localCartCount}
                                </span>
                            )}
                        </button>
                    )}

                    <button onClick={onLogout} className="nav-link logout-link">
                        Logout
                    </button>
                </ul>
            </nav>
        </header>
    );
};


const HomePage = ({ navigate }) => (
    <div className="flex flex-col">
        
        <div className="home-hero-section"> 
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight mb-4">
                    Unleash Your Inner Craftsperson
                </h1>
                
                
                <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                    High-quality art supplies and kits to inspire your next creation. Find everything <br /> you need for painting, drawing, and crafting, all in one place.
                </p>
                
                
                <button
                    onClick={() => navigate('products')}
                    className="shop-now-button" 
                >
                    Shop Now
                </button>

            </div>
        </div>

        
        <div className="featured-products-container">
            <div className="max-w-7xl mx-auto">
                <h3 className={`brand text-3xl font-bold mb-10`}>Featured Products</h3>
                
                <div className="featured-grid">
                    {initialProducts.slice(0, 4).map(product => (
                        <div key={product.id} 
                            
                            className="featured-card"
                            style={{backgroundImage: `url(${product.imageUrl})`}}
                            onClick={() => navigate('details', product)}>
                            
                            <span className="text-xs font-semibold text-gray-800 absolute top-3 left-3 bg-white px-2 py-1 rounded-full shadow-sm">New</span>
                            
                            <p className="text-white text-xl font-bold bg-black bg-opacity-30 rounded-lg p-1 text-shadow-md">{product.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        
        <div className="home-info-section">
            <div className="max-w-4xl mx-auto">
                <h3 className={`brand text-2xl font-bold mb-4`}>Quality and Craftsmanship</h3>
                <p className="text-gray-700 max-w-2xl font-bold mx-auto">
                    We source only the finest materials, ensuring every product helps you create masterpieces with ease and joy.
                </p>
            </div>
        </div>
    </div>
);


const ProductCard = ({ product, navigate, onAddToCart }) => {
    const handleAddToCart = (e) => {
        e.stopPropagation();
        onAddToCart(product);
    };

    return (
        <div className="product-card" onClick={() => navigate('details', product)}>
            <div 
                className="product-img"
                style={{ backgroundImage: `url(${product.imageUrl})` }}
                onError={(e) => { e.target.onerror = null; e.target.style.backgroundImage = "url(https://placehold.co/400x300/cccccc/333333?text=Image+Unavailable)"; }}
            ></div>
            
            <div className="product-info">
                <h3 onClick={(e) => { e.stopPropagation(); navigate('details', product); }}>{product.name}</h3>
                <p>{product.description.substring(0, 70)}{product.description.length > 70 ? '...' : ''}</p>
                
                <div className="price-cart">
                    <span className="price">₱{product.price.toFixed(2)}</span>
                    
                    <button
                        onClick={handleAddToCart}
                        className="cart-btn"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};


const ProductListPage = ({ navigate, onAddToCart }) => {
    const products = initialProducts;

    return (
        <section className="products-page">
            <h2>Our Crafting Essentials</h2>
            <p>Explore our curated collection of high-quality art and craft supplies.</p>
            
            <div className="product-grid-page">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        navigate={navigate}
                        onAddToCart={onAddToCart}
                    />
                ))}
            </div>
        </section>
    );
};


const ProductDetailsPage = ({ product, navigate, onAddToCart }) => {
    const productDetails = initialProducts.find(p => p.id === product?.id) || product;
    if (!productDetails) {
        return <div className="p-10 text-center"><h2 className={`text-3xl ${BRAND_PINK_TEXT}`}>Product not found.</h2><button onClick={() => navigate('products')} className="mt-4 nav-link">Go to Catalog</button></div>;
    }

    return (
        <div className="details-container">
            <button 
                onClick={() => navigate('products')} 
                className="back-link"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back to Products
            </button>

            <div className="details-grid">
                
                <div className="details-image-box">
                    <img 
                        src={productDetails.imageUrl} 
                        alt={productDetails.name} 
                        className="details-product-img" 
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x450/cccccc/333333?text=Image+Unavailable"; }}
                    />
                </div>

                
                <div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">{productDetails.name}</h1>
                    <p className="price">
                        ₱{productDetails.price.toFixed(2)}
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed mb-8">
                        {productDetails.description}
                    </p>

                    <div className="details-button-group">
                        <button
                            onClick={() => onAddToCart(productDetails)}
                            className="primary-add-to-cart-btn"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={() => navigate('cart')}
                            className="secondary-btn"
                        >
                            View Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const CartPage = ({ navigate, updateItem, getCartItems }) => {
    
    const items = getCartFromStorage();
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const CartItem = ({ item }) => (
        
        <div className="cart-item-row">
            <div className="cart-item-details">
                
                <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="cart-item-thumbnail" 
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/64x64/cccccc/333333?text=Item"; }}
                />
                <div className='flex-grow'>
                    <p className="font-semibold text-gray-900" title={item.name}>{item.name}</p>
                    <p className="text-gray-500 text-sm">₱{item.price.toFixed(2)}</p>
                </div>
            </div>

            <div className="cart-item-controls">
                
                <div className='qty-controls'>
                    <button 
                        onClick={() => updateItem(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                    >
                        −
                    </button>
                    <span className="text-gray-800">{item.quantity}</span>
                    <button 
                        onClick={() => updateItem(item.id, item.quantity + 1)}
                    >
                        +
                    </button>
                </div>
                
                <p className="font-bold text-gray-800 w-20 text-right">₱{(item.price * item.quantity).toFixed(2)}</p>
                
                
                <button 
                    onClick={() => updateItem(item.id, 0)} 
                    className="remove-item-btn"
                    aria-label="Remove Item"
                >
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </div>
        </div>
    );

    return (
        <div className="checkout-page-container"> 
            <h2 
                className="cart-title-brand"
            >
                Your Shopping Cart
            </h2>

            {items.length === 0 ? (
                
                <div className="empty-cart-card">
        
                    <p style={{
                        fontSize: '1.25rem',
                        color: '#e54b67',
                        marginBottom: '1.5rem'
                    }}>
                        Your cart is empty. Time to get crafting!
                    </p>
                    
                    {}
                    <button
                        onClick={() => navigate('products')}
                        className="empty-cart-link"
                    >
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="cart-items-box">
                    
                    <div className="divide-y divide-gray-100">
                        {items.map(item => <CartItem key={item.id} item={item} />)}
                    </div>
                    
                    
                    <div className="cart-actions-box">
                        <div className="text-xl font-bold text-gray-900">
                            Subtotal: <span className={BRAND_PINK_TEXT}>₱{total.toFixed(2)}</span>
                        </div>
                        
                        
                        <div className="cart-action-buttons">
                            <button
                                onClick={() => navigate('products')}
                                className="continue-shopping-btn"
                            >
                                Continue Shopping
                            </button>
                            <button
                                onClick={() => navigate('checkout')}
                                
                                className="primary-add-to-cart-btn"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const CheckoutPage = ({ navigate, clearCart, getCartItems }) => {
    const cartItems = getCartFromStorage();
    const [isProcessing, setIsProcessing] = useState(false);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 5.00 : 0.00; 
    const taxRate = 0.05; 
    const tax = subtotal * taxRate;
    const finalTotal = subtotal + shipping + tax;

    const handlePlaceOrder = (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert("Your cart is empty! Please add items before checking out.");
            navigate('products');
            return;
        }

        setIsProcessing(true);
        
        setTimeout(() => {
            clearCart(); 
            setIsProcessing(false);
            alert("✅ Order placed successfully! Thank you for shopping with Crafty Corner.");
            navigate('home'); 
        }, 2000);
    };

    return (
        <div className="checkout-page-container">
            <h1 className={`text-4xl font-bold ${BRAND_PINK_TEXT} mb-8 text-center`}>Secure Checkout</h1>
            
            <div className="checkout-grid">

                
                <form onSubmit={handlePlaceOrder} className="checkout-form-box">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">Shipping & Payment</h3>
                    
                    
                    <div className="form-field-wrapper">
                        <input type="text" placeholder="Full Name" required className="checkout-input" />
                    </div>
                    <div className="form-field-wrapper">
                        <input type="email" placeholder="Email Address" required className="checkout-input" />
                    </div>
                    <div className="form-field-wrapper">
                        <input type="text" placeholder="Address Line 1" required className="checkout-input" />

                    </div> 
                    <div className="form-field-wrapper"> 
                        <input type="text" placeholder="City" required className="checkout-input" />
                    </div>
                    
                    <div className="form-field-wrapper"> 
                        <input type="text" placeholder="Postal Code" required className="checkout-input" />
                    </div>

                    <select required className="checkout-input">
                        <option value="">Select Payment Option</option>
                        <option value="cod">Cash on Delivery</option>
                        <option value="gcash">GCash</option> 
                        <option value="card">Credit / Debit Card</option>
                    </select>

                    <button
                        type="submit"
                        disabled={cartItems.length === 0 || isProcessing}
                        
                        className="primary-checkout-btn" 
                    >
                        {isProcessing ? 'Processing Order...' : `Place Order – ₱${finalTotal.toFixed(2)}`}
                    </button>
                    
                    <p className="text-xs text-gray-500 text-center mt-3">By placing your order, you agree to the terms and conditions.</p>
                </form>

                
                
                <div className="order-summary-box">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h3>
                    
                    <div className="space-y-2 text-gray-700">
                        <div className="summary-line-item"><span>Items ({cartItems.length})</span><span>₱{subtotal.toFixed(2)}</span></div>
                        <div className="summary-line-item"><span>Shipping</span><span>₱{shipping.toFixed(2)}</span></div>
                        <div className="summary-line-item border-b border-gray-300 pb-2"><span>Tax (5%)</span><span>₱{tax.toFixed(2)}</span></div>
                        
                        <div className={`summary-line-item summary-total ${BRAND_PINK_TEXT}`}><span>Order Total</span><span>₱{finalTotal.toFixed(2)}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const Footer = () => (
    <footer className="footer">
        <p>Crafty Corner &copy; 2025. All rights reserved.</p>
        <p>Inspiring creativity, one project at a time.</p>
    </footer>
);


const App = () => {
   
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null); 
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cartItems, setCartItems] = useState(getCartFromStorage);

    
    useEffect(() => {
        saveCartToStorage(cartItems);
    }, [cartItems]);

    useEffect(() => {
        if (userRole) {
            localStorage.setItem('userRole', userRole);
            setCurrentPage(userRole === 'user' ? 'home' : 'adminDashboard'); 
        } else {
            localStorage.removeItem('userRole');
        }
    }, [userRole]);


    const handleLogin = (role) => {
        setUserRole(role);
    };

    const handleLogout = () => {
        setUserRole(null);
        clearCart(); 
        setCurrentPage('home'); 
    };

    const navigate = (page, product = null) => {
        if (userRole === 'admin' && page !== 'adminDashboard') return; 
        setCurrentPage(page);
        setSelectedProduct(product);
        window.scrollTo(0, 0);
    };

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1, imageUrl: product.imageUrl }]; 
        });
    };
    
    const updateCartItem = (id, newQuantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            ).filter(item => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart'); 
    };


    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const renderPage = () => {
        if (!userRole) {
            return <Login onLogin={handleLogin} />;
        }

        if (userRole === 'admin') {
            return <AdminDashboard onLogout={handleLogout} />;
        }

        // USER PAGES
        switch (currentPage) {
            case 'home':
                return <HomePage navigate={navigate} />;
            case 'products':
                return <ProductListPage navigate={navigate} onAddToCart={addToCart} />;
            case 'details':
                const productDetails = initialProducts.find(p => p.id === selectedProduct?.id) || selectedProduct;
                return <ProductDetailsPage product={productDetails} navigate={navigate} onAddToCart={addToCart} />;
            case 'cart':
                return <CartPage navigate={navigate} updateItem={updateCartItem} />;
            case 'checkout':
                return <CheckoutPage navigate={navigate} clearCart={clearCart} />;
            default:
                return <HomePage navigate={navigate} />;
        }
    };

    return (
        <> 
            {userRole && (userRole === 'user' ? (
                <Navbar navigate={navigate} currentPage={currentPage} cartItemCount={cartItemCount} onLogout={handleLogout} userRole={userRole} />
            ) : (
                <header className="navbar"></header> 
            ))}

            <main className="flex-grow max-w-full">
                {renderPage()}
            </main>

            {userRole && <Footer />}
        </>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
export default App;

/* import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
    Navigate,
    } from "react-router-dom";

    import Login from "./pages/Login";
    import AdminHome from "./pages/admin/AdminHomePage";
    import UserHomePage from "./pages/user/UserHomePage";
    import Checkout from "./pages/user/Checkout";
    import Cart from "./pages/user/Cart";
    import ProductList from "./pages/user/ProductList";
    import ProductDetails from "./pages/user/ProductDetails";

    function AppContent() {
    const navigate = useNavigate();
    const [role, setRole] = useState(null);

    // ✅ Add cart state
    const [cart, setCart] = useState([]);

    const handleNavigate = (page) => {
        if (page === "home") navigate("/user");
        else if (page === "products") navigate("/user/products");
        else if (page === "cart") navigate("/user/cart");
    };

    const handleLogin = (userRole) => {
        setRole(userRole);
        if (userRole === "admin") navigate("/admin");
        else if (userRole === "user") navigate("/user");
    };

    const handleLogout = () => {
        setRole(null);
        navigate("/login");
    };

    const handleAddToCart = (product) => {
        setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === product.id);
        if (existingItem) {
            return prevCart.map((item) =>
            item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
        } else {
            return [...prevCart, { ...product, quantity: 1 }];
        }
        });
    };

    return (
        <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {}
        <Route path="/user" element={<UserHomePage onLogout={handleLogout} />} />
        <Route path="/user/products" element={<ProductList />} />
        <Route path="/user/products/:id" element={<ProductDetails onAddToCart={handleAddToCart} />} />
        <Route path="/user/cart" element={<Cart cart={cart} setCart={setCart} onLogout={handleLogout} />} />
        <Route path="/user/checkout" element={<Checkout />} />

        {}
        <Route path="/admin" element={<AdminHome onLogout={handleLogout} />} />

        {}
        <Route path="*" element={<Login onLogin={handleLogin} />} />
        </Routes>
    );
    }

    function App() {
    return (
        <Router>
        <AppContent />
        </Router>
    );
}

export default App; */