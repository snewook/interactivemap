import { motion } from 'motion/react';
import { 
  Building2, 
  Cpu, 
  TreePine, 
  Coffee, 
  GraduationCap, 
  Factory, 
  Theater, 
  Zap, 
  ChefHat, 
  Telescope,
  Gauge,
  Flame,
  Wrench,
  Mountain,
  UtensilsCrossed,
  Shirt,
  Award,
  LucideIcon
} from 'lucide-react';
import { Business } from '../types/business';

interface BusinessMarkerProps {
  business: Business;
  onClick: () => void;
  isActive: boolean;
}

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Cpu,
  TreePine,
  Coffee,
  GraduationCap,
  Factory,
  Theater,
  Zap,
  ChefHat,
  Telescope,
  Gauge,
  Flame,
  Wrench,
  Mountain,
  UtensilsCrossed,
  Shirt,
  Award,
};

export function BusinessMarker({ business, onClick, isActive }: BusinessMarkerProps) {
  const Icon = iconMap[business.icon] || Building2;

  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: Math.random() * 0.5 }}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      {/* Pulse ring when active */}
      {isActive && (
        <motion.circle
          cx={business.x}
          cy={business.y}
          r="7"
          fill="none"
          stroke={business.color}
          strokeWidth="0.5"
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      
      {/* Hover glow */}
      <motion.circle
        cx={business.x}
        cy={business.y}
        r="6"
        fill={business.color}
        opacity="0.2"
        whileHover={{ scale: 1.3, opacity: 0.4 }}
        transition={{ duration: 0.2 }}
      />

      {/* Main marker circle (круглый) */}
      <motion.circle
        cx={business.x}
        cy={business.y}
        r="5"
        fill={business.color}
        stroke="white"
        strokeWidth="0.4"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      />

      {/* Icon */}
      <motion.g
        whileHover={{ y: -0.5 }}
        transition={{ duration: 0.2 }}
      >
        <foreignObject
          x={business.x - 2.5}
          y={business.y - 2.5}
          width="5"
          height="5"
          style={{ pointerEvents: 'none' }}
        >
          <div className="flex items-center justify-center w-full h-full">
            <Icon className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
        </foreignObject>
      </motion.g>
    </motion.g>
  );
}