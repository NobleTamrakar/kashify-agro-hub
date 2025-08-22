import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { FilterBar } from '@/components/FilterBar';
import { ProductCard } from '@/components/ProductCard';
import { CartPreview } from '@/components/CartPreview';
import { useToast } from '@/hooks/use-toast';

// Import product images
import tractorImg from '@/assets/tractor.jpg';
import seedDrillImg from '@/assets/seed-drill.jpg';
import fertilizerImg from '@/assets/fertilizer-spreader.jpg';
import manureImg from '@/assets/manure-bag.jpg';
import pumpImg from '@/assets/irrigation-pump.jpg';
import toolsImg from '@/assets/hand-tools.jpg';

interface Product {
  id: string;
  name: string;
  buyPrice: number;
  rentPrice: number;
  description: string;
  image: string;
  category: string;
}

interface CartItem {
  id: string;
  name: string;
  buyPrice: number;
  image: string;
  quantity: number;
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Mahindra 575 DI Tractor',
    buyPrice: 850000,
    rentPrice: 2500,
    description: 'Fuel-efficient tractor, best for medium farms with advanced hydraulics',
    image: tractorImg,
    category: 'machinery'
  },
  {
    id: '2',
    name: 'Automatic Seed Drill Machine',
    buyPrice: 125000,
    rentPrice: 800,
    description: 'Precision seeding with adjustable depth control for optimal crop yield',
    image: seedDrillImg,
    category: 'machinery'
  },
  {
    id: '3',
    name: 'Fertilizer Spreader Pro',
    buyPrice: 75000,
    rentPrice: 500,
    description: 'Even distribution fertilizer spreader with GPS navigation system',
    image: fertilizerImg,
    category: 'machinery'
  },
  {
    id: '4',
    name: 'Organic Manure (50kg Bags)',
    buyPrice: 2500,
    rentPrice: 50,
    description: 'Premium organic manure for soil enrichment and crop nutrition',
    image: manureImg,
    category: 'fertilizers'
  },
  {
    id: '5',
    name: 'High-Pressure Irrigation Pump',
    buyPrice: 35000,
    rentPrice: 300,
    description: 'Reliable water pump with self-priming technology for all farm sizes',
    image: pumpImg,
    category: 'machinery'
  },
  {
    id: '6',
    name: 'Professional Hand Tools Set',
    buyPrice: 8500,
    rentPrice: 150,
    description: 'Complete farming tool kit including hoe, spade, rake, and pruning shears',
    image: toolsImg,
    category: 'tools'
  }
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = PRODUCTS;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Sort products
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.buyPrice - b.buyPrice;
        case 'price-high':
          return b.buyPrice - a.buyPrice;
        case 'popularity':
          return b.buyPrice - a.buyPrice; // Using price as popularity proxy
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [selectedCategory, sortBy]);

  const handleBuy = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId);
    toast({
      title: "Purchase Initiated",
      description: `Processing purchase for ${product?.name}`,
      duration: 3000,
    });
  };

  const handleRent = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId);
    toast({
      title: "Rental Request",
      description: `Rental inquiry sent for ${product?.name}`,
      duration: 3000,
    });
  };

  const handleAddToCart = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === productId);
      if (existingItem) {
        return prev.map(item =>
          item.id === productId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, {
          id: product.id,
          name: product.name,
          buyPrice: product.buyPrice,
          image: product.image,
          quantity: 1
        }];
      }
    });

    toast({
      title: "Added to Cart",
      description: `${product?.name} added to your cart`,
      duration: 2000,
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveFromCart(productId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout Initiated",
      description: `Processing ${cartItems.length} items for checkout`,
      duration: 3000,
    });
    setIsCartOpen(false);
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Kashify brand and cart */}
        <Header 
          cartCount={totalCartItems} 
          onCartClick={() => setIsCartOpen(true)} 
        />

        {/* Filters and Sorting */}
        <FilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuy={handleBuy}
              onRent={handleRent}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* No products message */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              No products found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to see more results.
            </p>
          </div>
        )}

        {/* Cart Preview */}
        <CartPreview
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onRemoveItem={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
};

export default Index;
