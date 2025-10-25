
import React from 'react';

interface DownloadOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadTxt: () => void;
  onDownloadPdf: () => void;
}

const DownloadOptionsModal: React.FC<DownloadOptionsModalProps> = ({ isOpen, onClose, onDownloadTxt, onDownloadPdf }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl w-full max-w-sm border border-slate-200 dark:border-slate-700/50"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-center text-slate-800 dark:text-white mb-6">Choose Download Format</h3>
        <div className="flex flex-col gap-4">
          <button
            onClick={onDownloadTxt}
            className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-px"
          >
            Download as TXT
          </button>
          <button
            onClick={onDownloadPdf}
            className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-px"
          >
            Download as PDF
          </button>
        </div>
        <button
          onClick={onClose}
          className="w-full mt-6 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DownloadOptionsModal;
