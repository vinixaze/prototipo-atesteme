import { motion } from 'motion/react';
import { ExternalLink, FileText, Globe, Play } from 'lucide-react';
import { ContentCategory, ContentItem } from '../types';

interface ContentGridProps {
  contents: ContentItem[];
  currentCategory?: ContentCategory;
}

export default function ContentGrid({ contents, currentCategory }: ContentGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contents.map((content, index) => {
        const formatIcon = content.format === 'Vídeo'
          ? Play
          : content.format === 'Site'
            ? Globe
            : FileText;
        const FormatIcon = formatIcon;

        return (
          <motion.a
            key={content.id}
            href={content.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            <div
              className="h-2"
              style={{ backgroundColor: currentCategory?.color }}
            />

            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: `${currentCategory?.color}15`,
                    color: currentCategory?.color,
                  }}
                >
                  <FormatIcon className="w-3.5 h-3.5" />
                  {content.format}
                </div>
              </div>

              <h3 className="font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-[#8B27FF] dark:group-hover:text-[#A855F7] transition-colors">
                {content.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {content.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Nível {content.level}
                </span>
                <div className="flex items-center gap-1 text-sm font-semibold text-[#8B27FF] dark:text-[#A855F7] group-hover:gap-2 transition-all">
                  <span>Acessar</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}
