import React from 'react';
import { 
  MapPin, 
  Trash, 
  Package, 
  FileCheck, 
  Calendar, 
  CreditCard 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

// Step configuration with icons, titles, and colors
const steps = [
  { id: 1, title: 'Postcode', icon: MapPin, color: 'from-blue-500 to-cyan-500' },
  { id: 2, title: 'Waste Type', icon: Trash, color: 'from-green-500 to-emerald-500' },
  { id: 3, title: 'Select Skip', icon: Package, color: 'from-purple-500 to-pink-500' },
  { id: 4, title: 'Permit Check', icon: FileCheck, color: 'from-orange-500 to-red-500' },
  { id: 5, title: 'Choose Date', icon: Calendar, color: 'from-indigo-500 to-purple-500' },
  { id: 6, title: 'Payment', icon: CreditCard, color: 'from-pink-500 to-rose-500' },
];

/**
 * Enhanced progress indicator with colorful icons
 */
export function ProgressIndicator() {
  const { currentStep } = useApp();

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            const isLast = index === steps.length - 1;
            // Disable steps after 3
            const isDisabled = step.id > 3;

            return (
              <React.Fragment key={step.id}>
                {/* Step circle and content */}
                <div className="flex flex-col items-center relative group">
                  <div className="relative">
                    {/* Glow effect for active/completed steps */}
                    {(isActive || isCompleted) && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-full blur-lg opacity-30 animate-pulse`}></div>
                    )}
                    <div className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-300
                      ${isActive ? 'border-blue-500 bg-gradient-to-r from-blue-500 to-cyan-500 text-white' :
                        isCompleted ? 'border-green-500 bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
                        'border-gray-600 bg-gray-800 text-gray-400'}
                    `}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <span className={`mt-2 text-xs font-semibold ${isActive ? 'text-blue-400' : isCompleted ? 'text-green-400' : 'text-gray-400'}`}>{step.title}</span>
                </div>
                {/* Connector line */}
                {!isLast && (
                  <div className="flex-1 h-1 mx-2 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full min-w-[32px] my-6"></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}