import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { purchaseService } from '../services/api';
import type { TopProduct } from '../types';

export default function TopProductPage() {
  const [topProduct, setTopProduct] = useState<TopProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTopProduct();
  }, []);

  const loadTopProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await purchaseService.getTopProduct();
      setTopProduct(data);
    } catch (err) {
      setError('Erreur lors du chargement du produit top');
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="bg-red-50 border-2 border-red-200">
          <p className="text-red-600 text-center">{error}</p>
        </Card>
      </div>
    );
  }

  const hasData = topProduct && topProduct.count > 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card title="Produit le plus acheté" icon="🏆">
        {!hasData ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-gray-500 text-lg mb-4">
              Aucune donnée disponible
            </p>
            <p className="text-gray-400">
              Ajoutez des achats pour voir vos statistiques
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center py-8 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl">
              <div className="text-7xl mb-4 animate-bounce">🏆</div>
              <h3 className="text-4xl font-display font-bold text-gray-900 mb-2">
                {topProduct.productName}
              </h3>
              <p className="text-gray-600 text-lg">
                Votre champion des achats !
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Nombre d'achats</p>
                    <p className="text-4xl font-bold font-mono">{topProduct.count}</p>
                  </div>
                  <div className="text-5xl">🔢</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Total dépensé</p>
                    <p className="text-4xl font-bold font-mono">
                      {topProduct.totalSpent.toFixed(2)} €
                    </p>
                  </div>
                  <div className="text-5xl">💰</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 font-semibold mb-1">Prix moyen par achat</p>
                  <p className="text-3xl font-bold text-primary-700">
                    {(topProduct.totalSpent / topProduct.count).toFixed(2)} €
                  </p>
                </div>
                <div className="text-4xl">📊</div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 <strong>Astuce:</strong> Ce produit représente votre article le plus fréquemment acheté.
                Considérez-vous pouvez optimiser vos dépenses ?
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
