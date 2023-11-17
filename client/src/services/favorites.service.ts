import { Joke } from './sdk.service';

export const FAVORITES_STORAGE_KEY = 'favorites';

export function getSavedFavorites(): Joke[] {
  const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
  const savedJokes: Joke[] = savedFavorites ? JSON.parse(savedFavorites) : [];

  return savedJokes;
}
