
import React, { useState } from 'react';
import { downloadAllHistory } from '../utils/allDownload';
import { downloadAllHistoryAsPdf } from '../utils/pdfDownloader';
import DownloadOptionsModal from './DownloadOptionsModal';

interface HomeScreenProps {
  onSelectAadhaar: () => void;
  onSelectNumber: () => void;
  onSelectCombined: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectAadhaar, onSelectNumber, onSelectCombined }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownloadTxt = () => {
    downloadAllHistory();
    setIsModalOpen(false);
  };
  
  const handleDownloadPdf = () => {
    downloadAllHistoryAsPdf();
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
      <div className="text-center animate-fade-in">
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-cyan-500 to-purple-600 text-transparent bg-clip-text">
            Info Finder
          </h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
            Securely fetch Aadhaar and Mobile Number details.
          </p>
        </header>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={onSelectAadhaar}
            className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Aadhaar Info
          </button>
           <button
            onClick={onSelectCombined}
            className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Full Profile
          </button>
          <button
            onClick={onSelectNumber}
            className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Number Info
          </button>
        </div>
        <div className="mt-12">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-slate-600 to-slate-800 rounded-xl shadow-lg shadow-slate-500/20 hover:shadow-xl hover:shadow-slate-500/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Download All Search Info
          </button>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
