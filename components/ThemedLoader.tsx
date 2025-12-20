import { Leaf, Tractor, School, Apple } from "lucide-react";

export function ThemedLoader() {
  return (
    // Container de tela cheia com z-index alto para ficar sobre tudo
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 via-emerald-50 to-slate-100">
      
      {/* Área da Animação Principal */}
      <div className="flex items-center space-x-2 mb-10 relative">
        
        {/* Ícone 1: O Campo (Esmeralda) */}
        {/* Usamos 'animate-bounce' do tailwind. O style inline é para dar um atraso (delay) e eles não pularem juntos */}
        <div className="flex flex-col items-center z-10">
          <div className="p-4 bg-emerald-100 border-2 border-emerald-200 rounded-full text-emerald-600 shadow-lg shadow-emerald-100/50 animate-bounce">
            <Leaf size={32} strokeWidth={1.5} />
          </div>
          <span className="text-[10px] font-bold text-emerald-700 mt-2 uppercase tracking-widest">Campo</span>
        </div>

        {/* Conector 1 (Pontilhados) */}
        <div className="flex space-x-1 px-2 opacity-60 mt-[-20px]">
           <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
           <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse delay-75"></div>
           <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse delay-150"></div>
        </div>

         {/* Ícone 2: A Logística (Azul/Índigo) */}
        <div className="flex flex-col items-center z-10" style={{ animationDelay: '0.15s' }}>
          {/* O delay é aplicado no container do bounce */}
          <div className="p-4 bg-indigo-100 border-2 border-indigo-200 rounded-full text-indigo-600 shadow-lg shadow-indigo-100/50 animate-bounce">
            <Tractor size={32} strokeWidth={1.5} />
          </div>
           <span className="text-[10px] font-bold text-indigo-700 mt-2 uppercase tracking-widest">Transporte</span>
        </div>

         {/* Conector 2 (Pontilhados) */}
        <div className="flex space-x-1 px-2 opacity-60 mt-[-20px]">
           <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></div>
           <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse delay-75"></div>
           <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse delay-150"></div>
        </div>

        {/* Ícone 3: A Escola/Nutrição (Laranja/Vermelho) */}
         <div className="flex flex-col items-center z-10" style={{ animationDelay: '0.3s' }}>
          <div className="relative p-4 bg-orange-100 border-2 border-orange-200 rounded-full text-orange-600 shadow-lg shadow-orange-100/50 animate-bounce">
            <School size={32} strokeWidth={1.5} />
            {/* Pequena maçã sobreposta */}
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 border border-orange-200">
                <Apple size={14} className="text-red-500 fill-red-500" />
            </div>
          </div>
          <span className="text-[10px] font-bold text-orange-700 mt-2 uppercase tracking-widest">Escola</span>
        </div>

        {/* Linha de fundo conectando tudo */}
        <div className="absolute top-[2rem] left-10 right-10 h-0.5 bg-gradient-to-r from-emerald-200 via-indigo-200 to-orange-200 z-0"></div>
      </div>

      {/* Textos */}
      <h1 className="text-3xl font-bold text-slate-800 mb-3 tracking-tight">
        Save<span className="text-emerald-600">Nutri</span>
      </h1>
      
      <div className="flex items-center gap-2 text-slate-500 text-sm animate-pulse">
        <p>Carregando dados geoespaciais do PNAE...</p>
      </div>

       {/* Barra de Progresso "Infinita" no rodapé */}
      <div className="absolute bottom-12 w-64 h-1.5 bg-slate-200 rounded-full overflow-hidden">
        {/* Esta animação 'loading-bar' precisa ser definida no tailwind.config.ts */}
        <div className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full animate-loading-bar w-[50%]"></div>
      </div>
    </div>
  );
}