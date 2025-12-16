import React from 'react';
import Modal from './Modal';
import { faqData } from '../data/mockData';
import { HelpCircle, ChevronRight } from 'lucide-react';

const FAQModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Các vấn đề thường gặp" size="lg">
      <div className="p-6">
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-3 mb-3">
                <HelpCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                <h3 className="font-bold text-dark text-lg">{faq.question}</h3>
              </div>
              <div className="flex items-start gap-3 pl-8">
                <ChevronRight className="text-secondary flex-shrink-0 mt-1" size={16} />
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default FAQModal;
