/**
 * Constants for waste types and heavy waste options
 */
import { Building, Home, Leaf } from 'lucide-react';

export const WASTE_TYPES = [
  {
    id: 'construction',
    title: 'Construction Waste',
    description: 'Building materials and renovation debris.',
    icon: Building,
  },
  {
    id: 'household',
    title: 'Household Waste',
    description: 'General household items and furniture.',
    icon: Home,
  },
  {
    id: 'garden',
    title: 'Garden Waste',
    description: 'Green waste and landscaping materials.',
    icon: Leaf,
  },
  {
    id: 'commercial',
    title: 'Commercial Waste',
    description: 'Business and office clearance.',
    icon: Building,
  },
] as const;

export const HEAVY_WASTE_OPTIONS = [
  'Soil', 
  'Concrete', 
  'Bricks', 
  'Tiles', 
  'Sand', 
  'Gravel', 
  'Rubble'
] as const;