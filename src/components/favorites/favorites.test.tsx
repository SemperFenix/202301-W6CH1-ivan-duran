import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { PhotosContext } from '../../context/photos.context';
import { mockContext } from '../../mocks/tests.mocks';
import { Favorites } from './favorites';

describe('Given Gallery component', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <PhotosContext.Provider value={mockContext}>
        <Favorites></Favorites>
      </PhotosContext.Provider>
    );
  });

  describe('When it is rendering after call', () => {
    test('Then it should be return an image', async () => {
      act(async () => {
        const element = await screen.findAllByRole('img');
        expect(element.length).toBe(1);
      });
    });
  });
});
