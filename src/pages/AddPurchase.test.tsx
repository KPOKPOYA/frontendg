import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import AddPurchase from '../pages/AddPurchase';
import { purchaseService } from '../services/api';

vi.mock('../services/api', () => ({
  purchaseService: {
    createPurchase: vi.fn(),
  },
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('AddPurchase Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <AddPurchase />
      </BrowserRouter>
    );
  };

  it('renders form with all fields', () => {
    renderComponent();
    
    expect(screen.getByLabelText(/nom du produit/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/prix/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date d'achat/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ajouter l'achat/i })).toBeInTheDocument();
  });

  it('shows validation error for empty product name', async () => {
    const user = userEvent.setup();
    renderComponent();
    
    const submitButton = screen.getByRole('button', { name: /ajouter l'achat/i });
    await user.click(submitButton);
    
    expect(await screen.findByText(/le nom du produit est requis/i)).toBeInTheDocument();
  });

  it('shows validation error for negative price', async () => {
    const user = userEvent.setup();
    renderComponent();
    
    const priceInput = screen.getByLabelText(/prix/i);
    await user.clear(priceInput);
    await user.type(priceInput, '-10');
    
    const submitButton = screen.getByRole('button', { name: /ajouter l'achat/i });
    await user.click(submitButton);
    
    expect(await screen.findByText(/le prix doit être positif/i)).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    const mockPurchase = {
      id: 1,
      productName: 'Test Product',
      price: 99.99,
      purchaseDate: '2024-01-15',
      createdAt: '2024-01-15T10:00:00Z',
    };

    vi.mocked(purchaseService.createPurchase).mockResolvedValue(mockPurchase);
    
    renderComponent();
    
    const nameInput = screen.getByLabelText(/nom du produit/i);
    const priceInput = screen.getByLabelText(/prix/i);
    const dateInput = screen.getByLabelText(/date d'achat/i);
    
    await user.type(nameInput, 'Test Product');
    await user.clear(priceInput);
    await user.type(priceInput, '99.99');
    await user.type(dateInput, '2024-01-15');
    
    const submitButton = screen.getByRole('button', { name: /ajouter l'achat/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(purchaseService.createPurchase).toHaveBeenCalledWith({
        productName: 'Test Product',
        price: 99.99,
        purchaseDate: '2024-01-15',
      });
    });
  });

  it('shows success message after submission', async () => {
    const user = userEvent.setup();
    vi.mocked(purchaseService.createPurchase).mockResolvedValue({
      id: 1,
      productName: 'Test',
      price: 50,
      purchaseDate: '2024-01-15',
      createdAt: '2024-01-15T10:00:00Z',
    });
    
    renderComponent();
    
    await user.type(screen.getByLabelText(/nom du produit/i), 'Test');
    await user.clear(screen.getByLabelText(/prix/i));
    await user.type(screen.getByLabelText(/prix/i), '50');
    await user.type(screen.getByLabelText(/date d'achat/i), '2024-01-15');
    await user.click(screen.getByRole('button', { name: /ajouter l'achat/i }));
    
    expect(await screen.findByText(/achat ajouté avec succès/i)).toBeInTheDocument();
  });
});
