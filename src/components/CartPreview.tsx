import { useState } from 'react';
import { X, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartItem {
  id: string;
  name: string;
  buyPrice: number;
  image: string;
  quantity: number;
}

interface CartPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onCheckout: () => void;
}

export const CartPreview = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onRemoveItem, 
  onUpdateQuantity,
  onCheckout 
}: CartPreviewProps) => {
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.buyPrice * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-96 bg-card border-l border-border z-50 transform transition-transform duration-300 shadow-2xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-bold text-neon flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Shopping Cart
            </h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="hover:bg-muted"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">{item.name}</h4>
                      <p className="text-sm text-neon font-semibold">₹{item.buyPrice.toLocaleString()}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center hover:bg-primary/30 transition-colors"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium min-w-[2rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center hover:bg-primary/30 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-destructive hover:text-destructive/80 transition-colors p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-border">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-foreground">Total:</span>
                <span className="text-2xl font-bold text-neon">₹{totalPrice.toLocaleString()}</span>
              </div>
              <Button 
                onClick={onCheckout}
                className="w-full btn-neon text-lg py-3"
              >
                Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};