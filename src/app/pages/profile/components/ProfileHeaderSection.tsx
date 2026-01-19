export default function ProfileHeaderSection() {
  return (
    <div className="mb-10 animate-fadeIn">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Meu Perfil</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Dashboard <span className="text-gray-400 dark:text-gray-500 mx-2">›</span>
        <span className="text-[#8B27FF] dark:text-[#A855F7] font-medium">Perfil</span>
      </p>
    </div>
  );
}
