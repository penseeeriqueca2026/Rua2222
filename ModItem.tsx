import { LucideIcon } from 'lucide-react';

interface ModItemProps {
  mod: {
    id: string;
    name: string;
    description: string;
    icon: LucideIcon;
    enabled: boolean;
  };
  onToggle: () => void;
}

export default function ModItem({ mod, onToggle }: ModItemProps) {
  const IconComponent = mod.icon;

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
        mod.enabled
          ? 'bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg shadow-purple-500'
          : 'bg-gray-700 hover:bg-gray-600'
      }`}
    >
      <div
        className={`p-3 rounded-lg ${
          mod.enabled ? 'bg-purple-500 bg-opacity-50' : 'bg-gray-600'
        }`}
      >
        <IconComponent size={24} className="text-white" />
      </div>

      <div className="flex-1">
        <h3 className="text-white font-bold text-lg">{mod.name}</h3>
        <p className="text-gray-200 text-sm">{mod.description}</p>
      </div>

      <button
        onClick={onToggle}
        className={`relative w-14 h-8 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          mod.enabled
            ? 'bg-green-500 focus:ring-green-400'
            : 'bg-gray-500 focus:ring-gray-400'
        }`}
      >
        <div
          className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
            mod.enabled ? 'translate-x-7' : 'translate-x-1'
          }`}
        ></div>
      </button>
    </div>
  );
}
