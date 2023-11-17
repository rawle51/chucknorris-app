import { useCallback } from 'react';
import { Card, CardHeader, CardBody, Box, useToast } from '@chakra-ui/react';

import { JokesList } from '../components/JokesList/JokesList';
import { Timer } from '../components/Timer/Timer';
import { useStoreContext } from '../services/store.service';
import { EndpointPath, Joke } from '../services/sdk.service';
import {
  FAVORITES_STORAGE_KEY,
  getSavedFavorites,
} from '../services/favorites.service';

const MAX_FAVORITE_JOKES = 10;

export const HomePage = () => {
  const toast = useToast();
  const { jokes, setJoke } = useStoreContext();

  const fetchNewJoke = useCallback(async () => {
    try {
      const data = await fetch(EndpointPath.getRandomJoke);
      const joke: Joke = await data.json();

      setJoke(joke);
    } catch (error) {
      toast({
        title: 'Data fetching error',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [setJoke, toast]);

  const handleJokeClick = useCallback(
    (joke: Joke) => {
      const savedJokes = getSavedFavorites();
      const wasAdded = savedJokes.find(({ id }) => id === joke.id);

      if (savedJokes.length >= MAX_FAVORITE_JOKES) {
        toast({
          title: 'Maximum favorite jokes limit exceeded',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      if (wasAdded) {
        toast({
          title: 'Joke was already saved before',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify([joke, ...savedJokes]),
      );

      toast({
        title: 'Joke was successfully saved',
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
        <CardHeader>
          <Timer interval={5} callback={fetchNewJoke} />
        </CardHeader>
        <CardBody>
          <JokesList
            jokes={jokes}
            onJokeClick={handleJokeClick}
            descriptionText="Click joke to add to favorites"
          />
        </CardBody>
      </Card>
    </Box>
  );
};
