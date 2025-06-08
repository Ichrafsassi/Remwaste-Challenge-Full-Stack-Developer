import React from 'react';

/**
 * Simple header with just the title
 */
export function Header() {
  return (
    <header className="text-center py-6 sm:py-8">
      <h1 className="text-3xl sm:text-5xl font-bold text-white mb-1 sm:mb-2">
        SKIP HIRE
      </h1>
      <p className="text-base sm:text-xl text-gray-300 italic">
        With A Difference
      </p>
    </header>
  );
}