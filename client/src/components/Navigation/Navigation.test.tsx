import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navigation } from './Navigation';

describe('Navigation Component', () => {
  it('renders navigation links correctly', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navigation />
      </MemoryRouter>,
    );

    const jokesListLink = screen.getByTestId('link_page_list');
    const favoritesLink = screen.getByTestId('link_page_favorites');

    expect(jokesListLink).toBeInTheDocument();
    expect(jokesListLink).toHaveAttribute('href', '/');

    expect(favoritesLink).toBeInTheDocument();
    expect(favoritesLink).toHaveAttribute('href', '/favorites');
  });

  it('displays active tag when route matches', () => {
    render(
      <MemoryRouter initialEntries={['/favorites']}>
        <Navigation />
      </MemoryRouter>,
    );

    const activeIcon = screen.getByTestId('icon_page_favorites');

    expect(activeIcon).toBeInTheDocument();
  });
});
