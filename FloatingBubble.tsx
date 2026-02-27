import { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';

interface FloatingBubbleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function FloatingBubble({ isOpen, onToggle }: FloatingBubbleProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Position inicial no canto inferior direito
    setPosition({
      x: window.innerWidth - 80,
      y: window.innerHeight - 100,
    });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setOffset({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        let newX = e.clientX - offset.x;
        let newY = e.clientY - offset.y;

        // Limites da tela
        newX = Math.max(0, Math.min(newX, window.innerWidth - 80));
        newY = Math.max(0, Math.min(newY, window.innerHeight - 80));

        setPosition({ x: newX, y: newY });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        const touch = e.touches[0];
        let newX = touch.clientX - offset.x;
        let newY = touch.clientY - offset.y;

        // Limites da tela
        newX = Math.max(0, Math.min(newX, window.innerWidth - 80));
        newY = Math.max(0, Math.min(newY, window.innerHeight - 80));

        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleTouchEnd = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, offset]);

  return (
    <button
      onClick={onToggle}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 9999,
      }}
      className={`w-20 h-20 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing transition-all duration-300 ${
        isOpen
          ? 'bg-red-600 shadow-2xl shadow-red-500'
          : 'bg-purple-600 shadow-lg shadow-purple-500 hover:shadow-xl hover:shadow-purple-400'
      }`}
    >
      <Flame
        size={40}
        className={`text-white transition-transform duration-300 ${
          isOpen ? 'rotate-180 scale-110' : 'scale-100'
        }`}
      />
    </button>
  );
}
