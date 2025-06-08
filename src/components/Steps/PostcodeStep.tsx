import React, { useState } from 'react';
import { Search, X, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

/**
 * Enhanced postcode step with colorful icons and beautiful design
 */
export function PostcodeStep() {
  const { formData, dispatch, nextStep } = useApp();
  const [postcode, setPostcode] = useState(formData.postcode || '');
  const [city, setCity] = useState(formData.area || '');
  const [streetName, setStreetName] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [showResults, setShowResults] = useState(false);

  const searchResults = [
    { postcode: 'LE10 1SH', city: 'Hinckley', street: 'Ashby Road', number: '197' },
    { postcode: 'LE10 1SH', city: 'Hinckley', street: 'Ashby Road', number: '195' },
    { postcode: 'LE10 1SH', city: 'Hinckley', street: 'Ashby Road', number: '199' },
  ];

  const handlePostcodeChange = (value: string) => {
    setPostcode(value.toUpperCase());
    if (value.length >= 3) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleResultSelect = (result: any) => {
    setPostcode(result.postcode);
    setCity(result.city);
    setStreetName(result.street);
    setHouseNumber(result.number);
    setShowResults(false);
  };

  const clearPostcode = () => {
    setPostcode('');
    setShowResults(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postcode.trim() && city.trim() && streetName.trim() && houseNumber.trim()) {
      dispatch({ type: 'SET_POSTCODE', payload: postcode.trim() });
      dispatch({ type: 'SET_AREA', payload: city.trim() });
      nextStep();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Postcode search with enhanced design and colorful icon */}
        <div className="relative">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-md opacity-30 group-focus-within:opacity-50 transition-opacity duration-200"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-cyan-500 p-1 rounded-full">
                  <Search className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <input
              type="text"
              value={postcode}
              onChange={(e) => handlePostcodeChange(e.target.value)}
              placeholder="Enter postcode (e.g., LE10 1SH)"
              className="w-full pl-14 pr-12 py-4 bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
              required
            />
            {postcode && (
              <button
                type="button"
                onClick={clearPostcode}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400 transition-colors duration-200 p-1 rounded-full hover:bg-red-500/10"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {/* Search results dropdown */}
          {showResults && (
            <div className="absolute left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-lg z-20">
              {searchResults.map((result, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="w-full text-left px-4 py-3 hover:bg-blue-900/30 transition-colors duration-150 flex items-center gap-2"
                  onClick={() => handleResultSelect(result)}
                >
                  <span className="font-semibold text-white">{result.postcode}</span>
                  <span className="text-gray-400 text-sm">{result.city}, {result.street} {result.number}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        {/* City field (no icon, no orange color) */}
        <div>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="w-full px-4 py-4 bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
            required
          />
        </div>
        {/* Street name field (no icon, no orange color) */}
        <div>
          <input
            type="text"
            value={streetName}
            onChange={(e) => setStreetName(e.target.value)}
            placeholder="Street Name"
            className="w-full px-4 py-4 bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
            required
          />
        </div>
        {/* House/Flat number field (no icon, no orange color) */}
        <div>
          <input
            type="text"
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
            placeholder="House/Flat Number"
            className="w-full px-4 py-4 bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Continue
        </button>
      </form>

      {/* Version info with subtle styling */}
      <div className="text-center mt-8">
        <p className="text-gray-500 text-sm">Version 1.1.34</p>
      </div>
    </div>
  );
}