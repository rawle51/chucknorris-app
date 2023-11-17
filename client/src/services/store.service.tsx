import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  useMemo,
  useCallback,
} from 'react';
import { Joke } from './sdk.service';

const MAX_JOKES_IN_LIST = 10;

interface StoreContextShape {
  jokes: Joke[];
  setJoke: (joke: Joke) => void;
}

const StoreContext = createContext<StoreContextShape>({
  jokes: [],
  setJoke: () => {},
});

export const StoreContextProvider = ({
  children,
}: PropsWithChildren<unknown>) => {
  const [state, setState] = useState<Joke[]>([]);

  const handleSetJoke = useCallback((joke: Joke) => {
    setState((prevValue) => {
      if (prevValue.length === MAX_JOKES_IN_LIST) {
        prevValue.pop();
      }

      return [joke, ...prevValue];
    });
  }, []);

  const value = useMemo(
    () => ({
      jokes: state,
      setJoke: handleSetJoke,
    }),
    [state, handleSetJoke],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export function useStoreContext() {
  return useContext(StoreContext);
}
