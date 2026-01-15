import { motion } from 'motion/react';
import { HelpCircle } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#8B27FF] via-[#A855F7] to-[#C084FC] text-white">
      <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMy4zMTQgMi42ODYtNiA2LTZzNi02IDYtNmMwIDMuMzE0LTIuNjg2IDYtNiA2cy02IDIuNjg2LTYgNnoiLz48L2c+PC9nPjwvc3ZnPg==')]"
      />
      <div className="relative max-w-7xl mx-auto px-4 py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-3xl mb-4">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Centro de Ajuda</h1>
          <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
            Encontre respostas para suas dúvidas sobre a plataforma ATESTEME.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
