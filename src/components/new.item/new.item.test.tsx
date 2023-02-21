import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PhotosContext } from '../../context/photos.context';
import { mockContext } from '../../mocks/tests.mocks';
import { NewItem } from './new.item';

describe('Given the New Item component', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <PhotosContext.Provider value={mockContext}>
        <NewItem />
      </PhotosContext.Provider>
    );
  });
  describe('When submitted', () => {
    test('Then it should call the create new Photo method', () => {
      const element = screen.getByTestId('photo-form');

      fireEvent.submit(element);
      expect(mockContext.createPhoto).toHaveBeenCalled();
    });
  });
});
