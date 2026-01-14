import { motion, AnimatePresence } from 'motion/react';
import * as Dialog from '@radix-ui/react-dialog';
import { BookOpen } from 'lucide-react';
import { VideoChapter } from '../types';

interface VideoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chapters: VideoChapter[];
  activeChapter: number | null;
  expandedChapter: number | null;
  onChapterToggle: (chapterId: number) => void;
  onJump: (timestamp: number, chapterId: number) => void;
  iframeRef: React.RefObject<HTMLIFrameElement>;
}

export function VideoModal({
  open,
  onOpenChange,
  chapters,
  activeChapter,
  expandedChapter,
  onChapterToggle,
  onJump,
  iframeRef
}: VideoModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
        </Dialog.Overlay>

        <Dialog.Content asChild>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-8 lg:inset-12 z-50 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <Dialog.Title className="font-bold text-lg">Guia do usuário Atesteme</Dialog.Title>
                  <p className="text-sm text-purple-100">Tutorial completo da plataforma</p>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              <div className="w-full md:w-2/3 bg-black flex items-center justify-center p-4 md:p-6 flex-shrink-0">
                <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    ref={iframeRef}
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Tutorial Atesteme"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-900 flex flex-col min-h-0 md:min-h-full">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
                  <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#8B27FF] dark:text-[#A855F7]" />
                    Capítulos ({chapters.length})
                  </h3>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 min-h-0">
                  {chapters.map((chapter) => (
                    <motion.div
                      key={chapter.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: chapter.id * 0.02 }}
                    >
                      <motion.button
                        onClick={() => {
                          onJump(chapter.timestamp, chapter.id);
                          onChapterToggle(chapter.id);
                        }}
                        whileHover={{ x: 4 }}
                        className={`w-full text-left rounded-xl overflow-hidden transition-all ${
                          activeChapter === chapter.id
                            ? 'bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white shadow-lg'
                            : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <div className="p-4">
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${chapter.gradient} flex items-center justify-center flex-shrink-0 ${
                                activeChapter === chapter.id ? 'bg-white/20' : ''
                              }`}
                            >
                              <chapter.icon className="w-5 h-5 text-white" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className={`text-xs font-bold px-2 py-0.5 rounded ${
                                    activeChapter === chapter.id
                                      ? 'bg-white/20 text-white'
                                      : 'bg-purple-100 text-[#8B27FF]'
                                  }`}
                                >
                                  {chapter.duration}
                                </span>
                              </div>
                              <h4
                                className={`font-bold text-sm mb-1 ${
                                  activeChapter === chapter.id ? 'text-white' : 'text-gray-800'
                                }`}
                              >
                                {chapter.title}
                              </h4>
                            </div>
                          </div>

                          <AnimatePresence>
                            {expandedChapter === chapter.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <p
                                  className={`text-sm mt-3 pt-3 border-t leading-relaxed ${
                                    activeChapter === chapter.id
                                      ? 'text-purple-100 border-white/20'
                                      : 'text-gray-600 border-gray-200'
                                  }`}
                                >
                                  {chapter.description}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
