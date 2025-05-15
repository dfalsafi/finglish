import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface SectionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, description, icon: Icon, onClick }) => {
  return (
    <div 
      className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:scale-105 overflow-hidden"
      onClick={onClick}
    >
      {/* Content */}
      <div className="relative flex flex-col items-center text-center">
        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
          <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default SectionCard;