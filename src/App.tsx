import React from 'react';
import { AppProvider } from './context/AppContext';
import { SmartSkipWizard } from './components/SmartSkipWizard';

/**
 * Main App component with context provider
 */
function App() {
  return (
    <AppProvider>
      <SmartSkipWizard />
    </AppProvider>
  );
}

export default App;