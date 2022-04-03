import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Notfound from '../components/Notfound';

describe('<Notfound />', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Notfound />
      </BrowserRouter>
    );
  });

  it('should display "GO HOME!" link whose href if "/".', () => {
    expect(screen.getByText('No content')).toBeInTheDocument();
    const link = screen.getByText(/GO HOME/i);
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/');
  });

  it('should navigate to home page when click "GO HOME!" link.', () => {
    const link = screen.getByText(/GO HOME/i);
    fireEvent.click(link);
    expect(window.location.pathname).toBe('/');
  });
});
