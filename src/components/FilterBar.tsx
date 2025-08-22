import { ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const FilterBar = ({ 
  selectedCategory, 
  onCategoryChange, 
  sortBy, 
  onSortChange 
}: FilterBarProps) => {
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'machinery', label: 'Machinery' },
    { value: 'fertilizers', label: 'Fertilizers' },
    { value: 'seeds', label: 'Seeds' },
    { value: 'tools', label: 'Tools' },
    { value: 'others', label: 'Others' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popularity', label: 'Popularity' }
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 p-6 bg-card rounded-2xl border border-border">
      <div className="flex-1">
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Filter by Category
        </label>
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="bg-input border-border text-foreground">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {categories.map((category) => (
              <SelectItem 
                key={category.value} 
                value={category.value}
                className="text-popover-foreground hover:bg-accent"
              >
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Sort by
        </label>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="bg-input border-border text-foreground">
            <SelectValue placeholder="Sort products" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {sortOptions.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                className="text-popover-foreground hover:bg-accent"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};