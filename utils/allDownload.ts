
import { formatAllHistoryToString } from './formatters';

export const downloadAllHistory = (): void => {
  const fullContent = formatAllHistoryToString();

  if (fullContent.startsWith("No search history")) {
    alert(fullContent);
    return;
  }

  const blob = new Blob([fullContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'all-search-history.txt';
  document.body.appendChild(a);
  a.click();
  
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
