import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { UserFormData, Skip } from '../types';

// Define the initial state for user form data
const initialFormData: UserFormData = {
  postcode: '',
  area: '',
  wasteTypes: [],
  heavyWasteTypes: [],
  selectedSkip: null,
  permitRequired: false,
  selectedDate: '',
  paymentInfo: {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
  },
};

// Define action types for the reducer
type Action =
  | { type: 'SET_POSTCODE'; payload: string }
  | { type: 'SET_AREA'; payload: string }
  | { type: 'SET_WASTE_TYPES'; payload: string[] }
  | { type: 'SET_HEAVY_WASTE_TYPES'; payload: string[] }
  | { type: 'SET_SELECTED_SKIP'; payload: Skip | null }
  | { type: 'SET_PERMIT_REQUIRED'; payload: boolean }
  | { type: 'SET_SELECTED_DATE'; payload: string }
  | { type: 'SET_PAYMENT_INFO'; payload: Partial<UserFormData['paymentInfo']> }
  | { type: 'RESET_FORM' }
  | { type: 'LOAD_FROM_STORAGE'; payload: UserFormData };

// Context interface
interface AppContextType {
  formData: UserFormData;
  currentStep: number;
  dispatch: React.Dispatch<Action>;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Reducer function to manage form state
function formReducer(state: UserFormData, action: Action): UserFormData {
  switch (action.type) {
    case 'SET_POSTCODE':
      return { ...state, postcode: action.payload };
    case 'SET_AREA':
      return { ...state, area: action.payload };
    case 'SET_WASTE_TYPES':
      return { ...state, wasteTypes: action.payload };
    case 'SET_HEAVY_WASTE_TYPES':
      return { ...state, heavyWasteTypes: action.payload };
    case 'SET_SELECTED_SKIP':
      return { ...state, selectedSkip: action.payload };
    case 'SET_PERMIT_REQUIRED':
      return { ...state, permitRequired: action.payload };
    case 'SET_SELECTED_DATE':
      return { ...state, selectedDate: action.payload };
    case 'SET_PAYMENT_INFO':
      return { 
        ...state, 
        paymentInfo: { ...state.paymentInfo, ...action.payload }
      };
    case 'RESET_FORM':
      return initialFormData;
    case 'LOAD_FROM_STORAGE':
      return action.payload;
    default:
      return state;
  }
}

// Context Provider Component
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [formData, dispatch] = useReducer(formReducer, initialFormData);
  const [currentStep, setCurrentStep] = React.useState(1);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('smartskip-data');
    const savedStep = localStorage.getItem('smartskip-step');

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsedData });
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    }

    if (savedStep) {
      setCurrentStep(Number(savedStep));
    }
  }, []);

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('smartskip-data', JSON.stringify(formData));
  }, [formData]);

  // Save current step to localStorage
  useEffect(() => {
    localStorage.setItem('smartskip-step', currentStep.toString());
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const value: AppContextType = {
    formData,
    currentStep,
    dispatch,
    setCurrentStep,
    nextStep,
    prevStep,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}