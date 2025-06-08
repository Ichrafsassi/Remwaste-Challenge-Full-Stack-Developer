/**
 * Enhanced error message component with colorful design
 */
import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ 
  title = 'Something went wrong', 
  message, 
  onRetry 
}: ErrorMessageProps) {
  return (
    <div className="relative bg-gradient-to-br from-red-900/20 to-pink-900/20 border border-red-500/30 rounded-xl p-6 mb-8 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg blur-md opacity-50"></div>
            <div className="relative p-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-lg backdrop-blur-sm">
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
          </div>
          <h3 className="text-lg font-semibold bg-gradient-to-r from-red-200 to-pink-200 bg-clip-text text-transparent">
            {title}
          </h3>
        </div>
        <p className="text-red-300 mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="relative flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative">
              <RefreshCw className="w-4 h-4" />
            </div>
            <span className="relative">Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
}