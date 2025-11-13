import { motion } from 'motion/react';
import { Badge } from './ui/badge';
import { businessCategories } from '../types/business';
import { Info } from 'lucide-react';

export function MapLegend() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
      className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200"
    >
      <div className="flex items-center gap-2 mb-4">
        <Info className="w-5 h-5" style={{ color: 'var(--accent)' }} />
        <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--primary)' }}>Категории</h3>
      </div>
      
      <div className="space-y-2">
        {Object.entries(businessCategories).map(([key, category]) => (
          <div key={key} className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 transition-colors">
            <div
              className="w-4 h-4 rounded-full flex-shrink-0 shadow-sm"
              style={{ backgroundColor: category.color }}
            />
            <span className="text-sm" style={{ color: 'var(--foreground)' }}>{category.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
