import { act, render, screen } from '@testing-library/react';
import FavoritesPage from './favorites';

describe('Given the favorites page', () => {
  describe('When it is render', () => {
    test('Then it should return a heading', async () => {
      render(<FavoritesPage></FavoritesPage>);

      act(async () => {
        const element = await screen.findByRole('img');
        expect(element).toBeInTheDocument();
      });
    });
  });
});
