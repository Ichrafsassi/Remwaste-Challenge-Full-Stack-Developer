// Type definitions for the SmartSkip application

export interface Skip {
  id: number;
  size: string; // e.g., "4 Yards", "6 Yards"
  hire_period: string; // e.g., "14 days"
  price_before_vat: number;
  vat: number;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

export interface UserFormData {
  postcode: string;
  area: string;
  wasteTypes: string[];
  heavyWasteTypes: string[];
  selectedSkip: Skip | null;
  permitRequired: boolean;
  selectedDate: string;
  paymentInfo: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    name: string;
  };
}

export interface StepInfo {
  id: number;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  active: boolean;
}