import { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onBuy: (productId: string) => void;
  onRent: (productId: string) => void;
  onAddToCart: (productId: string) => void;
}

export const ProductCard = ({ product, onBuy, onRent, onAddToCart }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="card-product group">
      {/* Favorite Heart */}
      <button
        onClick={toggleFavorite}
        className={`absolute top-4 right-4 z-10 heart-favorite ${isFavorite ? 'active' : ''}`}
        aria-label="Toggle favorite"
      >
        <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
      </button>

      {/* Product Image */}
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-neon">₹{product.price.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground px-2 py-1 bg-muted rounded-lg">
            {product.category}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <button
              onClick={() => onBuy(product.id)}
              className="btn-neon flex-1 text-sm"
            >
              Buy Now
            </button>
            <button
              onClick={() => onRent(product.id)}
              className="btn-neon-outline flex-1 text-sm"
            >
              Rent
            </button>
          </div>
          
          <button
            onClick={() => onAddToCart(product.id)}
            className="btn-cart w-full text-sm flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};