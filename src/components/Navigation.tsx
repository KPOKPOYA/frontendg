import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();

  const links = [
    { path: '/', label: 'Tableau de bord', icon: '📊' },
    { path: '/add', label: 'Ajouter', icon: '➕' },
    { path: '/history', label: 'Historique', icon: '📜' },
    { path: '/top', label: 'Top Produit', icon: '🏆' },
    { path: '/summary', label: 'Bilan', icon: '💰' },
  ];

  return (
    <nav className="bg-gradient-to-r from-primary-600 to-accent-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <span className="text-3xl">🛒</span>
            <h1 className="text-white text-xl font-display font-bold">
              Purchase Tracker
            </h1>
          </div>
          
          <div className="flex space-x-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-white text-primary-600 shadow-md transform scale-105'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <span className="mr-1">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
