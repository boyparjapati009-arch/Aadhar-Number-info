export interface AadhaarMember {
  memName: string;
  relation: string;
}

export interface AadhaarDetails {
  address: string;
  homeDistName: string;
  homeStateName: string;
  schemeName: string;
  allowed_onorc: string;
  members: AadhaarMember[];
  [key: string]: any; 
}

export interface NumberData {
  '📱 Mobile': string;
  '👤 Name': string;
  '👨‍👩‍👧 Father': string;
  '🏠 Address': string;
  '📞 Alt Mobile': string;
  '📶 Circle/ISP': string;
  '🆔 Aadhar': string;
  '✉️ Email': string;
  [key: string]: string;
}

export interface NumberResponse {
  status: string;
  number: string;
  data: NumberData;
}

export interface AadhaarProtectResponse {
  aadhaar_numbers: string[];
}

export interface NumberProtectResponse {
  protected_numbers: string[];
}

export interface CombinedDetails {
  numberDetails: NumberResponse;
  aadhaarDetails: AadhaarDetails;
}

export interface HistoryItem<T> {
  query: string;
  result: T;
}
