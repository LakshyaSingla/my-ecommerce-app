import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true); // Toggle between Login and Signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(''); // Store error messages
  
  const { login, signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(''); // Clear old errors

    if (email && password) {
      let result;
      
      if (isLoginMode) {
        result = login(email, password);
      } else {
        result = signup(email, password);
      }

      // Check if the login/signup was successful
      if (result.success) {
        navigate('/'); // Redirect to home on success
      } else {
        setErrorMsg(result.message); // Display the error (e.g., wrong password)
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-xl shadow-lg border border-slate-100">
      <h2 className="text-3xl font-black text-slate-800 text-center mb-2">
        {isLoginMode ? 'Welcome Back' : 'Create an Account'}
      </h2>
      <p className="text-center text-slate-500 mb-8">
        {isLoginMode ? 'Sign in to access your cart and orders.' : 'Sign up to start shopping.'}
      </p>

      {/* Error Message Display */}
      {errorMsg && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-semibold mb-6 text-center">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-slate-700 font-bold mb-2">Email Address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50"
            required
          />
        </div>
        <div>
          <label className="block text-slate-700 font-bold mb-2">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50"
            required
            minLength="6"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-slate-900 text-white font-black text-lg py-3 rounded-lg hover:bg-cyan-600 transition-colors duration-300 shadow-md mt-4"
        >
          {isLoginMode ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
      
      {/* Toggle Button */}
      <div className="text-center mt-8 pt-6 border-t border-slate-100">
        <p className="text-slate-500">
          {isLoginMode ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button"
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setErrorMsg(''); // Clear errors when switching modes
            }}
            className="text-cyan-600 font-black hover:underline cursor-pointer"
          >
            {isLoginMode ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;