import React from 'react';
import { CheckCircle, Weight } from 'lucide-react';
import { Skip } from '../types';
import skipImage from '../assets/skipimage.png';

interface SkipCardProps {
  skip: Skip;
  onSelect: (skip: Skip) => void;
  isSelected?: boolean;
}

/**
 * Enhanced skip card with responsive image and selection indicator
 */
export function SkipCard({ skip, onSelect, isSelected = false }: SkipCardProps) {
  const totalPrice = skip.price_before_vat + skip.vat;

  return (
    <div
      className={`
        relative bg-gray-900 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden group
        ${isSelected
          ? 'border-blue-500/50 ring-4 ring-blue-500/20'
          : 'border-gray-600/50 hover:border-blue-400/50'}
      `}
      onClick={() => onSelect(skip)}
    >
      {/* Glow Effect */}
      <div
        className={`absolute inset-0 rounded-2xl blur-xl transition-opacity duration-300 ${
          isSelected
            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-100'
            : 'bg-gradient-to-r from-gray-500/10 to-gray-600/10 opacity-0 group-hover:opacity-100'
        }`}
      ></div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 z-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-50"></div>
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full p-2 shadow-lg">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
        </div>
      )}

      {/* Skip Image Section */}
      <div className="relative w-full h-48 overflow-hidden">
        {/* Size Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-50"></div>
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              {skip.size}
            </div>
          </div>
        </div>

        {/* Responsive Skip Image */}
        <img
          src={skipImage}
          alt="Skip"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="relative z-10 p-6">
        {/* Title and Hire Period */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-1">{skip.size} Skip</h3>
          <p className="text-gray-400 text-sm">{skip.hire_period}</p>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {skip.allowed_on_road && (
            <span className="inline-block bg-blue-700/30 text-blue-200 px-3 py-1 rounded-full text-xs font-semibold">
              On Road
            </span>
          )}
          {skip.allows_heavy_waste && (
            <span className="inline-block bg-green-700/30 text-green-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Weight className="w-4 h-4" /> Heavy Waste
            </span>
          )}
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-white">
            £{totalPrice.toFixed(2)}{' '}
            <span className="text-xs font-normal text-gray-400">inc VAT</span>
          </span>
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${
                isSelected
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-200 hover:bg-blue-700 hover:text-white'
              }`}
          >
            {isSelected ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>
    </div>
  );
}
