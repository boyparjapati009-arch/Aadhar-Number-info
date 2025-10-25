
import { HistoryItem } from '../types';
import { formatHistoryToString, formatAllHistoryToString } from './formatters';

declare const jspdf: any;

const generatePdf = (content: string, filename: string) => {
  if (content.startsWith("History is empty") || content.startsWith("No search history")) {
    alert(content);
    return;
  }
  
  const { jsPDF } = jspdf;
  const doc = new jsPDF();

  const lines = doc.splitTextToSize(content, 180); // 180mm width
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(lines, 15, 20);

  doc.save(filename);
};

export const downloadHistoryAsPdf = (history: HistoryItem<any>[], filename: string): void => {
  const content = formatHistoryToString(history);
  generatePdf(content, filename);
};

export const downloadAllHistoryAsPdf = (): void => {
  const content = formatAllHistoryToString();
  generatePdf(content, 'all-search-history.pdf');
};
