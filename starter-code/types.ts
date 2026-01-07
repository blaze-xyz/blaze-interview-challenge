/**
 * Webhook Types from Payment Providers
 * Each provider has their own format and field naming conventions
 */

// Bridge Money webhook format
export interface BridgeWebhook {
  event_type: 'payment.initiated' | 'payment.processing' | 'payment.completed' | 'payment.failed';
  payment_id: string;
  external_id: string; // Your reference ID
  amount: string; // Amount in cents as string (e.g., "10000" = $100.00)
  currency: 'USD';
  timestamp: string; // ISO 8601
  signature: string; // HMAC-SHA256 of payload
  metadata?: {
    fee: string; // Fee in cents
    exchange_rate?: number;
  };
}

// Bitso webhook format
export interface BitsoWebhook {
  type: 'transfer';
  status: 'pending' | 'processing' | 'success' | 'failed';
  id: string; // Bitso's ID
  client_id: string; // Your reference ID
  value: number; // Decimal amount (e.g., 100.00)
  currency_code: string; // "USD", "MXN", etc.
  created_at: number; // Unix timestamp in milliseconds
  signature: string; // Different signature format than Bridge
  details?: {
    fee_amount?: number;
    fx_rate?: number;
    original_amount?: number;
    original_currency?: string;
  };
}

// DLocal webhook format
export interface DLocalWebhook {
  notification_type: 'payment' | 'refund';
  payment: {
    id: string; // DLocal's ID
    merchant_reference: string; // Your reference ID
    status: 'PENDING' | 'AUTHORIZED' | 'PAID' | 'REJECTED' | 'CANCELLED';
    amount: number; // Decimal amount
    currency: string;
    created_date: string; // "2024-01-01T12:00:00.000Z"
  };
  signature: string; // Base64 encoded
  version: '1.0' | '2.0'; // API version affects field names
}

/**
 * Internal Transaction Model
 */
export interface Transaction {
  id: string; // Internal transaction ID
  externalId: string; // ID sent to provider
  provider: 'bridge' | 'bitso' | 'dlocal';
  amount: string; // Store as string to avoid floating point issues
  currency: string;
  status: TransactionStatus;
  createdAt: Date;
  updatedAt: Date;
  webhooksReceived: WebhookRecord[];
  reconciliation?: ReconciliationResult;
}

export enum TransactionStatus {
  CREATED = 'created',
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  REQUIRES_REVIEW = 'requires_review' // When reconciliation finds issues
}

export interface WebhookRecord {
  id: string;
  provider: string;
  receivedAt: Date;
  rawPayload: any;
  signature: string;
  isValid: boolean;
  isDuplicate: boolean;
  processedAt?: Date;
  error?: string;
}

export interface ReconciliationResult {
  status: 'matched' | 'discrepancy' | 'missing_webhook' | 'excess_webhook';
  expectedAmount: string;
  actualAmount?: string;
  amountDifference?: string;
  discrepancyPercentage?: number;
  issues: ReconciliationIssue[];
  lastCheckedAt: Date;
}

export interface ReconciliationIssue {
  type: 'amount_mismatch' | 'duplicate_webhook' | 'out_of_order' | 'missing_webhook' | 'invalid_signature' | 'timeout';
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  detectedAt: Date;
}

/**
 * Service Interfaces
 */
export interface ReconciliationService {
  processWebhook(provider: string, payload: any, signature: string): Promise<void>;
  reconcileTransaction(transactionId: string): Promise<ReconciliationResult>;
  generateReport(startDate?: Date, endDate?: Date): Promise<ReconciliationReport>;
}

export interface ReconciliationReport {
  generatedAt: Date;
  period: {
    start: Date;
    end: Date;
  };
  summary: {
    totalTransactions: number;
    reconciledSuccessfully: number;
    withDiscrepancies: number;
    missingWebhooks: number;
    requiresReview: number;
  };
  providers: {
    [key: string]: {
      totalWebhooks: number;
      duplicates: number;
      invalidSignatures: number;
      averageDeliveryTime: number; // milliseconds
    };
  };
  criticalIssues: ReconciliationIssue[];
}

/**
 * Webhook Signature Verification
 * Each provider uses different signature methods
 */
export interface SignatureVerifier {
  verifyBridge(payload: any, signature: string, secret: string): boolean;
  verifyBitso(payload: any, signature: string, secret: string): boolean;
  verifyDLocal(payload: any, signature: string, secret: string): boolean;
}

/**
 * Amount Calculation Utilities
 * Critical for financial accuracy
 */
export interface AmountCalculator {
  // Convert amounts to standard format (string in smallest unit)
  normalizeAmount(amount: string | number, currency: string): string;

  // Calculate percentage difference between amounts
  calculateDiscrepancy(expected: string, actual: string): number;

  // Check if discrepancy is within acceptable range (0.01%)
  isWithinTolerance(expected: string, actual: string, tolerancePercent?: number): boolean;

  // Handle currency conversion if needed
  convertCurrency(amount: string, fromCurrency: string, toCurrency: string, rate: number): string;
}