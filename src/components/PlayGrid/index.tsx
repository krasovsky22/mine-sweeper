import { SimpleGrid } from '@chakra-ui/react';

import { Tile } from '@components';
import { useMst } from '@stores/Board';

const PlayGrid = () => {
  const { tiles } = useMst();
  return (
    <SimpleGrid px={5} paddingBottom={5} columns={16}>
      {tiles.map((tile) => (
        <Tile key={tile.id} tile={tile} />
      ))}
    </SimpleGrid>
  );
};

export default PlayGrid;
