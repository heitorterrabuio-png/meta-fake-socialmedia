import { useState } from 'react';
import { mockPosts } from './data/mockPosts';
import { Onboarding } from './components/Onboarding';
import { Disclaimer } from './components/Disclaimer';

export default function App() {
  const [step, setStep] = useState('onboarding'); // 'onboarding' ou 'feed'
  const [weights, setWeights] = useState({});
  const [posts, setPosts] = useState(mockPosts);
  const [interactionCount, setInteractionCount] = useState(0);

  // Inicializa os pesos com base na escolha do usuário
  const handleStart = (selectedInterests) => {
    const initialWeights = {};
    // Atribui peso alto inicial para os temas escolhidos
    mockPosts.forEach(post => {
      initialWeights[post.category] = selectedInterests.includes(post.category) ? 5 : 1;
    });
    setWeights(initialWeights);
    setStep('feed');
  };

  // Função que simula o Algoritmo de Recomendação adaptativo
  const handleLike = (postId, category) => {
    // 1. Aumenta o peso da categoria curtida
    const updatedWeights = {
      ...weights,
      [category]: (weights[category] || 1) + 4
    };
    setWeights(updatedWeights);

    // 2. Reordena o feed dinamicamente com base nos novos pesos (Simula a bolha)
    const sortedPosts = [...posts].sort((a, b) => {
      const weightA = updatedWeights[a.category] || 1;
      const weightB = updatedWeights[b.category] || 1;
      return weightB - weightA + (Math.random() * 0.5 - 0.25); // Adiciona leve aleatoriedade natural
    });

    setPosts(sortedPosts);
    setInteractionCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-xl flex flex-col">
        <Disclaimer />
        
        {step === 'onboarding' ? (
          <Onboarding onStart={handleStart} />
        ) : (
          <div className="flex flex-col flex-1 pb-16">
            {/* Header da "Rede Social" */}
            <header className="px-4 py-3 border-b flex justify-between items-center bg-white sticky top-0 z-10">
              <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                MetaFeed AI 🔮
              </span>
              <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
                Interações: {interactionCount}
              </span>
            </header>

            {/* Aviso Dinâmico da Bolha de Filtro */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 m-3 text-xs text-blue-800 rounded-r-lg">
              <strong>Efeito Bolha Ativo:</strong> O algoritmo aprende com seus cliques. Quanto mais você curte um tema, menos você verá os outros!
            </div>

            {/* Lista do Feed */}
            <div className="flex flex-col gap-4 p-3">
              {posts.map((post) => (
                <div key={post.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  {/* Perfil do autor */}
                  <div className="flex items-center gap-3 p-3">
                    <img src={post.avatar} alt={post.author} className="w-9 h-9 rounded-full object-cover border" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800">@{post.author}</span>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{post.category}</span>
                    </div>
                  </div>

                  {/* Mídia (Imagem/Reel simulado) */}
                  <img src={post.mediaUrl} alt="Post content" className="w-full h-64 object-cover" />

                  {/* Ações e Legenda */}
                  <div className="p-3">
                    <div className="flex justify-between items-center mb-2">
                      <button 
                        onClick={() => handleLike(post.id, post.category)}
                        className="flex items-center gap-1.5 text-xs font-bold text-pink-600 bg-pink-50 px-3 py-1.5 rounded-full hover:bg-pink-100 transition-colors cursor-pointer"
                      >
                        ❤️ Curtir ({post.likes})
                      </button>
                      <span className="text-[10px] text-slate-400">Peso no Algoritmo: {weights[post.category] || 1}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      <strong className="text-slate-900 mr-1">@{post.author}</strong>
                      {post.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}