
import { HistoryItem } from '../types';

// Generic object formatter for the text file
const formatObject = (obj: Record<string, any>): string => {
  if (!obj) return '';
  return Object.entries(obj)
    .filter(([key, value]) => key !== 'members' && value !== null && value !== undefined)
    .map(([key, value]) => {
      const cleanedValue = typeof value === 'string'
        ? value.replace(/api by mynk|api by dark eye/gi, '').trim()
        : value;
      return `  ${key.replace(/[\u{1F600}-\u{1F64F}]/gu, '').trim()}: ${cleanedValue || '-'}`;
    })
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

export const formatHistoryToString = (history: HistoryItem<any>[]): string => {
  if (!history || history.length === 0) {
    return "History is empty.";
  }

  return history.map((item, index) => {
    const header = `====================\nSearch #${index + 1}: ${item.query}\n====================`;
    const body = formatResultToString(item.result);
    return `${header}\n${body}`;
  }).join('\n\n\n');
};


const getHistoryFromStorage = <T>(key: string): HistoryItem<T>[] => {
  try {
    const storedHistory = window.localStorage.getItem(key);
    return storedHistory ? JSON.parse(storedHistory) : [];
  } catch (error) {
    console.error(`Error reading ${key} from localStorage`, error);
    return [];
  }
};

const formatHistoryCategory = (title: string, history: HistoryItem<any>[]): string => {
  if (!history || history.length === 0) {
    return `==============================\n${title.toUpperCase()}\n==============================\nNo history found for this category.`;
  }

  const header = `==============================\n${title.toUpperCase()}\n==============================`;
  
  const content = history.map((item, index) => {
    const itemHeader = `----------\nSearch #${index + 1}: ${item.query}\n----------`;
    const body = formatResultToString(item.result);
    return `${itemHeader}\n${body}`;
  }).join('\n\n');

  return `${header}\n\n${content}`;
};

export const formatAllHistoryToString = (): string => {
  const aadhaarHistory = getHistoryFromStorage('aadhaarHistory');
  const numberHistory = getHistoryFromStorage('numberHistory');
  const combinedHistory = getHistoryFromStorage('combinedHistory');

  if (aadhaarHistory.length === 0 && numberHistory.length === 0 && combinedHistory.length === 0) {
    return "No search history found to download.";
  }

  const aadhaarContent = formatHistoryCategory('Aadhaar Search History', aadhaarHistory);
  const numberContent = formatHistoryCategory('Number Search History', numberHistory);
  const combinedContent = formatHistoryCategory('Full Profile Search History', combinedHistory);
  
  return [aadhaarContent, numberContent, combinedContent].join('\n\n\n');
};
