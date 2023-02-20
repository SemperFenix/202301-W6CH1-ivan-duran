import { render, screen } from '@testing-library/react';
import FavoritesPage from './favorites';

describe('Given the favorites page', () => {
  describe('When it is render', () => {
    test('Then it should return a heading', () => {
      render(<FavoritesPage></FavoritesPage>);
      const element = screen.getByRole('heading');
      expect(element).toBeInTheDocument();
    });
  });
});
