interface PlaceholderPageProps {
  title: string;
  onBack: () => void;
}

export default function PlaceholderPage({ title, onBack }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl text-[#8B27FF] mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">Esta pagina esta em desenvolvimento.</p>
        <button
          onClick={onBack}
          className="px-6 py-3 bg-[#8B27FF] text-white rounded-xl hover:bg-[#7B1FE8] transition-all"
        >
          Voltar ao Login
        </button>
      </div>
    </div>
  );
}
