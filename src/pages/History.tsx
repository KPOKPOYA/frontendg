import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { purchaseService } from '../services/api';
import type { Purchase } from '../types';

export default function History() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPurchases();
  }, []);

  const loadPurchases = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await purchaseService.getAllPurchases();
      setPurchases(data);
    } catch (err) {
      setError('Erreur lors du chargement de l\'historique');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Card title="Historique des achats" icon="📜">
        {purchases.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-gray-500 text-lg mb-4">Aucun achat enregistré</p>
            <a
              href="/add"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              Ajouter votre premier achat
            </a>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Produit
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Prix
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {purchases.map((purchase) => (
                  <tr
                    key={purchase.id}
                    className="hover:bg-primary-50 transition-colors"
                  >
                    <td className="px-4 py-4 text-gray-900 font-medium">
                      {purchase.productName}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                        {purchase.price.toFixed(2)} €
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right text-gray-600">
                      {formatDate(purchase.purchaseDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Total des achats:</span>
                <span className="text-2xl font-bold text-primary-700">
                  {purchases.length}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-700 font-semibold">Montant total:</span>
                <span className="text-2xl font-bold text-accent-700">
                  {purchases.reduce((sum, p) => sum + p.price, 0).toFixed(2)} €
                </span>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
