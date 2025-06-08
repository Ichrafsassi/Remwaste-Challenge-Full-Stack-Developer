import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useSkips } from '../../hooks/useSkips';
import { SkipCard } from '../SkipCard';
import { LoadingSpinner } from '../UI/LoadingSpinner';
import { ErrorMessage } from '../UI/ErrorMessage';
import { Skip } from '../../types';

/**
 * Step 3: Enhanced skip selection with improved design
 */
export function SelectSkipStep() {
  const { formData, dispatch, prevStep } = useApp();
  const { skips, loading, error, refetch } = useSkips(
    formData.postcode || 'NR32', 
    formData.area || 'Lowestoft'
  );
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(formData.selectedSkip);

  const handleSkipSelect = (skip: Skip) => {
    setSelectedSkip(skip);
    dispatch({ type: 'SET_SELECTED_SKIP', payload: skip });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with gradient text */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
          Choose Your Skip Size
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Select the skip size that best suits your needs.
        </p>
      </div>

      {/* Loading state */}
      {loading && (
        <LoadingSpinner message="Loading available skips..." size="lg" />
      )}

      {/* Error state */}
      {error && !loading && (
        <ErrorMessage
          title="Unable to Load Skips"
          message={error}
          onRetry={refetch}
        />
      )}

      {/* Skip grid with enhanced layout */}
      {!loading && skips.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {skips.map((skip) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              onSelect={handleSkipSelect}
              isSelected={selectedSkip?.id === skip.id}
            />
          ))}
        </div>
      )}

      {/* Selected skip summary */}
      {selectedSkip && (
        <div className="relative bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl"></div>
          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-green-100 mb-3 flex items-center">
              <span className="mr-2">✅</span>
              Selected Skip
            </h3>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">{selectedSkip.size} Skip</p>
                  <p className="text-gray-400 text-sm">{selectedSkip.hire_period}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-400">
                    £{selectedSkip.price_before_vat + selectedSkip.vat}
                  </p>
                  <p className="text-gray-400 text-sm">inc. VAT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-start">
        <button
          onClick={prevStep}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>
    </div>
  );
}