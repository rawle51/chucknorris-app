import { fireEvent, render, screen } from '@testing-library/react';

import { JokesList } from './JokesList';

describe('<JokesList /> component', () => {
  it('renders "No jokes for today" when no jokes are provided', () => {
    render(<JokesList jokes={[]} />);

    expect(screen.getByText('No jokes for today')).toBeInTheDocument();
  });

  it('renders jokes correctly when jokes are provided', () => {
    const jokes = [
      { id: 1, value: 'Joke 1' },
      { id: 2, value: 'Joke 2' },
    ];
    render(<JokesList jokes={jokes} />);
    jokes.forEach((joke) => {
      expect(screen.getByText(joke.value)).toBeInTheDocument();
    });
  });

  it('calls onJokeClick when a joke item is clicked', () => {
    const mockJokes = [
      { id: 1, value: 'Joke 1' },
      { id: 2, value: 'Joke 2' },
    ];
    const mockOnJokeClick = jest.fn();

    const { getByTestId } = render(
      <JokesList jokes={mockJokes} onJokeClick={mockOnJokeClick} />,
    );

    mockJokes.forEach(({ id }, idx) => {
      const jokeItem = getByTestId(`joke_${id}`);
      fireEvent.click(jokeItem);
      expect(mockOnJokeClick).toHaveBeenCalledWith(mockJokes[idx]);
    });

    expect(mockOnJokeClick).toHaveBeenCalledTimes(2);
  });
});
