import React from 'react';
import { useApp } from '../context/AppContext';
import { Header } from './Layout/Header';
import { ProgressIndicator } from './Layout/ProgressIndicator';
import { PostcodeStep } from './Steps/PostcodeStep';
import { WasteTypeStep } from './Steps/WasteTypeStep';
import { SelectSkipStep } from './Steps/SelectSkipStep';
import { useIsMobile } from '../hooks/useIsMobile';

/**
 * Main wizard component with enhanced background design
 */
export function SmartSkipWizard() {
  const { currentStep } = useApp();
  const isMobile = useIsMobile();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PostcodeStep />;
      case 2:
        return <WasteTypeStep />;
      case 3:
        return <SelectSkipStep />;
      default:
        return <PostcodeStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-bl from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-red-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      {/* Content */}
      <div className="relative z-10">
        <div className={isMobile ? "px-2 py-4" : "container mx-auto px-4 py-8"}>
          {/* Show header only on first step */}
          {currentStep === 1 && <Header />}
          {/* Progress bar without background square or subtitle */}
          <div className="mb-8">
            <ProgressIndicator />
          </div>
          {/* Main step content */}
          <div className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl shadow-xl p-4 sm:p-8 transition-all duration-300 ${isMobile ? 'mt-4' : 'mt-8'}`}> 
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
}