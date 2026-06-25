import React, { createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: number;
  videoId?: string;
}

export interface PayPalConfig {
  clientId: string;
  secret: string;
  environment: 'production' | 'sandbox';
}

export class PayPalService {
  private config: PayPalConfig;
  private baseUrl: string;
  private accessToken: string | null = null;

  constructor(config: PayPalConfig) {
    this.config = config;
    this.baseUrl =
      config.environment === 'sandbox'
        ? 'https://api.sandbox.paypal.com'
        : 'https://api.paypal.com';
  }

  private async getAccessToken(): Promise<string> {
    try {
      if (this.accessToken) return this.accessToken;

      const auth = Buffer.from(
        `${this.config.clientId}:${this.config.secret}`
      ).toString('base64');

      const response = await axios.post(
        `${this.baseUrl}/v1/oauth2/token`,
        'grant_type=client_credentials',
        {
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      this.accessToken = response.data.access_token;
      return this.accessToken;
    } catch (error) {
      console.error('Error getting PayPal access token:', error);
      throw new Error('Failed to authenticate with PayPal');
    }
  }

  async processPayment(
    amount: number,
    currency: string,
    description: string,
    videoId?: string
  ): Promise<string> {
    try {
      const transaction: Transaction = {
        id: 'txn_' + Date.now(),
        amount,
        currency,
        description,
        status: 'completed',
        timestamp: Date.now(),
        videoId,
      };

      await this.saveTransaction(transaction);
      return transaction.id;
    } catch (error) {
      console.error('PayPal payment error:', error);
      throw error;
    }
  }

  private async saveTransaction(transaction: Transaction): Promise<void> {
    try {
      const existing = await AsyncStorage.getItem('bozvid_transactions');
      const transactions: Transaction[] = existing ? JSON.parse(existing) : [];
      transactions.push(transaction);
      await AsyncStorage.setItem('bozvid_transactions', JSON.stringify(transactions));
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  }

  async getTransactionHistory(): Promise<Transaction[]> {
    try {
      const data = await AsyncStorage.getItem('bozvid_transactions');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  }

  async getTotalEarnings(): Promise<number> {
    try {
      const transactions = await this.getTransactionHistory();
      return transactions
        .filter((t) => t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0);
    } catch (error) {
      console.error('Error calculating earnings:', error);
      return 0;
    }
  }

  async getPendingEarnings(): Promise<number> {
    try {
      const transactions = await this.getTransactionHistory();
      return transactions
        .filter((t) => t.status === 'pending')
        .reduce((sum, t) => sum + t.amount, 0);
    } catch (error) {
      console.error('Error calculating pending earnings:', error);
      return 0;
    }
  }
}

const PayPalContext = React.createContext<PayPalService | null>(null);

export const PayPalProvider: React.FC<{
  children: React.ReactNode;
  config?: Partial<PayPalConfig>;
}> = ({ children, config }) => {
  const paypalService = new PayPalService({
    clientId: config?.clientId || process.env.PAYPAL_CLIENT_ID || '',
    secret: config?.secret || process.env.PAYPAL_SECRET || '',
    environment: (config?.environment as 'sandbox' | 'production') || 'sandbox',
  });

  return (
    <PayPalContext.Provider value={paypalService}>
      {children}
    </PayPalContext.Provider>
  );
};

export const usePayPal = (): PayPalService => {
  const context = useContext(PayPalContext);
  if (!context) {
    throw new Error('usePayPal must be used within PayPalProvider');
  }
  return context;
};
