export interface Purchase {
  id: number;
  productName: string;
  price: number;
  purchaseDate: string;
  createdAt: string;
}

export interface CreatePurchase {
  productName: string;
  price: number;
  purchaseDate: string;
}

export interface TopProduct {
  productName: string;
  count: number;
  totalSpent: number;
}

export interface FinancialSummary {
  totalSpent: number;
  purchaseCount: number;
  averagePrice: number;
  mostExpensivePurchase: number;
  cheapestPurchase: number;
}
