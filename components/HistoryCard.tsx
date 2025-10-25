
import React, { useState } from 'react';
import { HistoryItem } from '../types';
import DownloadOptionsModal from './DownloadOptionsModal';
import { downloadHistoryAsTxt } from '../utils/download';
import { downloadHistoryAsPdf } from '../utils/pdfDownloader';

interface HistoryCardProps {
  history: HistoryItem<any>[];
  onItemClick: (item: HistoryItem<any>) => void;
  onClear: () => void;
  title: string;
  onDownload?: (format: 'txt' | 'pdf') => void; // Prop is now for internal use if needed
  fileNamePrefix: string;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ history, onItemClick, onClear, title, fileNamePrefix }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (history.length === 0) {
    return null;
  }
  
  const handleDownloadTxt = () => {
    downloadHistoryAsTxt(history, `${fileNamePrefix}-history.txt`);
    setIsModalOpen(false);
  };

  const handleDownloadPdf = () => {
    downloadHistoryAsPdf(history, `${fileNamePrefix}-history.pdf`);
    setIsModalOpen(false);
  };

  return (
    <>
      <DownloadOptionsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDownloadTxt={handleDownloadTxt}
        onDownloadPdf={handleDownloadPdf}
      />
      <div className="w-full max-w-lg mt-6 animate-fade-in">
        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-semibold text-slate-700 dark:text-slate-300">{title}</h3>
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-xs font-medium text-slate-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-200"
                aria-label="Download search history"
              >
                Download
              </button>
              <button
                onClick={onClear}
                className="text-xs font-medium text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                aria-label="Clear all search history"
              >
                Clear All
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {history.map((item) => (
              <button
                key={item.query}
                onClick={() => onItemClick(item)}
                className="px-3 py-1.5 bg-slate-200/50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300/50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all duration-200 text-sm font-medium transform hover:-translate-y-px"
              >
                {item.query}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryCard;
