import { render, screen } from '@testing-library/react';
import NewItemPage from './new.item';

describe('Given the new item page', () => {
  describe('When it is render', () => {
    test('Then it should return a heading', () => {
      render(<NewItemPage></NewItemPage>);
      const element = screen.getAllByRole('textbox');
      element.forEach((item) => expect(item).toBeInTheDocument());
    });
  });
});
