import { useState, useEffect } from 'react';
import FloatingBubble from './components/FloatingBubble';
import ModsMenu from './components/ModsMenu';
import { initializeApp } from './utils/capacitorSetup';

export default function App() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      await initializeApp();
      setIsInitialized(true);
    };
    initialize();
  }, []);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      <FloatingBubble 
        isOpen={menuVisible}
        onToggle={() => setMenuVisible(!menuVisible)}
      />
      {menuVisible && <ModsMenu onClose={() => setMenuVisible(false)} />}
    </div>
  );
}
