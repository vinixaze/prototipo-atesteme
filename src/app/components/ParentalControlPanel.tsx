import { useState, useEffect } from 'react';
import { 
  X, 
  Clock, 
  Bell, 
  Shield, 
  AlertTriangle,
  Save,
  RotateCcw,
  Lock,
  Unlock,
  Calendar,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ParentalControlPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ParentalSettings {
  dailyTimeLimit: number; // em minutos
  weeklyTimeLimit: number; // em minutos
  timeLimitEnabled: boolean;
  alertsEnabled: boolean;
  alertThreshold: number; // percentual do limite (ex: 80%)
  blockAfterLimit: boolean;
  allowedDays: string[];
  startTime: string;
  endTime: string;
}

const DEFAULT_SETTINGS: ParentalSettings = {
  dailyTimeLimit: 120, // 2 horas
  weeklyTimeLimit: 600, // 10 horas
  timeLimitEnabled: false,
  alertsEnabled: false,
  alertThreshold: 80,
  blockAfterLimit: false,
  allowedDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
  startTime: '06:00',
  endTime: '22:00',
};

export default function ParentalControlPanel({ isOpen, onClose }: ParentalControlPanelProps) {
  const [settings, setSettings] = useState<ParentalSettings>(DEFAULT_SETTINGS);
  const [hasChanges, setHasChanges] = useState(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

  // Carregar configurações salvas
  useEffect(() => {
    const savedSettings = localStorage.getItem('parentalControlSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem('parentalControlSettings', JSON.stringify(settings));
    setHasChanges(false);
    setShowSaveConfirmation(true);
    setTimeout(() => setShowSaveConfirmation(false), 2000);
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    setHasChanges(true);
  };

  const updateSetting = <K extends keyof ParentalSettings>(
    key: K,
    value: ParentalSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const toggleDay = (day: string) => {
    const newDays = settings.allowedDays.includes(day)
      ? settings.allowedDays.filter(d => d !== day)
      : [...settings.allowedDays, day];
    updateSetting('allowedDays', newDays);
  };

  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#8B27FF] to-[#A855F7] p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Controle Parental</h2>
                <p className="text-white/80 text-sm">Gerencie o uso da plataforma</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all hover:rotate-90"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] space-y-6">
            
            {/* Info Box */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-2xl p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800 dark:text-blue-300">
                <p className="font-bold mb-1">Orientação para Pais e Responsáveis</p>
                <p>Configure limites de tempo e alertas para promover um uso saudável e equilibrado da plataforma. As configurações aplicam-se imediatamente após salvar.</p>
              </div>
            </div>

            {/* Seção 1: Limite de Tempo Diário */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#8B27FF]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200">Limite de Tempo Diário</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Defina o tempo máximo de uso por dia</p>
                  </div>
                </div>
                <button
                  onClick={() => updateSetting('timeLimitEnabled', !settings.timeLimitEnabled)}
                  className={`relative w-14 h-7 rounded-full transition-all ${
                    settings.timeLimitEnabled ? 'bg-[#8B27FF]' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <motion.div
                    className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md"
                    animate={{ x: settings.timeLimitEnabled ? 28 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              {settings.timeLimitEnabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Tempo por dia
                      </label>
                      <span className="text-lg font-bold text-[#8B27FF]">
                        {Math.floor(settings.dailyTimeLimit / 60)}h {settings.dailyTimeLimit % 60}min
                      </span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="480"
                      step="15"
                      value={settings.dailyTimeLimit}
                      onChange={(e) => updateSetting('dailyTimeLimit', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-[#8B27FF]"
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>15min</span>
                      <span>8h</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Tempo por semana
                      </label>
                      <span className="text-lg font-bold text-[#8B27FF]">
                        {Math.floor(settings.weeklyTimeLimit / 60)}h {settings.weeklyTimeLimit % 60}min
                      </span>
                    </div>
                    <input
                      type="range"
                      min="60"
                      max="2100"
                      step="30"
                      value={settings.weeklyTimeLimit}
                      onChange={(e) => updateSetting('weeklyTimeLimit', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-[#8B27FF]"
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>1h</span>
                      <span>35h</span>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Bloquear após atingir limite
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Impedir acesso quando o tempo limite for atingido
                      </p>
                      <button
                        onClick={() => updateSetting('blockAfterLimit', !settings.blockAfterLimit)}
                        className={`relative w-12 h-6 rounded-full transition-all ${
                          settings.blockAfterLimit ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <motion.div
                          className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md"
                          animate={{ x: settings.blockAfterLimit ? 24 : 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Seção 2: Alertas de Monitoramento */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
                    <Bell className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200">Alertas de Monitoramento</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Receba notificações sobre o uso</p>
                  </div>
                </div>
                <button
                  onClick={() => updateSetting('alertsEnabled', !settings.alertsEnabled)}
                  className={`relative w-14 h-7 rounded-full transition-all ${
                    settings.alertsEnabled ? 'bg-yellow-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <motion.div
                    className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md"
                    animate={{ x: settings.alertsEnabled ? 28 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              {settings.alertsEnabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Alerta ao atingir
                      </label>
                      <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                        {settings.alertThreshold}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="95"
                      step="5"
                      value={settings.alertThreshold}
                      onChange={(e) => updateSetting('alertThreshold', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>50%</span>
                      <span>95%</span>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-yellow-800 dark:text-yellow-300">
                        Você receberá um alerta quando o tempo de uso atingir <strong>{settings.alertThreshold}%</strong> do limite configurado.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Seção 3: Horários Permitidos */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-200">Horários e Dias Permitidos</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Configure quando a plataforma pode ser acessada</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Dias da semana */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                    Dias permitidos
                  </label>
                  <div className="grid grid-cols-7 gap-2">
                    {days.map((day) => (
                      <button
                        key={day}
                        onClick={() => toggleDay(day)}
                        className={`
                          px-2 py-2 rounded-lg text-xs font-bold transition-all
                          ${settings.allowedDays.includes(day)
                            ? 'bg-[#8B27FF] text-white shadow-md'
                            : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                          }
                        `}
                      >
                        {day.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Horário de início e fim */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                      Horário de início
                    </label>
                    <input
                      type="time"
                      value={settings.startTime}
                      onChange={(e) => updateSetting('startTime', e.target.value)}
                      className="w-full px-4 py-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 font-semibold focus:outline-none focus:border-[#8B27FF]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                      Horário de término
                    </label>
                    <input
                      type="time"
                      value={settings.endTime}
                      onChange={(e) => updateSetting('endTime', e.target.value)}
                      className="w-full px-4 py-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 font-semibold focus:outline-none focus:border-[#8B27FF]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer - Botões de Ação */}
          <div className="border-t-2 border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between gap-4">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-bold transition-all hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" />
              Restaurar Padrão
            </button>

            <div className="flex items-center gap-3">
              {showSaveConfirmation && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold text-sm"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center"
                  >
                    <Unlock className="w-3 h-3" />
                  </motion.div>
                  Salvo com sucesso!
                </motion.div>
              )}
              
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-bold transition-all"
              >
                Cancelar
              </button>
              
              <button
                onClick={handleSave}
                disabled={!hasChanges}
                className={`
                  flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all
                  ${hasChanges
                    ? 'bg-gradient-to-r from-[#8B27FF] to-[#A855F7] hover:from-[#7B1FE8] hover:to-[#9333EA] text-white shadow-lg hover:scale-105'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                <Save className="w-4 h-4" />
                Salvar Configurações
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
