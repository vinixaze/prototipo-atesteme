import { Briefcase, Lock, Building } from 'lucide-react';
import { FormData } from '../../types/profile';

interface ComplementaryDataFormProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function ComplementaryDataForm({ formData, onInputChange }: ComplementaryDataFormProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 animate-slideUp">
      <div className="mb-6 pb-5 border-b-2 border-gray-100 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-[#8B27FF] dark:text-[#A855F7]" strokeWidth={2} />
          </div>
          Dados Complementares
        </h3>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            Nome da Organização
            <Lock className="w-3.5 h-3.5 text-gray-400" />
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <Building className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="codigoOrganizacao"
              value={formData.codigoOrganizacao}
              readOnly
              placeholder="Nome da sua instituição"
              className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 text-base bg-gray-50 dark:bg-gray-700/50 transition-all duration-300 cursor-not-allowed opacity-75"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Turma
          </label>
          <input
            type="text"
            name="turma"
            placeholder="Digite sua turma"
            className="w-full h-12 px-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 text-base bg-white dark:bg-gray-700 transition-all duration-300 focus:outline-none focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/50"
          />
        </div>
      </div>
    </div>
  );
}

