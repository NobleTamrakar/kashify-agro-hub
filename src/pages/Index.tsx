import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { FilterBar } from '@/components/FilterBar';
import { ProductCard } from '@/components/ProductCard';
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
  price: number;
  image: string;
  category: string;
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'John Deere Tractor 5075E',
    price: 850000,
    image: tractorImg,
    category: 'machinery'
  },
  {
    id: '2',
    name: 'Automatic Seed Drill',
    price: 125000,
    image: seedDrillImg,
    category: 'machinery'
  },
  {
    id: '3',
    name: 'Fertilizer Spreader Pro',
    price: 75000,
    image: fertilizerImg,
    category: 'machinery'
  },
  {
    id: '4',
    name: 'Organic Manure (50kg)',
    price: 2500,
    image: manureImg,
    category: 'fertilizers'
  },
  {
    id: '5',
    name: 'Irrigation Water Pump',
    price: 35000,
    image: pumpImg,
    category: 'machinery'
  },
  {
    id: '6',
    name: 'Professional Hand Tools Set',
    price: 8500,
    image: toolsImg,
    category: 'tools'
  }
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [cartCount, setCartCount] = useState(0);
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
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'popularity':
          return b.price - a.price; // Using price as popularity proxy
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
    setCartCount(prev => prev + 1);
    toast({
      title: "Added to Cart",
      description: `${product?.name} added to your cart`,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Kashify brand and cart */}
        <Header cartCount={cartCount} />

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
      </div>
    </div>
  );
};

export default Index;
