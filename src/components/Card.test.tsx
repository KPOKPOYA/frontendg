import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from '../components/Card';

describe('Card Component', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <p>Test content</p>
      </Card>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(
      <Card title="Test Title">
        <p>Content</p>
      </Card>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(
      <Card title="Test" icon="🎉">
        <p>Content</p>
      </Card>
    );
    expect(screen.getByText('🎉')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Card className="custom-class">
        <p>Content</p>
      </Card>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders without title', () => {
    render(
      <Card>
        <p>Content only</p>
      </Card>
    );
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.getByText('Content only')).toBeInTheDocument();
  });
});
