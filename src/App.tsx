import { useState } from 'react';
import { motion } from 'motion/react';
import { Map, Sparkles } from 'lucide-react';
import { InteractiveMap } from './components/InteractiveMap';
import { BusinessDetailDialog } from './components/BusinessDetailDialog';
import { businesses } from './data/businesses';
import { Business } from './types/business';

export default function App() {
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  const handleNextBusiness = () => {
    if (!selectedBusiness) return;
    
    const currentIndex = businesses.findIndex(b => b.id === selectedBusiness.id);
    const nextIndex = (currentIndex + 1) % businesses.length;
    setSelectedBusiness(businesses[nextIndex]);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b-2 border-gray-300 sticky top-0 z-30 shadow-md"
      >
        <div className="container mx-auto px-6 py-6 max-w-screen-2xl 4k:max-w-none">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div 
                className="w-16 h-16 rounded-md flex items-center justify-center shadow-lg"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                <Map className="w-9 h-9 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 style={{ fontFamily: 'var(--font-heading)' }}>Карта профессионального пути</h1>
                <p className="text-sm text-gray-600 mt-1">Образовательные экскурсии на предприятия-партнёры техникума</p>
              </div>
            </div>

            <div 
              className="hidden sm:flex items-center gap-3 text-sm px-5 py-3 rounded-md shadow-sm"
              style={{ backgroundColor: 'var(--accent)', color: 'white' }}
            >
              <Sparkles className="w-5 h-5" />
              <span>{businesses.length} предприятий</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6 max-w-screen-2xl 4k:max-w-none 4k:px-12">
        {/* Simple Hint Above Map */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            <Map className="w-5 h-5 text-white" />
          </motion.div>
          <p className="text-lg" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-body)' }}>
            Нажмите на маркер предприятия на карте
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-gray-300 2k:w-full 4k:w-full"
          style={{ height: 'calc(100vh - 220px)', minHeight: '700px' }}
        >
          <div className="w-full h-full p-8 4k:p-12">
            <InteractiveMap
              businesses={businesses}
              onBusinessClick={setSelectedBusiness}
              selectedBusinessId={selectedBusiness?.id}
            />
          </div>
        </motion.div>
      </div>

      {/* Business Detail Dialog */}
      <BusinessDetailDialog
        business={selectedBusiness}
        onClose={() => setSelectedBusiness(null)}
        onNext={handleNextBusiness}
      />
    </div>
  );
}