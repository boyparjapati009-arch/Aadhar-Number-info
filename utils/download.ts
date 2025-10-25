
import { HistoryItem } from '../types';
import { formatHistoryToString } from './formatters';

export const downloadHistoryAsTxt = (history: HistoryItem<any>[], filename: string): void => {
  const content = formatHistoryToString(history);

  if (content.startsWith("History is empty")) {
    alert(content);
    return;
  }
  
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
