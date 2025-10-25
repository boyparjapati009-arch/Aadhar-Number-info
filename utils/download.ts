import { HistoryItem } from '../types';

// Generic object formatter for the text file
const formatObject = (obj: Record<string, any>): string => {
  if (!obj) return '';
  return Object.entries(obj)
    .filter(([key, value]) => key !== 'members' && value !== null && value !== undefined)
    .map(([key, value]) => `  ${key.replace(/[\u{1F600}-\u{1F64F}]/gu, '').trim()}: ${value || '-'}`)
    .join('\n');
};

// Custom formatter to create a readable string from a result object
export const formatResultToString = (result: any): string => {
  if (!result) return "No data available.";
  
  // Handle CombinedDetails
  if (result.numberDetails && result.aadhaarDetails) {
    let combinedString = `--- Number Details ---\n${formatObject(result.numberDetails.data)}`;
    combinedString += `\n\n--- Aadhaar Details ---\n${formatObject(result.aadhaarDetails)}`;
    
    if (result.aadhaarDetails.members && result.aadhaarDetails.members.length > 0) {
      combinedString += '\n\n--- Member Details ---\n';
      result.aadhaarDetails.members.forEach((member: any, index: number) => {
        combinedString += `  Member ${index + 1}:\n    Name: ${member.memName}\n    Relation: ${member.relation}\n`;
      });
    }
    return combinedString;
  }
  
  // Handle NumberResponse
  if (result.data && result.status) {
    return `--- Number Details ---\n${formatObject(result.data)}`;
  }

  // Handle AadhaarDetails
  const { members, ...mainDetails } = result;
  let aadhaarString = `--- Aadhaar Details ---\n${formatObject(mainDetails)}`;
  if (members && members.length > 0) {
    aadhaarString += '\n\n--- Member Details ---\n';
    members.forEach((member: any, index: number) => {
      aadhaarString += `  Member ${index + 1}:\n    Name: ${member.memName}\n    Relation: ${member.relation}\n`;
    });
  }
  return aadhaarString;
}

export const downloadHistoryAsTxt = (history: HistoryItem<any>[], filename: string): void => {
  if (!history || history.length === 0) {
    console.warn("History is empty, nothing to download.");
    return;
  }

  const content = history.map((item, index) => {
    const header = `====================\nSearch #${index + 1}: ${item.query}\n====================`;
    const body = formatResultToString(item.result);
    return `${header}\n${body}`;
  }).join('\n\n\n');
  
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