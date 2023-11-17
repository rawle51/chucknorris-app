import { Card, CardBody, Box } from '@chakra-ui/react';
import { useState } from 'react';

import { JokesList } from '../components/JokesList/JokesList';
import { Joke } from '../services/sdk.service';
import {
  FAVORITES_STORAGE_KEY,
  getSavedFavorites,
} from '../services/favorites.service';

export const FavoritesPage = () => {
  const jokes = getSavedFavorites();

  const [state, setState] = useState<Joke[]>(jokes);

  const handleJokeClick = (joke: Joke) => {
    const savedJokes = getSavedFavorites();

    const filteredJokes = savedJokes.filter(({ id }) => id !== joke.id);

    setState(filteredJokes);

    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(filteredJokes));
  };

  return (
    <Box width="100%">
      <Card>
        <CardBody>
          <JokesList
            jokes={state}
            onJokeClick={handleJokeClick}
            descriptionText="Click to remove from favorites"
          />
        </CardBody>
      </Card>
    </Box>
  );
};
