export interface Technology {
  name: string;
  description: string;
  icon?: string;
}

export interface HistoryItem {
  title: string;
  description: string;
  year?: string;
}

export interface Testimonial {
  text: string;
  author: string;
  group?: string;
}

export interface ExcursionItem {
  text: string;
  imageUrl?: string;
}

export interface Business {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  x: number; // Position on map (percentage)
  y: number; // Position on map (percentage)
  description: string;
  excursions: (string | ExcursionItem)[];
  professions: string[];
  icon: string;
  color: string;
  technologies?: Technology[];
  history?: HistoryItem[];
  testimonials?: Testimonial[];
  imageUrl?: string;
  excursionYears?: number[]; // Годы проведения экскурсий
}

export const businessCategories = {
  museum: { color: '#7c3aed', label: 'Культура' },
  factory: { color: '#1e40af', label: 'Промышленность' },
  tech: { color: '#10B981', label: 'Технологии' },
  food: { color: '#ea580c', label: 'Сервис и гостеприимство' },
  nature: { color: '#14B8A6', label: 'Природа' },
  education: { color: '#7c3aed', label: 'Образование и развитие' },
};