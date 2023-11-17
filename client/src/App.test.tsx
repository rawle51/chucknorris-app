import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('<App /> component', () => {
  it('renders app', () => {
    render(<App />);

    const element = screen.getByText('Jokes App');
    expect(element).toBeInTheDocument();
  });
});
