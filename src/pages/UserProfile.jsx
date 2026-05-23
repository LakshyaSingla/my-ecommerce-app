import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';

const UserProfile = () => {
  const { user, logout } = useContext(AuthContext);

  // Security Check: If no user is logged in, redirect them to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Mock Data: Simulating past orders from a database
  const orderHistory = [
    { id: 'ORD-8472', date: '2026-05-12', total: 109.50, status: 'Delivered' },
    { id: 'ORD-9102', date: '2026-05-19', total: 299.99, status: 'Shipped' },
  ];

  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black mb-1">My Profile</h1>
            <p className="text-cyan-400 font-medium">{user.email}</p>
          </div>
          <button 
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-bold transition-colors shadow-md"
          >
            Log Out
          </button>
        </div>

        {/* Order History Section */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Order History</h2>
          
          {orderHistory.length === 0 ? (
            <p className="text-slate-500 italic">You haven't placed any orders yet.</p>
          ) : (
            <div className="space-y-4">
              {orderHistory.map((order) => (
                <div key={order.id} className="border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center hover:shadow-md transition-shadow">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Order #{order.id} &bull; {order.date}</p>
                    <p className="font-bold text-slate-800 text-lg">${order.total.toFixed(2)}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 pt-8 border-t border-slate-100">
            <Link to="/" className="text-cyan-600 font-bold hover:underline inline-block">
              &larr; Continue Shopping
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;