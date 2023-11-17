import { render, fireEvent, act } from '@testing-library/react';
import { useToast } from '@chakra-ui/react';

import { HomePage } from '../Home.page';
import * as storeService from '../../services/store.service';
import * as favoritesService from '../../services/favorites.service';

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(),
}));

const mockJoke = { id: 1, value: 'Test Joke' };

describe('HomePage component', () => {
  let toastMock: jest.Mock;

  beforeEach(() => {
    jest.spyOn(storeService, 'useStoreContext').mockReturnValue({
      jokes: [mockJoke],
      setJoke: jest.fn(),
    });

    toastMock = jest.fn();
    (useToast as jest.Mock).mockReturnValue(toastMock);
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: jest.fn(),
        getItem: jest.fn(),
        removeItem: jest.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('adds a joke to favorites', async () => {
    const { getByTestId } = render(<HomePage />);

    const jokeToAdd = getByTestId('joke_1');
    fireEvent.click(jokeToAdd);

    await act(async () => {
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        favoritesService.FAVORITES_STORAGE_KEY,
        JSON.stringify([mockJoke]),
      );
    });
  });
});
