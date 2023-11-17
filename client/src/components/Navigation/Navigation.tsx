import { Link, useLocation } from 'react-router-dom';
import { Tag, TagLabel, Flex, TagRightIcon } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

import { RoutePath } from '../../services/sdk.service';

const pages = [
  {
    id: 'page_list',
    title: 'Jokes list',
    to: RoutePath.home,
    colorScheme: 'blue',
  },
  {
    id: 'page_favorites',
    title: 'Favorites',
    to: RoutePath.favorites,
    colorScheme: 'pink',
  },
];

export const Navigation = () => {
  const { pathname } = useLocation();

  return (
    <Flex gap={4} mb={8}>
      {pages.map(({ id, title, to, colorScheme }) => (
        <Tag
          key={id}
          size="lg"
          borderRadius="full"
          variant="solid"
          colorScheme={colorScheme}
          data-testid={`tag_${id}`}
        >
          <Link data-testid={`link_${id}`} to={to}>
            <TagLabel>{title}</TagLabel>
          </Link>
          {pathname === to && (
            <TagRightIcon data-testid={`icon_${id}`} as={StarIcon} />
          )}
        </Tag>
      ))}
    </Flex>
  );
};
