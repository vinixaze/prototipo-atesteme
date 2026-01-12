import { User, CreditCard, Calendar, Mail, Phone, AlertCircle, Info, UserCheck, Send, CheckCircle2, Loader2, GraduationCap } from 'lucide-react';
import { FormData, FormErrors } from '../../types/profile';
import { validateEmail, calcularIdade, isDataNascimentoValida, getIdentificadorPessoal } from '../../utils/profile/validation';

interface CommonDataFormProps {
  formData: FormData;
  errors: FormErrors;
  touchedFields: Set<string>;
  showNomeSocial: boolean;
  emailVerificado: boolean;
  telefoneVerificado: boolean;
  enviandoAcesso: boolean;
  acessoEnviado: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onShowNomeSocial: () => void;
  onEmailVerify: () => void;
  onTelefoneVerify: () => void;
  onEnviarAcessoPais: () => void;
}

export default function CommonDataForm({
  formData,
  errors,
  touchedFields,
  showNomeSocial,
  emailVerificado,
  telefoneVerificado,
  enviandoAcesso,
  acessoEnviado,
  onInputChange,
  onBlur,
  onShowNomeSocial,
  onEmailVerify,
  onTelefoneVerify,
  onEnviarAcessoPais,
}: CommonDataFormProps) {
  const isMenorDeIdade = calcularIdade(formData.dataNascimento) < 18;
  const identificadorPessoal = getIdentificadorPessoal(formData.cpf);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 animate-slideUp">
      <div className="flex items-center justify-between mb-6 pb-5 border-b-2 border-gray-100 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-[#8B27FF] dark:text-[#A855F7]" strokeWidth={2} />
          </div>
          Dados Comuns
        </h3>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nome Completo
          </label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={onInputChange}
            onBlur={onBlur}
            placeholder="Seu nome completo"
            className={`w-full h-12 px-4 rounded-xl border-2 text-gray-800 dark:text-gray-200 text-base transition-all duration-300 focus:outline-none ${errors.nome && touchedFields.has('nome')
              ? 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/30 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/50'
              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/50'
              }`}
          />
          {errors.nome && touchedFields.has('nome') && (
            <div className="flex items-center gap-2 mt-2 text-red-600 text-xs">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.nome}</span>
            </div>
          )}
          {!showNomeSocial && (
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={onShowNomeSocial}
                className="text-xs text-[#8B27FF] dark:text-[#A855F7] hover:underline font-medium flex items-center gap-1"
              >
                <User className="w-3 h-3" />
                Adicionar Nome Social
              </button>
            </div>
          )}
          {showNomeSocial && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nome Social
              </label>
              <input
                type="text"
                name="nomeSocial"
                value={formData.nomeSocial}
                onChange={onInputChange}
                placeholder="Como prefere ser chamado(a)"
                className="w-full h-12 px-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 text-base bg-white dark:bg-gray-700 transition-all duration-300 focus:outline-none focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/50"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            CPF
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <CreditCard className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={onInputChange}
              onBlur={onBlur}
              placeholder="000000001 ou 000.000.000-00"
              className={`w-full h-12 pl-12 pr-4 rounded-xl border-2 text-gray-800 dark:text-gray-200 text-base transition-all duration-300 focus:outline-none ${errors.cpf && touchedFields.has('cpf')
                ? 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/30 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/50'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/50'
                }`}
            />
          </div>
          {errors.cpf && touchedFields.has('cpf') && (
            <div className="flex items-center gap-2 mt-2 text-red-600 text-xs">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.cpf}</span>
            </div>
          )}
          {identificadorPessoal && identificadorPessoal.isProvisorio && (
            <div className="mt-3 p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
                  <Info className="w-4 h-4 text-[#8B27FF] dark:text-[#A855F7]" />
                </div>
                <span className="text-sm font-bold text-[#8B27FF] dark:text-[#A855F7]">CPF Provisório Detectado</span>
              </div>
              <div className="space-y-2 ml-10">
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[120px]">Identificador Social:</span>
                  <span className="text-sm font-mono font-semibold text-gray-900 dark:text-gray-100">{identificadorPessoal.id}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[120px]">Base de Origem:</span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/60 dark:to-purple-800/60 rounded-lg text-[#8B27FF] dark:text-[#A855F7] font-bold text-sm shadow-sm">
                    {identificadorPessoal.tipo}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Data de Nascimento
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={onInputChange}
              onBlur={onBlur}
              placeholder="DD/MM/AAAA"
              className={`w-full h-12 pl-12 pr-4 rounded-xl border-2 text-gray-800 dark:text-gray-200 text-base transition-all duration-300 focus:outline-none ${errors.dataNascimento && touchedFields.has('dataNascimento')
                ? 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/30 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/50'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/50'
                }`}
            />
          </div>
          {errors.dataNascimento && touchedFields.has('dataNascimento') && (
            <div className="flex items-center gap-2 mt-2 text-red-600 text-xs">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.dataNascimento}</span>
            </div>
          )}
        </div>

        {isDataNascimentoValida(formData.dataNascimento) && !isMenorDeIdade && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                E-mail
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onInputChange}
                  onBlur={onBlur}
                  placeholder="email@exemplo.com"
                  className={`w-full h-12 pl-12 pr-4 rounded-xl border-2 text-gray-800 dark:text-gray-200 text-base transition-all duration-300 focus:outline-none ${errors.email && touchedFields.has('email')
                    ? 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/30 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/50'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/50'
                    }`}
                />
              </div>
              {errors.email && touchedFields.has('email') && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-xs">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.email}</span>
                </div>
              )}
              <div className="mt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={onEmailVerify}
                  disabled={!formData.email || !!errors.email || !validateEmail(formData.email)}
                  className="px-4 py-2 rounded-lg font-semibold text-sm transition-all bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Enviar
                </button>
                {emailVerificado && (
                  <span className="text-sm font-bold text-green-600 dark:text-green-400 inline-flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Verificado
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Telefone
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Phone className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={onInputChange}
                  onBlur={onBlur}
                  placeholder="(00) 00000-0000"
                  className={`w-full h-12 pl-12 pr-4 rounded-xl border-2 text-gray-800 dark:text-gray-200 text-base transition-all duration-300 focus:outline-none ${errors.telefone && touchedFields.has('telefone')
                    ? 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/30 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/50'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/50'
                    }`}
                />
              </div>
              {errors.telefone && touchedFields.has('telefone') && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-xs">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.telefone}</span>
                </div>
              )}
              <div className="mt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={onTelefoneVerify}
                  disabled={!formData.telefone || !!errors.telefone || formData.telefone.replace(/\D/g, '').length < 10}
                  className="px-4 py-2 rounded-lg font-semibold text-sm transition-all bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Enviar
                </button>
                {telefoneVerificado && (
                  <span className="text-sm font-bold text-green-600 dark:text-green-400 inline-flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Verificado
                  </span>
                )}
              </div>
            </div>
          </>
        )}

        {isDataNascimentoValida(formData.dataNascimento) && isMenorDeIdade && (
          <div className="mt-3 p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">Dados do Responsável Legal</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  E-mail do Responsável
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="emailResponsavel"
                    value={formData.emailResponsavel}
                    onChange={onInputChange}
                    onBlur={onBlur}
                    placeholder="email.responsavel@exemplo.com"
                    className={`w-full h-12 pl-12 pr-4 rounded-xl border-2 text-gray-800 dark:text-gray-200 text-base transition-all duration-300 focus:outline-none ${errors.emailResponsavel && touchedFields.has('emailResponsavel')
                      ? 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/30 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/50'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/50'
                      }`}
                  />
                </div>
                {errors.emailResponsavel && touchedFields.has('emailResponsavel') && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-xs">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.emailResponsavel}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Telefone do Responsável
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Phone className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="telefoneResponsavel"
                    value={formData.telefoneResponsavel}
                    onChange={onInputChange}
                    onBlur={onBlur}
                    placeholder="(00) 00000-0000"
                    className={`w-full h-12 pl-12 pr-4 rounded-xl border-2 text-gray-800 dark:text-gray-200 text-base transition-all duration-300 focus:outline-none ${errors.telefoneResponsavel && touchedFields.has('telefoneResponsavel')
                      ? 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/30 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/50'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/50'
                      }`}
                  />
                </div>
                {errors.telefoneResponsavel && touchedFields.has('telefoneResponsavel') && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-xs">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.telefoneResponsavel}</span>
                  </div>
                )}
              </div>

              {formData.emailResponsavel && !errors.emailResponsavel && validateEmail(formData.emailResponsavel) && (
                <button
                  onClick={onEnviarAcessoPais}
                  disabled={enviandoAcesso || acessoEnviado}
                  className={`mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md ${acessoEnviado
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 cursor-default'
                    : enviandoAcesso
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 cursor-wait'
                      : 'bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5'
                    }`}
                >
                  {enviandoAcesso ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Enviando...
                    </>
                  ) : acessoEnviado ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Acesso enviado com sucesso!
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar acesso de monitoramento
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Escolaridade
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
              <GraduationCap className="w-5 h-5 text-gray-400" />
            </div>
            <select
              name="escolaridade"
              value={formData.escolaridade}
              onChange={onInputChange}
              className="w-full h-12 pl-12 pr-10 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 text-base bg-white dark:bg-gray-700 transition-all duration-300 focus:outline-none focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/50 appearance-none cursor-pointer"
            >
              <option value="">Selecione...</option>
              <option value="Ensino Fundamental">Ensino Fundamental</option>
              <option value="Ensino Médio">Ensino Médio</option>
              <option value="Graduação">Graduação</option>
              <option value="Pós-graduação">Pós-graduação</option>
              <option value="Mestrado">Mestrado</option>
              <option value="Doutorado">Doutorado</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {['Graduação', 'Pós-graduação', 'Mestrado', 'Doutorado'].includes(formData.escolaridade) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Área de Graduação
            </label>
            <div className="relative">
              <select
                name="areaGraduacao"
                value={formData.areaGraduacao}
                onChange={onInputChange}
                className="w-full h-12 px-4 pr-10 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 text-base bg-white dark:bg-gray-700 transition-all duration-300 focus:outline-none focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/50 appearance-none cursor-pointer"
              >
                <option value="">Selecione uma área...</option>
                <option value="Exatas">Ciências Exatas</option>
                <option value="Humanas">Ciências Humanas</option>
                <option value="Natureza">Ciências da Natureza</option>
                <option value="Saúde">Ciências da Saúde</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

