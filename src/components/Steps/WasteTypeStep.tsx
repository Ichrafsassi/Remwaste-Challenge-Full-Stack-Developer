import React, { useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WASTE_TYPES, HEAVY_WASTE_OPTIONS } from '../../constants/wasteTypes';

/**
 * Step 2: Enhanced waste type selection with colorful icons
 */
export function WasteTypeStep() {
  const { formData, dispatch, nextStep, prevStep } = useApp();
  const [selectedTypes, setSelectedTypes] = useState<string[]>(formData.wasteTypes || []);
  const [selectedHeavyWaste, setSelectedHeavyWaste] = useState<string[]>(formData.heavyWasteTypes || []);
  const [showHeavyWastePopup, setShowHeavyWastePopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  // Color schemes for each waste type
  const wasteTypeColors = {
    construction: 'from-orange-500 to-red-500',
    household: 'from-blue-500 to-cyan-500',
    garden: 'from-green-500 to-emerald-500',
    commercial: 'from-purple-500 to-pink-500'
  };

  const handleTypeToggle = (typeId: string) => {
    const newSelectedTypes = selectedTypes.includes(typeId) 
      ? selectedTypes.filter(id => id !== typeId)
      : [...selectedTypes, typeId];
    
    setSelectedTypes(newSelectedTypes);
  };

  const handleContinue = () => {
    if (selectedTypes.length > 0) {
      if (!hasShownPopup) {
        setShowHeavyWastePopup(true);
        setHasShownPopup(true);
      } else {
        dispatch({ type: 'SET_WASTE_TYPES', payload: selectedTypes });
        dispatch({ type: 'SET_HEAVY_WASTE_TYPES', payload: selectedHeavyWaste });
        nextStep();
      }
    }
  };

  const handleHeavyWasteToggle = (wasteType: string) => {
    setSelectedHeavyWaste(prev => 
      prev.includes(wasteType) 
        ? prev.filter(type => type !== wasteType)
        : [...prev, wasteType]
    );
  };

  const handleHeavyWasteSubmit = () => {
    setShowHeavyWastePopup(false);
    dispatch({ type: 'SET_WASTE_TYPES', payload: selectedTypes });
    dispatch({ type: 'SET_HEAVY_WASTE_TYPES', payload: selectedHeavyWaste });
    nextStep();
  };

  const handleDontHaveAny = () => {
    setSelectedHeavyWaste([]);
    setShowHeavyWastePopup(false);
    dispatch({ type: 'SET_WASTE_TYPES', payload: selectedTypes });
    dispatch({ type: 'SET_HEAVY_WASTE_TYPES', payload: [] });
    nextStep();
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Enhanced title with colorful gradient */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
          What type of waste are you disposing of?
        </h2>
      </div>

      {/* Waste type selection with enhanced colorful cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {WASTE_TYPES.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedTypes.includes(type.id);
          const colorScheme = wasteTypeColors[type.id as keyof typeof wasteTypeColors];
          
          return (
            <button
              key={type.id}
              onClick={() => handleTypeToggle(type.id)}
              className={`
                relative p-6 rounded-2xl border-2 text-left transition-all duration-300 transform hover:scale-105 group
                ${isSelected 
                  ? 'border-transparent bg-gradient-to-br from-gray-800/50 to-gray-900/50' 
                  : 'border-gray-600/50 bg-gradient-to-br from-gray-800/50 to-gray-900/50 hover:border-gray-500/50'
                }
              `}
            >
              {/* Enhanced glow effect with type-specific colors */}
              <div className={`absolute inset-0 rounded-2xl blur-xl transition-opacity duration-300 ${
                isSelected 
                  ? `bg-gradient-to-r ${colorScheme} opacity-20` 
                  : `bg-gradient-to-r ${colorScheme} opacity-0 group-hover:opacity-10`
              }`}></div>
              
              {/* Selection indicator with colorful gradient */}
              {isSelected && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${colorScheme} rounded-full blur-md opacity-50`}></div>
                    <div className={`relative w-6 h-6 bg-gradient-to-r ${colorScheme} rounded-full flex items-center justify-center shadow-lg`}>
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="relative z-10 flex items-start space-x-4">
                <div className="relative">
                  {/* Icon glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${colorScheme} rounded-xl blur-lg opacity-30 transition-opacity duration-300 ${
                    isSelected ? 'opacity-50' : 'group-hover:opacity-40'
                  }`}></div>
                  <div className={`
                    relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300
                    ${isSelected 
                      ? `bg-gradient-to-r ${colorScheme} text-white shadow-lg` 
                      : `bg-gradient-to-r ${colorScheme} text-white shadow-lg opacity-70 group-hover:opacity-100`
                    }
                  `}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {type.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {type.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected waste types display with colorful badges */}
      {selectedTypes.length > 0 && (
        <div className="relative bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl p-4 mb-8 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl blur-xl"></div>
          <div className="relative z-10">
            <h3 className="text-white font-medium mb-3">Selected Waste Types</h3>
            <div className="flex flex-wrap gap-2">
              {selectedTypes.map(typeId => {
                const type = WASTE_TYPES.find(t => t.id === typeId);
                const colorScheme = wasteTypeColors[typeId as keyof typeof wasteTypeColors];
                return (
                  <span key={typeId} className={`bg-gradient-to-r ${colorScheme} text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg`}>
                    {type?.title.replace(' Waste', '')}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Navigation buttons with colorful gradients */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <button
          onClick={prevStep}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-200 transform hover:scale-105 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:text-blue-400 transition-colors duration-200" />
          <span>Back</span>
        </button>

        <button
          onClick={handleContinue}
          disabled={selectedTypes.length === 0}
          className="relative flex-1 sm:flex-none bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
          <span className="relative z-10">Continue</span>
          <span className="relative z-10 ml-2 transform group-hover:translate-x-1 transition-transform duration-200">→</span>
        </button>
      </div>

      {/* Enhanced heavy waste popup with colorful design */}
      {showHeavyWastePopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-600/50 shadow-2xl">
            {/* Enhanced glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Do You Have Any Heavy Waste Types?
                </h3>
                <button
                  onClick={() => setShowHeavyWastePopup(false)}
                  className="text-gray-400 hover:text-red-400 transition-colors duration-200 p-1 rounded-full hover:bg-red-500/10"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-gray-300 text-sm mb-4">Select All That Apply</p>

              <div className="grid grid-cols-3 gap-2 mb-6">
                {HEAVY_WASTE_OPTIONS.map((wasteType, index) => {
                  const colors = [
                    'from-red-500 to-orange-500',
                    'from-blue-500 to-cyan-500',
                    'from-green-500 to-emerald-500',
                    'from-purple-500 to-pink-500',
                    'from-yellow-500 to-orange-500',
                    'from-indigo-500 to-purple-500',
                    'from-pink-500 to-rose-500'
                  ];
                  const colorScheme = colors[index % colors.length];
                  
                  return (
                    <button
                      key={wasteType}
                      onClick={() => handleHeavyWasteToggle(wasteType)}
                      className={`
                        relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 group
                        ${selectedHeavyWaste.includes(wasteType)
                          ? `bg-gradient-to-r ${colorScheme} text-white shadow-lg`
                          : 'bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 hover:from-gray-600 hover:to-gray-700'
                        }
                      `}
                    >
                      {selectedHeavyWaste.includes(wasteType) && (
                        <div className={`absolute inset-0 bg-gradient-to-r ${colorScheme} rounded-lg blur-md opacity-30`}></div>
                      )}
                      <span className="relative z-10">{wasteType}</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleDontHaveAny}
                className="relative w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-3 rounded-xl transition-all duration-200 mb-3 transform hover:scale-105 shadow-lg group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <span className="relative z-10">I Don't Have Any</span>
              </button>

              <button
                onClick={handleHeavyWasteSubmit}
                className="relative w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <span className="relative z-10">Continue</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}