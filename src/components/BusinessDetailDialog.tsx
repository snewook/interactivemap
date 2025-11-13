import { X, MapPin, Briefcase, Compass, Cpu, BookOpen, MessageSquare, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Business, ExcursionItem } from '../types/business';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface BusinessDetailDialogProps {
  business: Business | null;
  onClose: () => void;
  onNext?: () => void;
}

export function BusinessDetailDialog({ business, onClose, onNext }: BusinessDetailDialogProps) {
  const [expandedExcursion, setExpandedExcursion] = useState<number | null>(null);
  
  if (!business) return null;

  const isExcursionItem = (excursion: string | ExcursionItem): excursion is ExcursionItem => {
    return typeof excursion === 'object' && 'text' in excursion;
  };

  const hasAnyImages = business.excursions.some(exc => isExcursionItem(exc) && exc.imageUrl);

  return (
    <AnimatePresence>
      {business && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div
              className="relative px-8 py-6"
              style={{ backgroundColor: `${business.color}10`, borderBottom: `3px solid ${business.color}` }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 hover:bg-white/80"
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </Button>

              <div className="flex items-start gap-5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: business.color }}
                >
                  <MapPin className="w-10 h-10 text-white" strokeWidth={2} />
                </motion.div>

                <div className="flex-1">
                  <h2 className="mb-2">{business.name}</h2>
                  <Badge 
                    variant="secondary" 
                    className="text-sm px-3 py-1"
                    style={{ backgroundColor: `${business.color}20`, color: business.color, border: 'none' }}
                  >
                    {business.subcategory}
                  </Badge>
                  <p className="mt-3 text-gray-700 leading-relaxed">{business.description}</p>
                </div>
              </div>
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="excursions" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger 
                  value="excursions" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--accent)] data-[state=active]:bg-transparent px-6 py-3 gap-2"
                >
                  <Compass className="w-4 h-4" />
                  Экскурсии
                </TabsTrigger>
                {business.technologies && business.technologies.length > 0 && (
                  <TabsTrigger 
                    value="technologies" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--accent)] data-[state=active]:bg-transparent px-6 py-3 gap-2"
                  >
                    <Cpu className="w-4 h-4" />
                    Технологии
                  </TabsTrigger>
                )}
                {business.history && business.history.length > 0 && (
                  <TabsTrigger 
                    value="history" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--accent)] data-[state=active]:bg-transparent px-6 py-3 gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    История
                  </TabsTrigger>
                )}
                {business.testimonials && business.testimonials.length > 0 && (
                  <TabsTrigger 
                    value="testimonials" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--accent)] data-[state=active]:bg-transparent px-6 py-3 gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Отзывы
                  </TabsTrigger>
                )}
                <TabsTrigger 
                  value="careers" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--accent)] data-[state=active]:bg-transparent px-6 py-3 gap-2"
                >
                  <Briefcase className="w-4 h-4" />
                  Карьера
                </TabsTrigger>
              </TabsList>

              <ScrollArea className="h-[calc(90vh-340px)]">
                {/* Excursions Tab */}
                <TabsContent value="excursions" className="p-8 mt-0">
                  <div className="space-y-4">
                    {business.excursions.map((excursion, index) => {
                      const excItem = isExcursionItem(excursion) ? excursion : { text: excursion };
                      const hasImage = Boolean(excItem.imageUrl);
                      const isExpanded = expandedExcursion === index;
                      
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                        >
                          <div
                            className={`flex items-start gap-4 p-4 rounded-lg transition-all border-l-4 ${
                              hasImage 
                                ? 'bg-gradient-to-r from-orange-50 to-gray-50 hover:from-orange-100 hover:to-gray-100 cursor-pointer' 
                                : 'bg-gray-50 hover:bg-gray-100'
                            }`}
                            style={{ borderLeftColor: business.color }}
                            onClick={() => hasImage && setExpandedExcursion(isExpanded ? null : index)}
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white relative ${
                                hasImage ? 'cursor-pointer' : ''
                              }`}
                              style={{ backgroundColor: business.color }}
                            >
                              {index + 1}
                              {hasImage && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center">
                                  <ImageIcon className="w-2.5 h-2.5 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <span className="text-gray-800 leading-relaxed pt-1 block">
                                {excItem.text}
                              </span>
                              {hasImage && !isExpanded && (
                                <span className="text-xs text-orange-600 mt-1 block">
                                  Нажмите, чтобы увидеть фото
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* Image expand */}
                          <AnimatePresence>
                            {hasImage && isExpanded && excItem.imageUrl && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-2 overflow-hidden rounded-lg ml-12"
                              >
                                <ImageWithFallback
                                  src={excItem.imageUrl}
                                  alt={excItem.text}
                                  className="w-full max-w-2xl h-auto rounded-lg shadow-lg object-contain"
                                  style={{ maxHeight: '400px' }}
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                </TabsContent>

                {/* Technologies Tab */}
                {business.technologies && (
                  <TabsContent value="technologies" className="p-8 mt-0">
                    <div className="grid md:grid-cols-2 gap-6">
                      {business.technologies.map((tech, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * index }}
                          className="p-5 rounded-lg border-2 hover:shadow-lg transition-all"
                          style={{ borderColor: `${business.color}40` }}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${business.color}20` }}
                            >
                              <Cpu className="w-5 h-5" style={{ color: business.color }} />
                            </div>
                            <h4 className="text-gray-900">{tech.name}</h4>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">{tech.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                )}

                {/* History Tab */}
                {business.history && (
                  <TabsContent value="history" className="p-8 mt-0">
                    <div className="space-y-6">
                      {business.history.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="relative pl-8 pb-6 border-l-2"
                          style={{ borderLeftColor: `${business.color}40` }}
                        >
                          <div 
                            className="absolute left-[-9px] top-0 w-4 h-4 rounded-full"
                            style={{ backgroundColor: business.color }}
                          />
                          {item.year && (
                            <Badge 
                              variant="outline" 
                              className="mb-2"
                              style={{ borderColor: business.color, color: business.color }}
                            >
                              {item.year}
                            </Badge>
                          )}
                          <h4 className="mb-2 text-gray-900">{item.title}</h4>
                          <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                )}

                {/* Testimonials Tab */}
                {business.testimonials && (
                  <TabsContent value="testimonials" className="p-8 mt-0">
                    <div className="space-y-6">
                      {business.testimonials.map((testimonial, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="p-6 rounded-lg relative"
                          style={{ backgroundColor: `${business.color}08` }}
                        >
                          <div 
                            className="absolute top-6 left-6 text-6xl opacity-20"
                            style={{ color: business.color }}
                          >
                            "
                          </div>
                          <p className="text-gray-800 leading-relaxed mb-4 relative z-10 italic">
                            {testimonial.text}
                          </p>
                          <div className="flex items-center gap-2 relative z-10">
                            <div 
                              className="w-1 h-8 rounded-full"
                              style={{ backgroundColor: business.color }}
                            />
                            <div>
                              <p className="text-sm text-gray-900">{testimonial.author}</p>
                              {testimonial.group && (
                                <p className="text-xs text-gray-600">{testimonial.group}</p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                )}

                {/* Careers Tab */}
                <TabsContent value="careers" className="p-8 mt-0">
                  <div className="mb-6">
                    <h3 className="mb-2 text-gray-900">Профессии и карьерные возможности</h3>
                    <p className="text-gray-600 text-sm">
                      Специальности техникума, которые откроют вам путь на это предприятие
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {business.professions.map((profession, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 * index }}
                      >
                        <Badge
                          variant="outline"
                          className="px-4 py-2 text-sm hover:shadow-md transition-all cursor-pointer"
                          style={{ 
                            borderColor: business.color, 
                            color: business.color,
                            backgroundColor: `${business.color}10`
                          }}
                        >
                          {profession}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>

            {/* Footer */}
            <div className="px-8 py-5 border-t bg-gray-50 flex gap-3">
              <Button
                className="flex-1 h-12 text-base hover:opacity-90"
                style={{ backgroundColor: business.color }}
                onClick={onClose}
              >
                Вернуться на карту
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-12 text-base hover:bg-transparent"
                style={{ borderColor: business.color, color: business.color }}
                onClick={onNext}
              >
                Следующее предприятие
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}