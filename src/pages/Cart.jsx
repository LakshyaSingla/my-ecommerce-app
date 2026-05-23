import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="text-center mt-32">
        <h2 className="text-3xl font-bold text-slate-700">Your cart is empty</h2>
        <Link to="/" className="text-cyan-600 font-semibold mt-4 inline-block hover:underline">
          &larr; Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">Shopping Cart</h1>
      <div className="bg-white rounded-xl shadow-lg p-8">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center border-b border-slate-100 py-6 last:border-0">
            <div className="flex items-center gap-6">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg shadow-sm" />
              <div>
                <h2 className="text-xl font-bold text-slate-800">{item.name}</h2>
                <p className="text-slate-500 font-medium mt-1">Quantity: {item.quantity}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              <span className="font-black text-xl text-slate-800">${(item.price * item.quantity).toFixed(2)}</span>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 font-bold text-sm uppercase tracking-wider"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="mt-8 pt-8 border-t-2 border-slate-100 flex justify-between items-center">
          <span className="text-2xl font-bold text-slate-500">Subtotal</span>
          <span className="text-4xl font-black text-cyan-600">${total.toFixed(2)}</span>
        </div>
        <button className="w-full mt-8 bg-cyan-500 text-slate-900 py-4 rounded-xl font-black text-lg hover:bg-cyan-400 transition shadow-lg">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;