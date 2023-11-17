import { Card, CardBody, Box, useToast } from '@chakra-ui/react';
import { useCallback, useState } from 'react';

import { JokesList } from '../components/JokesList/JokesList';
import { Joke } from '../services/sdk.service';
import {
  FAVORITES_STORAGE_KEY,
  getSavedFavorites,
} from '../services/favorites.service';

export const FavoritesPage = () => {
  const jokes = getSavedFavorites();
  const toast = useToast();

  const [state, setState] = useState<Joke[]>(jokes);

  const handleJokeClick = useCallback(
    (joke: Joke) => {
      const savedJokes = getSavedFavorites();

      const filteredJokes = savedJokes.filter(({ id }) => id !== joke.id);

      setState(filteredJokes);

      localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(filteredJokes),
      );

      toast({
        title: 'Joke was successfully deleted',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    [toast],
  );

  return (
    <Box width="100%">
      <Card>
        <CardBody>
          <JokesList
            jokes={state}
            onJokeClick={handleJokeClick}
            descriptionText="Click joke to remove from favorites"
          />
        </CardBody>
      </Card>
    </Box>
  );
};
