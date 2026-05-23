import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email, password);
      navigate('/'); // Redirect to home after login
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-slate-800 text-center mb-8">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-slate-700 font-medium mb-2">Email Address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>
        <div>
          <label className="block text-slate-700 font-medium mb-2">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-cyan-600 transition duration-300"
        >
          Sign In
        </button>
      </form>
      <p className="text-center text-slate-500 mt-6">
        Don't have an account? <span className="text-cyan-600 font-bold cursor-pointer hover:underline">Sign up</span>
      </p>
    </div>
  );
};

export default Login;