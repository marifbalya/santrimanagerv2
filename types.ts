
export interface PurchaseOption {
  value: number;
  label: string;
  purchaseCode: string;
}

export interface CreditCode {
  id: string; // The code itself
  value: number; // e.g., 1000, 5000
  addedAt: number; // Timestamp
}

export interface ServerCode {
  id: string; // The code itself
  timesUsed: number;
  addedAt: number; // Timestamp
}

export interface Transaction {
  id: string; // Unique transaction ID
  timestamp: number;
  amount: number; // Value of the first item type in the cart for simplicity
  quantity: number; // Total number of individual credit tokens sold
  totalValue: number; // Sum of (item.value * item.quantity) for all items in the cart
  purchaseCodes: string[]; // e.g., ["SANTRI1K", "SANTRI5K"] if multiple types sold
  creditCodesUsed: string[]; // Array of actual credit codes used
  serverCodeUsed: string;
  // Stores a concatenation of all generated customer messages for historical record
  formattedMessage: string; 
}

export enum AppView {
  MANAGE_CODES = 'MANAGE_CODES', // Re-instated for dedicated code input view
  SALES_TERMINAL = 'SALES_TERMINAL',
  HISTORY = 'HISTORY',
  // STOCK_VIEW = 'STOCK_VIEW', // Removed as per user request
}

export interface CartItem {
  id: string; // Unique ID for the cart item (e.g., generated with Date.now())
  purchaseOption: PurchaseOption;
  quantity: number;
}

// Removed SaleOutputComponent as it's no longer used

export interface ProcessedSaleOutput {
  transactionId: string;
  // Each string is a fully formed message for a specific credit value from the sale
  customerMessages: string[]; 
  staticInfoMessage: string; // Holds the STATIC_SALES_INFO
  error?: string; // If an error occurred during processing
}