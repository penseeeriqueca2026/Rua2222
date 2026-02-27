import { useState } from 'react';
import { X, Zap, Eye, Crosshair, Shield, Volume2, Settings } from 'lucide-react';
import ModItem from './ModItem';

interface ModsMenuProps {
  onClose: () => void;
}

interface Mod {
  id: string;
  name: string;
  description: string;
  icon: typeof Zap;
  enabled: boolean;
  category: 'visual' | 'gameplay' | 'audio' | 'other';
}

export default function ModsMenu({ onClose }: ModsMenuProps) {
  const [mods, setMods] = useState<Mod[]>([
    {
      id: 'aimbot',
      name: 'Aimbot',
      description: 'Mira automática',
      icon: Crosshair,
      enabled: false,
      category: 'gameplay',
    },
    {
      id: 'wallhack',
      name: 'Wallhack',
      description: 'Ver através de paredes',
      icon: Eye,
      enabled: false,
      category: 'visual',
    },
    {
      id: 'fpsboost',
      name: 'FPS Boost',
      description: 'Aumentar performance',
      icon: Zap,
      enabled: false,
      category: 'gameplay',
    },
    {
      id: 'norecoil',
      name: 'No Recoil',
      description: 'Remover recuo',
      icon: Shield,
      enabled: false,
      category: 'gameplay',
    },
    {
      id: 'soundalert',
      name: 'Som de Alerta',
      description: 'Alerta de inimigos',
      icon: Volume2,
      enabled: false,
      category: 'audio',
    },
    {
      id: 'fullbright',
      name: 'Full Bright',
      description: 'Claridade máxima',
      icon: Eye,
      enabled: false,
      category: 'visual',
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleMod = (modId: string) => {
    setMods(
      mods.map((mod) =>
        mod.id === modId ? { ...mod, enabled: !mod.enabled } : mod
      )
    );
  };

  const filteredMods =
    selectedCategory === 'all'
      ? mods
      : mods.filter((mod) => mod.category === selectedCategory);

  const enabledCount = mods.filter((m) => m.enabled).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-end z-50">
      <div className="w-full bg-gradient-to-b from-gray-900 via-gray-800 to-black rounded-t-3xl shadow-2xl max-h-screen overflow-hidden flex flex-col animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-red-600 p-6 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-white">Free Fire MODs</h1>
            <p className="text-purple-100 text-sm">
              {enabledCount} MOD{enabledCount !== 1 ? 's' : ''} Ativado{enabledCount !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all"
          >
            <X size={28} className="text-white" />
          </button>
        </div>

        {/* Category Filter */}
        <div className="bg-gray-800 px-6 py-4 overflow-x-auto flex gap-2 sticky top-16">
          {[
            { id: 'all', label: 'Todos', icon: Settings },
            { id: 'visual', label: 'Visual', icon: Eye },
            { id: 'gameplay', label: 'Gameplay', icon: Crosshair },
            { id: 'audio', label: 'Áudio', icon: Volume2 },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setSelectedCategory(id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                selectedCategory === id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Mods List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {filteredMods.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
              <Settings size={48} className="mb-3 opacity-50" />
              <p>Nenhum MOD nesta categoria</p>
            </div>
          ) : (
            filteredMods.map((mod) => (
              <ModItem
                key={mod.id}
                mod={mod}
                onToggle={() => toggleMod(mod.id)}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-900 p-6 border-t border-gray-700 sticky bottom-0">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-purple-600 to-red-600 text-white py-3 rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-purple-500 transition-all"
          >
            Fechar Menu
          </button>
          <p className="text-gray-500 text-xs text-center mt-3">
            Use por sua conta e risco • Respeite o jogo
          </p>
        </div>
      </div>
    </div>
  );
}
