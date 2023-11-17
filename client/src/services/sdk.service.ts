export enum RoutePath {
  home = '/',
  favorites = '/favorites',
}

export interface Joke {
  id: number;
  value: string;
}

export enum EndpointPath {
  getRandomJoke = '/get-random-joke',
}
