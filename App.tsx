import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import AadhaarScreen from './components/AadhaarScreen';
import NumberScreen from './components/NumberScreen';
import CombinedScreen from './components/CombinedScreen';
import Footer from './components/Footer';
import BackButton from './components/BackButton';
import { useTheme } from './hooks/useTheme';
import ThemeToggle from './components/ThemeToggle';

type View = 'home' | 'aadhaar' | 'number' | 'combined';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [theme, toggleTheme] = useTheme();

  const renderView = () => {
    switch (view) {
      case 'aadhaar':
        return <AadhaarScreen />;
      case 'number':
        return <NumberScreen />;
      case 'combined':
        return <CombinedScreen />;
      case 'home':
      default:
        return <HomeScreen 
          onSelectAadhaar={() => setView('aadhaar')} 
          onSelectNumber={() => setView('number')}
          onSelectCombined={() => setView('combined')}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8 overflow-hidden relative transition-colors duration-300">
      <div className="absolute inset-0 bg-grid-slate-400/[0.05] dark:bg-grid-slate-700/[0.05] bg-[bottom_1px_center] [mask-image:linear-gradient(to_bottom,transparent,white)]"></div>
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(50%_50%_at_50%_50%,transparent,black)]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-gradient-to-tr from-indigo-600/30 to-purple-600/30 dark:from-indigo-600/40 dark:to-purple-600/40 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      {view !== 'home' && <BackButton onClick={() => setView('home')} />}

      <main className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center flex-grow z-10">
        {renderView()}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;