import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { purchaseService } from '../services/api';
import type { CreatePurchase } from '../types';

export default function AddPurchase() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreatePurchase>({
    productName: '',
    price: 0,
    purchaseDate: new Date().toISOString().split('T')[0],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.productName.trim()) {
      newErrors.productName = 'Le nom du produit est requis';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Le prix doit être positif';
    }

    if (!formData.purchaseDate) {
      newErrors.purchaseDate = 'La date est requise';
    } else {
      const date = new Date(formData.purchaseDate);
      if (date > new Date()) {
        newErrors.purchaseDate = 'La date ne peut pas être dans le futur';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);
      await purchaseService.createPurchase(formData);
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/history');
      }, 1500);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erreur lors de l\'ajout';
      setErrors({ submit: Array.isArray(message) ? message.join(', ') : message });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="bg-green-50 border-2 border-green-200 text-center">
          <div className="py-8">
            <div className="text-6xl mb-4 animate-bounce">✅</div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              Achat ajouté avec succès !
            </h2>
            <p className="text-green-600">Redirection vers l'historique...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Card title="Ajouter un achat" icon="➕">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="productName" className="block text-sm font-semibold text-gray-700 mb-2">
              Nom du produit *
            </label>
            <input
              id="productName"
              type="text"
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                errors.productName
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-primary-500 focus:ring-primary-200'
              }`}
              placeholder="Ex: iPhone 15 Pro"
            />
            {errors.productName && (
              <p className="mt-2 text-sm text-red-600 animate-fade-in">⚠️ {errors.productName}</p>
            )}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
              Prix (€) *
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price || ''}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                errors.price
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-primary-500 focus:ring-primary-200'
              }`}
              placeholder="99.99"
            />
            {errors.price && (
              <p className="mt-2 text-sm text-red-600 animate-fade-in">⚠️ {errors.price}</p>
            )}
          </div>

          <div>
            <label htmlFor="purchaseDate" className="block text-sm font-semibold text-gray-700 mb-2">
              Date d'achat *
            </label>
            <input
              id="purchaseDate"
              type="date"
              value={formData.purchaseDate}
              onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
              max={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                errors.purchaseDate
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-primary-500 focus:ring-primary-200'
              }`}
            />
            {errors.purchaseDate && (
              <p className="mt-2 text-sm text-red-600 animate-fade-in">⚠️ {errors.purchaseDate}</p>
            )}
          </div>

          {errors.submit && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl animate-fade-in">
              <p className="text-red-600 text-sm">⚠️ {errors.submit}</p>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-accent-700 focus:outline-none focus:ring-4 focus:ring-primary-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Ajout en cours...
                </span>
              ) : (
                '✓ Ajouter l\'achat'
              )}
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-200"
            >
              Annuler
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
