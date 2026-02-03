import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { purchaseService } from '../services/api';
import type { FinancialSummary, TopProduct } from '../types';

export default function Dashboard() {
  const [summary, setSummary] = useState<FinancialSummary | null>(null);
  const [topProduct, setTopProduct] = useState<TopProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [summaryData, topProductData] = await Promise.all([
        purchaseService.getFinancialSummary(),
        purchaseService.getTopProduct(),
      ]);
      setSummary(summaryData);
      setTopProduct(topProductData);
    } catch (err) {
      setError('Erreur lors du chargement des données');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="bg-red-50 border-2 border-red-200">
          <p className="text-red-600 text-center">{error}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center animate-fade-in">
        <h1 className="text-5xl font-display font-bold text-gray-900 mb-3">
          Tableau de bord
        </h1>
        <p className="text-gray-600 text-lg">
          Vue d'ensemble de vos achats
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card 
          className="bg-gradient-to-br from-primary-500 to-primary-600 text-white hover:shadow-2xl transition-shadow duration-300"
          icon="💵"
        >
          <div className="text-center">
            <p className="text-sm font-medium opacity-90 mb-1">Total dépensé</p>
            <p className="text-4xl font-bold font-mono">
              {summary?.totalSpent.toFixed(2)} €
            </p>
          </div>
        </Card>

        <Card 
          className="bg-gradient-to-br from-accent-500 to-accent-600 text-white hover:shadow-2xl transition-shadow duration-300"
          icon="📦"
        >
          <div className="text-center">
            <p className="text-sm font-medium opacity-90 mb-1">Nombre d'achats</p>
            <p className="text-4xl font-bold font-mono">
              {summary?.purchaseCount || 0}
            </p>
          </div>
        </Card>

        <Card 
          className="bg-gradient-to-br from-green-500 to-green-600 text-white hover:shadow-2xl transition-shadow duration-300"
          icon="📊"
        >
          <div className="text-center">
            <p className="text-sm font-medium opacity-90 mb-1">Prix moyen</p>
            <p className="text-4xl font-bold font-mono">
              {summary?.averagePrice.toFixed(2) || '0.00'} €
            </p>
          </div>
        </Card>

        <Card 
          className="bg-gradient-to-br from-orange-500 to-orange-600 text-white hover:shadow-2xl transition-shadow duration-300"
          icon="⬆️"
        >
          <div className="text-center">
            <p className="text-sm font-medium opacity-90 mb-1">Plus cher</p>
            <p className="text-4xl font-bold font-mono">
              {summary?.mostExpensivePurchase.toFixed(2) || '0.00'} €
            </p>
          </div>
        </Card>

        <Card 
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:shadow-2xl transition-shadow duration-300"
          icon="⬇️"
        >
          <div className="text-center">
            <p className="text-sm font-medium opacity-90 mb-1">Moins cher</p>
            <p className="text-4xl font-bold font-mono">
              {summary?.cheapestPurchase.toFixed(2) || '0.00'} €
            </p>
          </div>
        </Card>

        <Card 
          className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white hover:shadow-2xl transition-shadow duration-300"
          icon="🏆"
        >
          <div className="text-center">
            <p className="text-sm font-medium opacity-90 mb-1">Produit Top</p>
            <p className="text-2xl font-bold truncate">
              {topProduct?.productName || 'Aucun'}
            </p>
            <p className="text-sm opacity-90 mt-1">
              {topProduct?.count || 0} achats
            </p>
          </div>
        </Card>
      </div>

      <div className="flex justify-center gap-4 pt-4">
        <Link
          to="/add"
          className="px-8 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          ➕ Ajouter un achat
        </Link>
        <Link
          to="/history"
          className="px-8 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-xl font-semibold hover:bg-primary-50 transform hover:scale-105 transition-all duration-200"
        >
          📜 Voir l'historique
        </Link>
      </div>
    </div>
  );
}
