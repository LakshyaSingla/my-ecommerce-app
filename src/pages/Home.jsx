import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import productsData from '../data/products.json';

const Home = () => {
  const { addToCart } = useContext(CartContext);
  
  // State for search and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  // Filter and Sort Logic
  const filteredProducts = productsData
    .filter((product) => 
      // Filter by name or description
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      // Sort by price
      if (sortOrder === 'price-asc') return a.price - b.price;
      if (sortOrder === 'price-desc') return b.price - a.price;
      return 0; // Default order
    });

  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-slate-800">Featured Products</h1>
        
        {/* Search and Filter Controls */}
        <div className="flex w-full md:w-auto gap-4">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow md:w-64 px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm"
          />
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm bg-white cursor-pointer"
          >
            <option value="default">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Conditional rendering if no products match the search */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-slate-500">No products found matching "{searchTerm}"</h2>
          <button 
            onClick={() => setSearchTerm('')}
            className="mt-4 text-cyan-600 font-bold hover:underline"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Map over the FILTERED array instead of the raw data */}
          {filteredProducts.map((product) => (
  <div key={product.id} className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
    
    {/* Make the image and title clickable links */}
    <Link to={`/product/${product.id}`} className="block flex-grow cursor-pointer group">
      <div className="overflow-hidden rounded-lg mb-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
      </div>
      <h2 className="text-xl font-bold text-slate-800 group-hover:text-cyan-600 transition-colors">
        {product.name}
      </h2>
    </Link>

    <p className="text-slate-500 text-sm mt-2">{product.description}</p>
    
    <div className="mt-6 flex justify-between items-center">
      <span className="text-2xl font-black text-cyan-600">${product.price.toFixed(2)}</span>
      <button 
        onClick={() => addToCart(product)}
        className="bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-cyan-600 transition-colors font-semibold shadow-md"
      >
        Add to Cart
      </button>
    </div>
  </div>
))}
        </div>
      )}
    </div>
  );
};

export default Home;