import React, { useState } from "react";
import Header from "../shared/components/Header";
import Sidebar from "../shared/components/Sidebar";
import { motion } from "motion/react";
import {
  BookOpen,
  Clock,
  Users,
  FileText,
  Download,
  Edit,
  Trash2,
  Calendar,
  Sparkles,
} from "lucide-react";
import { initialPlans } from "./data";
import type { PageId } from "../../../lib/navigation/routes";
import type { FormData, LessonPlanPageProps, PlanoAula } from "./types";
import BnccMultiSelect from "./components/BnccMultiSelect";
import LessonPlanGeneratorModal from "./components/LessonPlanGeneratorModal";

export default function LessonPlanPage({
  navigateTo,
  userRole,
}: LessonPlanPageProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showGeneratorModal, setShowGeneratorModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    componenteCurricular: '',
    ano: '',
    tema: '',
    duracao: '',
    duracaoCustom: '',
    recursoDidatico: [],
    formaAvaliacao: [],
    objetoConhecimento: '',
    habilidadesBNCCGeral: [],
    habilidadesBNCCComputacao: [],
    etapaEnsino: '',
    tempoAula: '',
    metodologia: [],
    tiposAtividades: [],
    adaptacoes: [],
    unidadeFederativa: '',
    cidade: '',
    escola: '',
  });

  const [planos, setPlanos] = useState<PlanoAula[]>(initialPlans);

  const handleNavigate = (page: PageId) => {
    if (page === 'plano-aula') {
      return;
    }
    navigateTo(page);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      planejado: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
      'em-andamento': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
      concluido: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    };
    const labels = {
      planejado: 'Planejado',
      'em-andamento': 'Em Andamento',
      concluido: 'Concluído',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const handleCheckboxChange = (field: keyof FormData, value: string) => {
    const currentValues = formData[field] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    setFormData({ ...formData, [field]: newValues });
  };

  const generatePrompt = () => {
    setIsGenerating(true);

    // Simular geração de prompt
    setTimeout(() => {
      let prompt = `Crie um plano de aula completo e detalhado com as seguintes especificações:\n\n`;

      // Informações Básicas
      prompt += `INFORMAÇÕES BÁSICAS:\n`;
      if (formData.componenteCurricular) prompt += `- Componente Curricular: ${formData.componenteCurricular}\n`;
      if (formData.ano) prompt += `- Ano/Série: ${formData.ano}\n`;
      if (formData.tema) prompt += `- Tema da Aula: ${formData.tema}\n`;
      prompt += `\n`;

      // Configurações da Aula
      prompt += `CONFIGURAÇÕES DA AULA:\n`;
      if (formData.duracao) prompt += `- Duração: ${formData.duracao === 'outro' ? formData.duracaoCustom : formData.duracao}\n`;
      if (formData.recursoDidatico.length > 0) prompt += `- Recursos Didáticos: ${formData.recursoDidatico.join(', ')}\n`;
      if (formData.formaAvaliacao.length > 0) prompt += `- Formas de Avaliação: ${formData.formaAvaliacao.join(', ')}\n`;
      prompt += `\n`;

      // BNCC e Habilidades
      if (formData.objetoConhecimento || formData.habilidadesBNCCGeral.length > 0 || formData.habilidadesBNCCComputacao.length > 0) {
        prompt += `BNCC E HABILIDADES:\n`;
        if (formData.objetoConhecimento) prompt += `- Objeto de Conhecimento: ${formData.objetoConhecimento}\n`;
        if (formData.habilidadesBNCCGeral.length > 0) prompt += `- Habilidades BNCC Geral: ${formData.habilidadesBNCCGeral.join(', ')}\n`;
        if (formData.habilidadesBNCCComputacao.length > 0) prompt += `- Habilidades BNCC Computação: ${formData.habilidadesBNCCComputacao.join(', ')}\n`;
        prompt += `\n`;
      }

      // Contexto Educacional
      if (formData.etapaEnsino || formData.tempoAula || formData.metodologia.length > 0) {
        prompt += `CONTEXTO EDUCACIONAL:\n`;

        if (formData.tempoAula) prompt += `- Tempo de Aula: ${formData.tempoAula}\n`;
        if (formData.metodologia.length > 0) prompt += `- Metodologias: ${formData.metodologia.join(', ')}\n`;
        prompt += `\n`;
      }

      // Atividades e Adaptações
      if (formData.tiposAtividades.length > 0 || formData.adaptacoes.length > 0) {
        prompt += `ATIVIDADES E ADAPTAÇÕES:\n`;
        if (formData.tiposAtividades.length > 0) prompt += `- Tipos de Atividades: ${formData.tiposAtividades.join(', ')}\n`;
        if (formData.adaptacoes.length > 0) prompt += `- Adaptações Necessárias: ${formData.adaptacoes.join(', ')}\n`;
        prompt += `\n`;
      }

      // Localização
      if (formData.unidadeFederativa || formData.cidade || formData.escola) {
        prompt += `LOCALIZAÇÃO:\n`;
        if (formData.unidadeFederativa) prompt += `- Estado: ${formData.unidadeFederativa}\n`;
        if (formData.cidade) prompt += `- Cidade: ${formData.cidade}\n`;
        if (formData.escola) prompt += `- Escola: ${formData.escola}\n`;
        prompt += `\n`;
      }

      prompt += `\nPor favor, estruture o plano de aula incluindo:\n`;
      prompt += `1. Objetivos de Aprendizagem\n`;
      prompt += `2. Conteúdos Programáticos\n`;
      prompt += `3. Metodologia Detalhada\n`;
      prompt += `4. Recursos Necessários\n`;
      prompt += `5. Desenvolvimento da Aula (passo a passo)\n`;
      prompt += `6. Atividades Práticas\n`;
      prompt += `7. Avaliação\n`;
      prompt += `8. Referências e Materiais de Apoio\n`;

      setGeneratedPrompt(prompt);
      setIsGenerating(false);
    }, 1500);
  };

  const copyPrompt = () => {
    // Fallback para navegadores que bloqueiam a API do Clipboard
    const textArea = document.createElement('textarea');
    textArea.value = generatedPrompt;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      textArea.remove();
      // Você pode adicionar um feedback visual aqui
      alert('Prompt copiado com sucesso!');
    } catch (err) {
      console.error('Erro ao copiar:', err);
      textArea.remove();
      alert('Não foi possível copiar. Por favor, selecione e copie manualmente.');
    }
  };

  const openInGemini = () => {
    const encodedPrompt = encodeURIComponent(generatedPrompt);
    window.open(`https://gemini.google.com/?q=${encodedPrompt}`, '_blank');
  };

  const totalSteps = 6;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Informações Básicas</h3>
              <p className="text-gray-600 dark:text-gray-400">Vamos começar com as informações essenciais da sua aula</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Componente Curricular
                </label>
                <select
                  value={formData.componenteCurricular}
                  onChange={(e) => setFormData({ ...formData, componenteCurricular: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:outline-none transition-colors"
                >
                  <option value="">Selecione...</option>
                  <option value="Matemática">Matemática</option>
                  <option value="Português">Português</option>
                  <option value="História">História</option>
                  <option value="Geografia">Geografia</option>
                  <option value="Ciências">Ciências</option>
                  <option value="Inglês">Inglês</option>
                  <option value="Educação Física">Educação Física</option>
                  <option value="Artes">Artes</option>
                  <option value="Tecnologia">Tecnologia</option>
                  <option value="Cultura Digital">Cultura Digital</option>
                  <option value="Pensamento Computacional">Pensamento Computacional</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Ano/Série
                </label>
                <select
                  value={formData.ano}
                  onChange={(e) => setFormData({ ...formData, ano: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:outline-none transition-colors"
                >
                  <option value="">Selecione...</option>
                  <option value="1 Ano Fundamental">1 Ano Fundamental</option>
                  <option value="2 Ano Fundamental">2 Ano Fundamental</option>
                  <option value="3 Ano Fundamental">3 Ano Fundamental</option>
                  <option value="4 Ano Fundamental">4 Ano Fundamental</option>
                  <option value="5 Ano Fundamental">5 Ano Fundamental</option>
                  <option value="6 Ano Fundamental">6  Ano Fundamental</option>
                  <option value="7 Ano Fundamental">7 Ano Fundamental</option>
                  <option value="8 Ano Fundamental">8 Ano Fundamental</option>
                  <option value="9 Ano Fundamental">9 Ano Fundamental</option>
                  <option value="1 Ano Médio">1 Ano Médio</option>
                  <option value="2 Ano Médio">2 Ano Médio</option>
                  <option value="3 Ano Médio">3 Ano Médio</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Tema ou Assunto da Aula
                </label>
                <input
                  type="text"
                  value={formData.tema}
                  onChange={(e) => setFormData({ ...formData, tema: e.target.value })}
                  placeholder="Ex: Ciclo da Água, Verbos no Presente, Revolução Francesa..."
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Configurações da Aula</h3>
              <p className="text-gray-600 dark:text-gray-400">Defina duração, recursos e formas de avaliação</p>
            </div>

            <div className="space-y-6">
              {/* Duração */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                  Duração da Aula
                </label>
                <div className="space-y-2">
                  {['50 minutos', '100 minutos', '150 minutos', 'outro'].map((dur) => (
                    <label key={dur} className="flex items-center gap-3 p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#8B27FF] dark:hover:border-[#A855F7] cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="duracao"
                        value={dur}
                        checked={formData.duracao === dur}
                        onChange={(e) => setFormData({ ...formData, duracao: e.target.value })}
                        className="w-4 h-4 text-[#8B27FF] focus:ring-[#8B27FF]"
                      />
                      <span className="text-gray-900 dark:text-white font-medium">{dur}</span>
                    </label>
                  ))}
                  {formData.duracao === 'outro' && (
                    <input
                      type="text"
                      value={formData.duracaoCustom}
                      onChange={(e) => setFormData({ ...formData, duracaoCustom: e.target.value })}
                      placeholder="Especifique a duração..."
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:outline-none transition-colors mt-2"
                    />
                  )}
                </div>
              </div>

              {/* Recursos Didáticos */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                  Recursos Didáticos
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Livro didático', 'Slides', 'Vídeos', 'Jogos educativos', 'Computadores', 'Tablets', 'Lousa digital', 'Materiais impressos'].map((recurso) => (
                    <label key={recurso} className="flex items-center gap-3 p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#8B27FF] dark:hover:border-[#A855F7] cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.recursoDidatico.includes(recurso)}
                        onChange={() => handleCheckboxChange('recursoDidatico', recurso)}
                        className="w-4 h-4 text-[#8B27FF] focus:ring-[#8B27FF] rounded"
                      />
                      <span className="text-sm text-gray-900 dark:text-white font-medium">{recurso}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Formas de Avaliação */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                  Formas de Avaliação
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Observação participativa', 'Atividade prática', 'Quiz rápido', 'Trabalho em grupo', 'Apresentação oral', 'Portfólio digital'].map((avaliacao) => (
                    <label key={avaliacao} className="flex items-center gap-3 p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#8B27FF] dark:hover:border-[#A855F7] cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.formaAvaliacao.includes(avaliacao)}
                        onChange={() => handleCheckboxChange('formaAvaliacao', avaliacao)}
                        className="w-4 h-4 text-[#8B27FF] focus:ring-[#8B27FF] rounded"
                      />
                      <span className="text-sm text-gray-900 dark:text-white font-medium">{avaliacao}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">BNCC e Habilidades</h3>
              <p className="text-gray-600 dark:text-gray-400">Alinhe sua aula com a Base Nacional Comum Curricular</p>
            </div>

            <div className=" relative space-y-6">
              {/* Objeto de Conhecimento */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Objeto de Conhecimento
                </label>
                <input
                  type="text"
                  value={formData.objetoConhecimento}
                  onChange={(e) => setFormData({ ...formData, objetoConhecimento: e.target.value })}
                  placeholder="Ex: Números inteiros, Segurança digital..."
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:outline-none transition-colors"
                />
              </div>

              {/* Habilidades BNCC Geral (busca digitando) */}
              <BnccMultiSelect
                label="Habilidades da BNCC Geral"
                type="geral"
                selected={formData.habilidadesBNCCGeral}
                onChange={(next) => setFormData({ ...formData, habilidadesBNCCGeral: next })}
              />

              {/* Habilidades BNCC Computação (busca digitando) */}
              <BnccMultiSelect
                label="Habilidades da BNCC Computação"
                type="computacao"
                selected={formData.habilidadesBNCCComputacao}
                onChange={(next) => setFormData({ ...formData, habilidadesBNCCComputacao: next })}
              />

            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Contexto Educacional</h3>
              <p className="text-gray-600 dark:text-gray-400">Informações sobre etapa de ensino e metodologias</p>
            </div>

            <div className="space-y-6">


              {/* Tempo de Aula */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Tempo de Aula por Semana
                </label>
                <select
                  value={formData.tempoAula}
                  onChange={(e) => setFormData({ ...formData, tempoAula: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:outline-none transition-colors"
                >
                  <option value="">Selecione...</option>
                  <option value="50 minutos">50 minutos por aula (1 aula semanal)</option>
                  <option value="100 minutos">100 minutos por aula (2 aulas semanais)</option>
                  <option value="150 minutos">150 minutos por aula (3 aulas semanais)</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              {/* Metodologias */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                  Metodologias de Ensino
                </label>
                <div className="space-y-2">
                  {['Aula expositiva', 'Aprendizagem baseada em projetos', 'Sala de aula invertida', 'Gamificação', 'Aprendizagem colaborativa', 'Ensino híbrido', 'STEAM', 'Metodologias ativas'].map((met) => (
                    <label key={met} className="flex items-center gap-3 p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#8B27FF] dark:hover:border-[#A855F7] cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.metodologia.includes(met)}
                        onChange={() => handleCheckboxChange('metodologia', met)}
                        className="w-4 h-4 text-[#8B27FF] focus:ring-[#8B27FF] rounded"
                      />
                      <span className="text-sm text-gray-900 dark:text-white font-medium">{met}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Atividades e Adaptações</h3>
              <p className="text-gray-600 dark:text-gray-400">Tipos de atividades e necessidades especiais</p>
            </div>

            <div className="space-y-6">
              {/* Tipos de Atividades */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                  Tipos de Atividades
                </label>
                <div className="space-y-2">
                  {['Com atividades desplugadas', 'Com atividades plugadas', 'Atividades individuais', 'Atividades em grupo', 'Debates e discussões', 'Pesquisa orientada', 'Produção de conteúdo'].map((ativ) => (
                    <label key={ativ} className="flex items-center gap-3 p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#8B27FF] dark:hover:border-[#A855F7] cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.tiposAtividades.includes(ativ)}
                        onChange={() => handleCheckboxChange('tiposAtividades', ativ)}
                        className="w-4 h-4 text-[#8B27FF] focus:ring-[#8B27FF] rounded"
                      />
                      <span className="text-sm text-gray-900 dark:text-white font-medium">{ativ}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Adaptações */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                  Adaptações para Necessidades Especiais
                </label>
                <div className="space-y-2">
                  {[
                    'Deficiência Visual (cegueira ou baixa visão)',
                    'Deficiência Auditiva (surdez ou perda auditiva)',
                    'Deficiência Intelectual',
                    'Deficiência Física (limitações motoras)',
                    'Autismo (TEA - Transtorno do Espectro Autista)',
                    'Síndrome de Down (Trissomia do cromossomo 21)',
                    'Dislexia',
                    'TDAH',
                  ].map((adapt) => (
                    <label key={adapt} className="flex items-center gap-3 p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#8B27FF] dark:hover:border-[#A855F7] cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.adaptacoes.includes(adapt)}
                        onChange={() => handleCheckboxChange('adaptacoes', adapt)}
                        className="w-4 h-4 text-[#8B27FF] focus:ring-[#8B27FF] rounded"
                      />
                      <span className="text-sm text-gray-900 dark:text-white font-medium">{adapt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Localização (Opcional)</h3>
              <p className="text-gray-600 dark:text-gray-400">Adaptação aos referenciais curriculares estaduais</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Unidade Federativa (Estado)
                </label>
                <select
                  value={formData.unidadeFederativa}
                  onChange={(e) => setFormData({ ...formData, unidadeFederativa: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:outline-none transition-colors"
                >
                  <option value="">Selecione...</option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Cidade
                </label>
                <input
                  type="text"
                  value={formData.cidade}
                  onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                  placeholder="Ex: São Paulo, Rio de Janeiro..."
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Escola
                </label>
                <input
                  type="text"
                  value={formData.escola}
                  onChange={(e) => setFormData({ ...formData, escola: e.target.value })}
                  placeholder="Nome da escola (opcional)"
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage="plano-aula"
        onNavigate={handleNavigate}
        isAdmin={userRole === 'admin'}
      />

      <div className="flex-1 flex flex-col min-w-0 pt-20">
        <Header
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          userName="Usuário"
          navigateTo={navigateTo}
          onLogout={() => navigateTo('login')}
        />

        <main className="flex-1 overflow-auto pb-20">
          <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl text-[#8B27FF] mb-2">Plano de Aula</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Organize e planeje suas aulas de competências digitais
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowGeneratorModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-[#8B27FF] to-[#A855F7] hover:from-[#7B1FE8] hover:to-[#9D3FFF] text-white px-6 py-3 rounded-xl transition-all shadow-lg"
              >
                <Sparkles className="w-5 h-5" />
                Gerar com IA
              </motion.button>
            </div>

            {/* Planos de Aula List */}
            <div className="space-y-4">
              {planos.map((plano, index) => (
                <motion.div
                  key={plano.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 4) }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
                >
                  {/* Header do Card */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {plano.titulo}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {plano.descricao}
                      </p>

                      {/* BNCC Card */}
                      <div className="inline-flex items-center gap-2 rounded-full border border-[#8B27FF]/15 bg-[#8B27FF]/8 px-2.5 py-1 text-[11px] font-semibold text-[#8B27FF]">
                        <span className="h-2 w-2 rounded-full bg-[#8B27FF]/35" />
                        BNCC: {plano.codigoBNCC}
                      </div>

                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                      >
                        <Edit className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                      >
                        <Download className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {plano.duracao}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {plano.turma}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(plano.data).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {plano.materia}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {planos.length === 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-sm">
                <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Nenhum plano de aula criado
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Comece criando seu primeiro plano de aula para organizar suas turmas
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowGeneratorModal(true)}
                  className="bg-[#8B27FF] hover:bg-[#7B1FE8] text-white px-6 py-3 rounded-xl transition-all"
                >
                  <Sparkles className="w-5 h-5 inline-block mr-2" />
                  Gerar com IA
                </motion.button>
              </div>
            )}
          </div>
        </main>
      </div>

      <LessonPlanGeneratorModal
        isOpen={showGeneratorModal}
        generatedPrompt={generatedPrompt}
        currentStep={currentStep}
        totalSteps={totalSteps}
        isGenerating={isGenerating}
        renderStep={renderStep}
        onBackdropClose={() => {
          if (!generatedPrompt) {
            setShowGeneratorModal(false);
            setCurrentStep(1);
          }
        }}
        onClose={() => {
          setShowGeneratorModal(false);
          setCurrentStep(1);
          setGeneratedPrompt("");
        }}
        onPrev={() => setCurrentStep(Math.max(1, currentStep - 1))}
        onNext={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
        onGeneratePrompt={generatePrompt}
        onCopyPrompt={copyPrompt}
        onOpenInGemini={openInGemini}
      />
    </div>
  );
}
