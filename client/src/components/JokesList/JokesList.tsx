import { List, ListItem, Text, Box } from '@chakra-ui/react';

import { Joke } from '../../services/sdk.service';

interface JokesListProps {
  jokes: Joke[];
  descriptionText?: string;
  onJokeClick?: (joke: Joke) => void;
}

export const JokesList = ({
  jokes = [],
  descriptionText,
  onJokeClick,
}: JokesListProps) => {
  const handleJokeClick = (joke: Joke) => () => {
    onJokeClick?.(joke);
  };

  if (jokes.length === 0) {
    return <Box>No jokes for today</Box>;
  }

  return (
    <>
      {descriptionText}
      <List spacing={4}>
        {jokes.map(({ id, value }, idx) => {
          const lastIdx = jokes.length - 1;
          return (
            <ListItem
              key={id}
              data-testid={`joke_${id}`}
              borderBottom={idx === lastIdx ? 'none' : '1px solid #e2e8f0'}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              pb={4}
              cursor="pointer"
              onClick={handleJokeClick({ id, value })}
            >
              <Text flexGrow={1}>
                {idx + 1}: {value}
              </Text>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};
