import { ShoppingCart } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartCount, onCartClick }: HeaderProps) => {
  return (
    <header className="relative">
      {/* Kashify Brand */}
      <div className="text-center py-8">
        <h1 className="text-6xl font-bold glow-text tracking-wider">
          KASHIFY
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Premium Farmer Tools & Equipment
        </p>
      </div>

      {/* Cart Icon */}
      <div className="absolute top-8 right-8">
        <div className="relative">
          <button 
            onClick={onCartClick}
            className="p-3 bg-card border border-border rounded-xl hover:bg-accent transition-all duration-300 hover:shadow-[var(--shadow-neon)] hover:scale-105"
          >
            <ShoppingCart className="w-6 h-6 text-primary" />
          </button>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse shadow-[var(--glow-intense)]">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};