import axios from 'axios';
import type { Purchase, CreatePurchase, TopProduct, FinancialSummary } from '../types';

// Récupérer l'URL de l'API depuis les variables d'environnement
const getApiUrl = (): string => {
  // Vite expose les variables VITE_* via import.meta.env
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && envUrl.trim() !== '') {
    return envUrl;
  }
  // Fallback par défaut
  return 'https://backendg-qw18.onrender.com';
};

const API_URL = getApiUrl();
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
