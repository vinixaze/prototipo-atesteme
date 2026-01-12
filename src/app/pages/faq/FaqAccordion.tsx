import { motion } from 'motion/react';
import { ChevronDown, Search } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';
import type { FAQItem } from '../../data/faq';

interface FaqAccordionProps {
  items: FAQItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      <Accordion.Root type="single" collapsible className="space-y-4">
        {items.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <Accordion.Item
              value={`item-${index}`}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full group">
                  <div className="flex items-center justify-between w-full px-6 md:px-8 py-5 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <span className="font-semibold text-gray-800 dark:text-white text-lg pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown className="w-6 h-6 text-[#8B27FF] dark:text-[#A855F7] flex-shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </div>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
                <div className="px-6 md:px-8 pb-6 pt-2">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          </motion.div>
        ))}
      </Accordion.Root>

      {items.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Nenhuma pergunta encontrada
          </h3>
          <p className="text-gray-600">
            Tente ajustar sua busca ou selecione outra categoria
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
