import { ArrowRight, TrendingUp, ChevronRight, Leaf, Utensils, CheckCircle2, ArrowLeft, MapPin, Loader2 } from "lucide-react"
import { useState } from "react"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

type SidebarProps = {
  schools: any[]
  selectedSchool: any | null
  onSchoolSelect: (school: any) => void
  onFindProducers: (id: string) => void
  matchResult: any | null
  onCloseMatch: () => void
  isLoadingMatch: boolean
}

export function Sidebar({
  schools,
  selectedSchool,
  onSchoolSelect,
  onFindProducers,
  matchResult,
  onCloseMatch,
  isLoadingMatch,
}: SidebarProps) {
  
  const [showAiMenu, setShowAiMenu] = useState(false);
  const [aiMenuData, setAiMenuData] = useState<any>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  // --- FUNÇÃO QUE CHAMA A IA NO PYTHON ---
  const handleGenerateAi = async () => {
    if (!matchResult) return;

    try {
      setIsLoadingAi(true);
      
      // 1. Pega os produtos do agricultor que deu match
      const products = matchResult.matches[0].products || ["Legumes"];
      
      console.log("Enviando para IA:", products);

      // 2. Chama a sua rota nova
      const response = await fetch(`${API_BASE_URL}/ai/generate_menu`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: products })
      });

      const data = await response.json();
      console.log("IA Respondeu:", data);

      // 3. Salva e mostra a tela
      setAiMenuData(data.menu_suggestion);
      setShowAiMenu(true);

    } catch (error) {
      console.error("Erro na IA:", error);
      alert("Erro ao gerar cardápio. Tente novamente.");
    } finally {
      setIsLoadingAi(false);
    }
  };

  // --- TELA 3: SUGESTÃO DA IA (DINÂMICA) ---
  if (showAiMenu && aiMenuData) {
    return (
      <div className="flex flex-col h-full bg-white rounded-xl shadow-2xl overflow-hidden border border-emerald-100">
        <div className="bg-gradient-to-r from-emerald-600 to-green-500 p-6 text-white shrink-0">
          <div className="flex items-center gap-2 mb-1">
             <Utensils className="h-5 w-5" />
             <h2 className="text-lg font-bold">Nutri-IA 🤖</h2>
          </div>
          <p className="text-emerald-100 text-xs opacity-90">
            Cardápio gerado com base na safra do {matchResult?.matches[0].farmer_name}.
          </p>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-4 bg-slate-50">
           
           {/* Segunda-feira */}
           <div className="bg-white p-4 rounded-lg border border-emerald-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">SEGUNDA-FEIRA</span>
              </div>
              <h4 className="font-bold text-slate-800 text-sm mb-1">{aiMenuData.segunda.prato}</h4>
              <p className="text-sm text-slate-600 leading-relaxed italic">
                 "{aiMenuData.segunda.analise_ia}"
              </p>
              <div className="mt-3 text-[10px] text-slate-500 bg-slate-50 p-2 rounded flex flex-wrap gap-1">
                <strong className="text-slate-700">Ingredientes do Sítio:</strong> 
                {aiMenuData.segunda.ingredientes_usados.join(", ")}
              </div>
           </div>

           {/* Terça-feira */}
           <div className="bg-white p-4 rounded-lg border border-orange-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">TERÇA-FEIRA</span>
              </div>
              <h4 className="font-bold text-slate-800 text-sm mb-1">{aiMenuData.terca.prato}</h4>
              <p className="text-sm text-slate-600 leading-relaxed italic">
                 "{aiMenuData.terca.analise_ia}"
              </p>
              <div className="mt-3 text-[10px] text-slate-500 bg-slate-50 p-2 rounded flex flex-wrap gap-1">
                <strong className="text-slate-700">Ingredientes do Sítio:</strong> 
                {aiMenuData.terca.ingredientes_usados.join(", ")}
              </div>
           </div>
        </div>

        <div className="p-4 border-t bg-white shrink-0">
          <button 
            className="w-full py-3 bg-white border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            onClick={() => setShowAiMenu(false)}
          >
            <ArrowLeft size={16} /> Voltar para Logística
          </button>
        </div>
      </div>
    )
  }

  // --- TELA 2: RESULTADO DO MATCH ---
  if (matchResult) {
    const match = matchResult.matches[0];
    return (
      <div className="flex flex-col h-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-emerald-500/20 animate-in slide-in-from-left-10 duration-500">
        
        <div className="bg-emerald-50 p-5 border-b border-emerald-100">
          <div className="flex items-center gap-2 text-emerald-800 mb-1">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <h2 className="font-bold text-lg">Match Encontrado!</h2>
          </div>
          <p className="text-sm text-slate-600">Encontramos a melhor opção logística.</p>
        </div>

        <div className="p-5 space-y-6">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PRODUTOR PARCEIRO</span>
            <div className="flex items-center justify-between mt-1">
               <h3 className="text-xl font-bold text-slate-900">{match.farmer_name}</h3>
               <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-1 rounded-full font-bold">DAP ATIVA</span>
            </div>
            <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
               <MapPin size={14} /> A apenas <strong>{match.distance}km</strong> da escola
            </p>
            <p className="text-xs text-slate-400 mt-2">
               Produtos: {match.products?.slice(0, 3).join(", ")}...
            </p>
          </div>

          <div className="p-4 bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-100 shadow-sm">
             <div className="flex justify-between items-end mb-2">
                <span className="text-sm text-emerald-800 font-medium">Economia Gerada</span>
                <span className="text-2xl font-bold text-emerald-600">R$ {match.savings.toFixed(2)}</span>
             </div>
             <div className="w-full bg-emerald-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[75%]" />
             </div>
             <p className="text-[10px] text-emerald-600 mt-2 text-right">
                *Comparado ao preço médio do Ceasa
             </p>
          </div>

          <div className="space-y-3 pt-2">
            <button 
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] disabled:opacity-70"
                onClick={handleGenerateAi}
                disabled={isLoadingAi}
            >
              {isLoadingAi ? (
                <> <Loader2 className="animate-spin" size={18}/> Gerando Cardápio... </>
              ) : (
                <> <Utensils size={18} /> Gerar Cardápio Inteligente </>
              )}
            </button>
            
            <button 
                className="w-full py-2 text-slate-400 text-sm hover:text-slate-600 transition-colors"
                onClick={onCloseMatch}
            >
              Buscar outra escola
            </button>
          </div>
        </div>
      </div>
    )
  }

  // --- TELA 1: DETALHE ---
  if (selectedSchool) {
    return (
      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200">
        <div className="p-5 border-b border-slate-100">
          <button 
            className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 mb-3 transition-colors"
            onClick={() => onSchoolSelect(null as any)}
          >
            <ArrowLeft size={12} /> Voltar para lista
          </button>
          
          <h2 className="text-xl font-bold text-slate-800 leading-tight">{selectedSchool.properties.name}</h2>
          
          <div className="flex gap-2 mt-3">
             <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-medium">
                {selectedSchool.properties.alunos} Alunos
             </span>
             <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-md font-medium border border-orange-100">
                Demanda: {selectedSchool.properties.demanda_atual || "Hortifruti"}
             </span>
          </div>
        </div>

        <div className="p-5">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 mb-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Orçamento PNAE:</span>
              <span className="font-mono font-bold text-slate-700">R$ {selectedSchool.properties.orcamento_mensal?.toLocaleString('pt-BR')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Status:</span>
              <span className="text-red-500 font-bold text-xs bg-red-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                 PENDENTE
              </span>
            </div>
          </div>

          <button 
            className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70"
            onClick={() => onFindProducers(selectedSchool.properties.id)}
            disabled={isLoadingMatch}
          >
            {isLoadingMatch ? (
               "Calculando Logística..." 
            ) : (
               <>Encontrar Produtores <ArrowRight size={16} /></>
            )}
          </button>
        </div>
      </div>
    )
  }

  // --- TELA 0: LISTA ---
  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-2rem)]">
      <div className="bg-slate-900 text-white rounded-xl shadow-lg shrink-0 p-6 border-none">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><path d="m4 6 8-4 8 4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/><path d="M18 5v17"/><path d="M6 5v17"/><circle cx="12" cy="9" r="2"/></svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{schools.length}</h1>
              <p className="text-slate-400 text-xs uppercase tracking-wide">Escolas Conectadas</p>
            </div>
          </div>
      </div>

      <div className="flex-1 overflow-hidden shadow-xl bg-white/90 backdrop-blur border border-slate-200 flex flex-col rounded-xl">
        <div className="p-4 border-b border-slate-100 shrink-0">
          <h3 className="text-sm font-medium text-slate-500">Lista de Escolas</h3>
          <p className="text-xs text-slate-400">Selecione uma escola para começar</p>
        </div>
        
        <div className="flex-1 overflow-auto px-4 pb-4 pt-2 space-y-2">
            {schools.map((school) => (
              <div
                key={school.properties.id}
                onClick={() => onSchoolSelect(school)}
                className="group flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-white hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-slate-700 truncate group-hover:text-emerald-700 transition-colors">
                    {school.properties.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Leaf className="w-3 h-3" /> {school.properties.demanda_atual || "Diversos"}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500" />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}