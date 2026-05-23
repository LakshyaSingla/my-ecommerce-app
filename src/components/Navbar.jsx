import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext"; // Import the new context

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext); // Get user state
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-slate-900 p-4 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold tracking-wider text-cyan-400"
        >
          INLIGHN TECH
        </Link>
        <div className="space-x-8 font-semibold flex items-center">
          <Link to="/" className="hover:text-cyan-300 transition">
            Shop
          </Link>
          <Link
            to="/cart"
            className="hover:text-cyan-300 transition flex items-center gap-2"
          >
            Cart
            <span className="bg-cyan-500 text-slate-900 px-2 py-0.5 rounded-full text-sm">
              {cartCount}
            </span>
          </Link>

          {/* Conditional Rendering for Authentication */}
          {user ? (
            <div className="flex items-center gap-6">
              <Link
                to="/profile"
                className="text-slate-300 border-l border-slate-600 pl-6 hover:text-cyan-300 transition-colors flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium">{user.name}</span>
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-cyan-500 text-slate-900 px-5 py-2 rounded-lg font-bold hover:bg-cyan-400 transition-colors ml-4 shadow-md"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
