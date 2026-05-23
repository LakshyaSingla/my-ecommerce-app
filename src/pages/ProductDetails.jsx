import { useParams, Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import productsData from '../data/products.json';

const ProductDetails = () => {
  // Grab the product ID from the URL parameters
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  // Find the exact product from our JSON file
  // We use parseInt because the URL parameter is a string, but our IDs are numbers
  const product = productsData.find((p) => p.id === parseInt(id));

  // Safety check: If someone types a random ID in the URL that doesn't exist
  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-slate-700 mb-4">Product not found</h2>
        <Link to="/" className="text-cyan-600 font-bold hover:underline">
          &larr; Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-5xl mx-auto">
      <Link to="/" className="text-slate-500 hover:text-cyan-600 font-semibold mb-6 inline-block transition-colors">
        &larr; Back to Shop
      </Link>
      
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="md:w-1/2">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-96 md:h-full object-cover"
          />
        </div>
        
        {/* Product Info */}
        <div className="p-8 md:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl font-black text-slate-800 mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-cyan-600 mb-6">${product.price.toFixed(2)}</p>
          <p className="text-slate-600 text-lg leading-relaxed mb-8 flex-grow">
            {product.description}
            <br/><br/>
            (In a real application, this is where you would put the long-form product details, specifications, dimensions, and customer reviews!)
          </p>
          
          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-slate-900 text-white font-black text-lg py-4 rounded-xl hover:bg-cyan-600 transition-colors duration-300 shadow-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;