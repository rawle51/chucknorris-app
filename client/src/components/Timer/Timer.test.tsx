import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { Timer } from './Timer';

jest.useFakeTimers();

describe('<Timer /> component', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  it('renders with initial time correctly', () => {
    render(<Timer interval={63} callback={() => {}} />);

    expect(screen.getByText('01:03')).toBeInTheDocument();
  });

  it('decrements time correctly', () => {
    render(<Timer interval={10} callback={() => {}} />);
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByText('00:05')).toBeInTheDocument();
  });

  it('executes callback when time reaches zero', () => {
    const mockCallback = jest.fn();

    render(<Timer interval={3} callback={mockCallback} />);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  it('restarts timer when reaching zero', () => {
    const mockCallback = jest.fn();

    render(<Timer interval={2} callback={mockCallback} />);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(screen.getByText('00:02')).toBeInTheDocument();
  });

  it('does not execute callback until time reaches zero', () => {
    const mockCallback = jest.fn();

    render(<Timer interval={5} callback={mockCallback} />);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('clears interval on unmount', () => {
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval');

    const { unmount } = render(<Timer interval={10} callback={() => {}} />);

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});
