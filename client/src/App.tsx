import { Flex, Heading, Center, Container } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { RoutePath } from './services/sdk.service';
import { HomePage } from './pages/Home.page';
import { FavoritesPage } from './pages/Favorites.page';
import { Navigation } from './components/Navigation/Navigation';

export const App = () => (
  <Container minHeight="100vh" minWidth="100vw">
    <Flex flexDirection="column" alignItems="center">
      <Center mb="8">
        <Heading as="h1" size="xl" padding={4} display="flex" gap={4}>
          Jokes App test
        </Heading>
      </Center>

      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path={RoutePath.home} Component={HomePage} />
          <Route path={RoutePath.favorites} Component={FavoritesPage} />
        </Routes>
      </BrowserRouter>
    </Flex>
  </Container>
);
