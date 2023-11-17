import { render, fireEvent } from '@testing-library/react';
import { useToast } from '@chakra-ui/react';

import { FavoritesPage } from '../Favorites.page';
import * as FavoritesService from '../../services/favorites.service';
import { Joke } from '../../services/sdk.service';

jest.mock('../../services/favorites.service');

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(),
}));

describe('<Favorites.page /> component', () => {
  const mockJokes: Joke[] = [
    { id: 1, value: 'Joke 1' },
    { id: 2, value: 'Joke 2' },
  ];

  beforeEach(() => {
    (FavoritesService.getSavedFavorites as jest.Mock).mockReturnValue(
      mockJokes,
    );
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: jest.fn(),
        getItem: jest.fn(),
        removeItem: jest.fn(),
      },
      writable: true,
    });
  });

  it('deletes a joke from favorites', () => {
    const toastMock = jest.fn();
    (useToast as jest.Mock).mockReturnValue(toastMock);

    const { getByTestId } = render(<FavoritesPage />);

    const jokeToDelete = getByTestId('joke_1');
    fireEvent.click(jokeToDelete);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      FavoritesService.FAVORITES_STORAGE_KEY,
      JSON.stringify([{ id: 2, value: 'Joke 2' }]),
    );

    expect(toastMock).toHaveBeenCalledWith({
      title: 'Joke was successfully deleted',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  });
});
