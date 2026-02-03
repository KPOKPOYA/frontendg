import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { purchaseService } from '../services/api';
import type { FinancialSummary } from '../types';

export default function FinancialSummaryPage() {
  const [summary, setSummary] = useState<FinancialSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await purchaseService.getFinancialSummary();
      setSummary(data);
    } catch (err) {
      setError('Erreur lors du chargement du bilan financier');
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

  const hasData = summary && summary.purchaseCount > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Card title="Bilan financier" icon="💰">
        {!hasData ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-gray-500 text-lg mb-4">
              Aucune donnée financière disponible
            </p>
            <p className="text-gray-400">
              Commencez à ajouter des achats pour voir votre bilan
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-5xl">💵</span>
                  <div className="text-right">
                    <p className="text-sm opacity-90">Total dépensé</p>
                    <p className="text-3xl font-bold font-mono">
                      {summary.totalSpent.toFixed(2)} €
                    </p>
                  </div>
                </div>
                <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full animate-pulse"></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-accent-500 to-accent-600 text-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-5xl">🛍️</span>
                  <div className="text-right">
                    <p className="text-sm opacity-90">Nombre d'achats</p>
                    <p className="text-3xl font-bold font-mono">
                      {summary.purchaseCount}
                    </p>
                  </div>
                </div>
                <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full animate-pulse animate-delay-200"></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-5xl">📊</span>
                  <div className="text-right">
                    <p className="text-sm opacity-90">Prix moyen</p>
                    <p className="text-3xl font-bold font-mono">
                      {summary.averagePrice.toFixed(2)} €
                    </p>
                  </div>
                </div>
                <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full animate-pulse animate-delay-400"></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-5xl">⬆️</span>
                  <div className="text-right">
                    <p className="text-sm opacity-90">Achat le plus cher</p>
                    <p className="text-3xl font-bold font-mono">
                      {summary.mostExpensivePurchase.toFixed(2)} €
                    </p>
                  </div>
                </div>
                <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full animate-pulse animate-delay-600"></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-5xl">⬇️</span>
                  <div className="text-right">
                    <p className="text-sm opacity-90">Achat le moins cher</p>
                    <p className="text-3xl font-bold font-mono">
                      {summary.cheapestPurchase.toFixed(2)} €
                    </p>
                  </div>
                </div>
                <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full animate-pulse animate-delay-800"></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-5xl">📈</span>
                  <div className="text-right">
                    <p className="text-sm opacity-90">Écart de prix</p>
                    <p className="text-3xl font-bold font-mono">
                      {(summary.mostExpensivePurchase - summary.cheapestPurchase).toFixed(2)} €
                    </p>
                  </div>
                </div>
                <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full animate-pulse animate-delay-1000"></div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 p-8 rounded-2xl border-2 border-yellow-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📌</span>
                Analyse de vos dépenses
              </h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  • Vous avez effectué <strong className="text-primary-700">{summary.purchaseCount}</strong> achats
                  pour un total de <strong className="text-accent-700">{summary.totalSpent.toFixed(2)} €</strong>
                </p>
                <p>
                  • En moyenne, vous dépensez <strong className="text-green-700">{summary.averagePrice.toFixed(2)} €</strong> par achat
                </p>
                <p>
                  • Votre achat le plus important était de <strong className="text-orange-700">{summary.mostExpensivePurchase.toFixed(2)} €</strong>,
                  soit <strong>{((summary.mostExpensivePurchase / summary.averagePrice) * 100 - 100).toFixed(0)}%</strong> au-dessus de votre moyenne
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
