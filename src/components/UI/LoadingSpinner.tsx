/**
 * Enhanced loading spinner with colorful design
 */
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({ message = 'Loading...', size = 'md' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        {/* Multiple colorful glow layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-lg opacity-30 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-md opacity-20 animate-pulse delay-300"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-sm opacity-10 animate-pulse delay-700"></div>
        
        {/* Spinner with gradient */}
        <div className="relative">
          <Loader2 className={`${sizeClasses[size]} text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text animate-spin relative z-10`} />
          <div className={`absolute inset-0 ${sizeClasses[size]} bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur-sm opacity-50 animate-spin`}></div>
        </div>
      </div>
      <p className="text-gray-400 mt-4 bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent font-medium">
        {message}
      </p>
    </div>
  );
}