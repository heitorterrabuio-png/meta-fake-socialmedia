import { useState } from 'react';

const availableInterests = [
  { id: 'tecnologia', label: '💻 Tecnologia' },
  { id: 'games', label: '🎮 Games' },
  { id: 'culinaria', label: '🥗 Culinária' },
  { id: 'fofoca', label: '👀 Fofoca & Celebridades' },
  { id: 'esportes', label: '⚽ Esportes' },
];

export function Onboarding({ onStart }) {
  const [selected, setSelected] = useState([]);

  const toggleInterest = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2 text-slate-800">Simulador de Algoritmo 📱</h1>
      <p className="text-sm text-slate-600 mb-6">
        Escolha pelo menos <strong>2 interesses</strong> para ensinar o algoritmo da rede social o que você gosta de ver:
      </p>

      <div className="grid grid-cols-1 gap-3 w-full mb-6">
        {availableInterests.map((interest) => {
          const isSelected = selected.includes(interest.id);
          return (
            <button
              key={interest.id}
              onClick={() => toggleInterest(interest.id)}
              className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                isSelected 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {interest.label}
            </button>
          );
        })}
      </div>

      <button
        disabled={selected.length < 2}
        onClick={() => onStart(selected)}
        className={`w-full py-3 rounded-xl font-bold transition-all shadow-lg ${
          selected.length >= 2 
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 cursor-pointer' 
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
        }`}
      >
        Entrar no Feed (Criar Bolha)
      </button>
    </div>
  );
}