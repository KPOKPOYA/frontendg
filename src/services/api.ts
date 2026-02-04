import axios from 'axios';
import type { Purchase, CreatePurchase, TopProduct, FinancialSummary } from '../types';

const API_URL = ((import.meta as any).env.VITE_API_URL as string) || 'https://backendg-qw18.onrender.com';
// Debug: affiche l'URL d'API utilisée au démarrage (ouvrir la console navigateur)
console.debug('API_URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const purchaseService = {
  async createPurchase(data: CreatePurchase): Promise<Purchase> {
    const response = await api.post<Purchase>('/purchases', data);
    return response.data;
  },

  async getAllPurchases(): Promise<Purchase[]> {
    const response = await api.get<Purchase[]>('/purchases');
    return response.data;
  },

  async getTopProduct(): Promise<TopProduct> {
    const response = await api.get<TopProduct>('/purchases/top-product');
    return response.data;
  },

  async getFinancialSummary(): Promise<FinancialSummary> {
    const response = await api.get<FinancialSummary>('/purchases/financial-summary');
    return response.data;
  },
};
