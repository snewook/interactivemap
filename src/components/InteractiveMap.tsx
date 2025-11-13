import { useState } from 'react';
import { motion } from 'motion/react';
import { BusinessMarker } from './BusinessMarker';
import { Business } from '../types/business';

interface InteractiveMapProps {
  businesses: Business[];
  onBusinessClick: (business: Business) => void;
  selectedBusinessId?: string;
}

export function InteractiveMap({ businesses, onBusinessClick, selectedBusinessId }: InteractiveMapProps) {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  return (
    <svg
      viewBox="0 0 160 100"
      className="w-full h-full"
      style={{ maxHeight: '100vh' }}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Background gradient */}
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#E0F2FE', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#BAE6FD', stopOpacity: 1 }} />
        </linearGradient>
        
        <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#7DD3FC', stopOpacity: 0.6 }} />
          <stop offset="100%" style={{ stopColor: '#0EA5E9', stopOpacity: 0.8 }} />
        </linearGradient>

        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#cbd5e1" strokeWidth="0.1" opacity="0.3" />
        </pattern>
      </defs>

      {/* Sky background */}
      <rect width="160" height="100" fill="url(#skyGradient)" />

      {/* Grid pattern */}
      <rect width="160" height="100" fill="url(#grid)" opacity="0.3" />

      {/* River */}
      <motion.path
        d="M 0 65 Q 40 68, 80 70 T 160 72 L 160 80 Q 120 78, 80 77 T 0 73 Z"
        fill="url(#waterGradient)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Park areas */}
      <motion.ellipse
        cx="72"
        cy="70"
        rx="8"
        ry="6"
        fill="#86efac"
        opacity="0.5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        onMouseEnter={() => setHoveredArea('park1')}
        onMouseLeave={() => setHoveredArea(null)}
        style={{ filter: hoveredArea === 'park1' ? 'brightness(1.2)' : 'none' }}
      />

      <motion.circle
        cx="45"
        cy="52"
        r="5"
        fill="#86efac"
        opacity="0.5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        onMouseEnter={() => setHoveredArea('park2')}
        onMouseLeave={() => setHoveredArea(null)}
        style={{ filter: hoveredArea === 'park2' ? 'brightness(1.2)' : 'none' }}
      />

      {/* Roads */}
      <motion.path
        d="M 0 30 L 160 30"
        stroke="#94a3b8"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
      <motion.path
        d="M 0 30 L 160 30"
        stroke="#f1f5f9"
        strokeWidth="0.3"
        strokeDasharray="2,2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.6 }}
      />

      <motion.path
        d="M 80 0 L 80 100"
        stroke="#94a3b8"
        strokeWidth="1.2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.7 }}
      />
      <motion.path
        d="M 80 0 L 80 100"
        stroke="#f1f5f9"
        strokeWidth="0.3"
        strokeDasharray="2,2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      />

      <motion.path
        d="M 0 50 L 160 50"
        stroke="#94a3b8"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.9 }}
      />

      <motion.path
        d="M 40 0 L 40 100"
        stroke="#94a3b8"
        strokeWidth="0.8"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      />

      <motion.path
        d="M 120 0 L 120 100"
        stroke="#94a3b8"
        strokeWidth="0.8"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 1.1 }}
      />

      {/* Building blocks */}
      {[
        { x: 16, y: 15, w: 8, h: 6 },
        { x: 56, y: 10, w: 6, h: 5 },
        { x: 104, y: 12, w: 7, h: 7 },
        { x: 128, y: 18, w: 8, h: 8 },
        { x: 19, y: 35, w: 6, h: 5 },
        { x: 125, y: 35, w: 9, h: 6 },
        { x: 13, y: 55, w: 7, h: 6 },
        { x: 109, y: 52, w: 5, h: 5 },
      ].map((block, i) => (
        <motion.rect
          key={i}
          x={block.x}
          y={block.y}
          width={block.w}
          height={block.h}
          fill="#e2e8f0"
          stroke="#cbd5e1"
          strokeWidth="0.2"
          rx="0.3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
        />
      ))}

      {/* Business markers */}
      {businesses.map((business) => (
        <BusinessMarker
          key={business.id}
          business={business}
          onClick={() => onBusinessClick(business)}
          isActive={selectedBusinessId === business.id}
        />
      ))}
    </svg>
  );
}