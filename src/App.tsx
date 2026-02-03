import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import AddPurchase from './pages/AddPurchase';
import History from './pages/History';
import TopProduct from './pages/TopProduct';
import FinancialSummary from './pages/FinancialSummary';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddPurchase />} />
          <Route path="/history" element={<History />} />
          <Route path="/top" element={<TopProduct />} />
          <Route path="/summary" element={<FinancialSummary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
