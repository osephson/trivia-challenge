import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Entrance from '../components/Entrance';

describe('<Entrance />', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Entrance />
      </BrowserRouter>
    );
  });

  it('should display "BEGIN" link whose href if "/questions".', () => {
    const link = screen.getByText(/BEGIN/i);
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/questions');
  });

  it('should navigate to quiz page when click "BEGIN" link.', () => {
    const link = screen.getByText(/BEGIN/i);
    fireEvent.click(link);
    expect(window.location.pathname).toBe('/questions');
  });
});
