import React from 'react';
import { BookOpen, Binary as Binoculars, Globe, Code, ArrowLeft } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">About Farsi2English</h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg mb-12">
          <div className="flex items-center mb-6">
            <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Our Story</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Farsi2English began as a passion project by Danyal Falsafi, a university student eager to connect with his Persian heritage and share the beauty of Farsi music with English-speaking Iranians worldwide. As a student immersed in both cultures, Danyal recognized the need for a platform that could bridge the gap between Persian musical heritage and the English-speaking Iranian diaspora.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            What started as a personal journey to learn more about his culture has evolved into a comprehensive platform that helps English-speaking Iranians connect with their roots through music. The project embodies the spirit of cultural preservation and accessibility, making Persian music more approachable for those who might struggle with the Persian script.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Our Mission</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              To make Persian music accessible to English-speaking Iranians by providing accurate Finglish translations, helping preserve cultural connections through the universal language of music.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <Binoculars className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Our Vision</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              To become the go-to platform for English-speaking Iranians looking to connect with their cultural heritage through music, fostering a community that celebrates and preserves Persian musical traditions.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8">
          <div className="flex items-center mb-6">
            <Code className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Technical Expertise</h2>
          </div>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Developed by Danyal Falsafi, Farsi2English leverages modern web technologies to provide a seamless user experience:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>React.js for dynamic and responsive user interfaces</li>
              <li>TypeScript for enhanced code reliability</li>
              <li>Tailwind CSS for beautiful, responsive designs</li>
              <li>Modern cloud infrastructure for reliable performance</li>
            </ul>
            <p className="mt-6">
              The platform is continuously evolving, with regular updates and improvements based on user feedback and changing needs of our community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;