import { TileType } from '@models/Tile';
import { Box, Flex } from '@chakra-ui/react';
import { ExplosionIcon, BombIcon } from '@components/Icons';
import { observer } from 'mobx-react-lite';
import { useMst } from '@stores/Board';

const Tile = ({ tile }: { tile: TileType }) => {
  const { gameIsLost } = useMst();

  const {
    isExploded,
    isOpenedSuccessfully,
    isMine,
    openTile,
    neighborMinesCount,
  } = tile;

  const renderContent = () => {
    if (isExploded) {
      return (
        <Flex
          width="100%"
          height="100%"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          bg="red.300"
        >
          <ExplosionIcon />
        </Flex>
      );
    }

    if (gameIsLost && isMine) {
      return (
        <Flex
          width="100%"
          height="100%"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
        >
          <BombIcon />
        </Flex>
      );
    }

    if (isOpenedSuccessfully) {
      return (
        <Box
          bg="white"
          width="100%"
          height="100%"
          borderColor="nodeBgColor"
          border="0.5px solid gray"
        />
      );
    }

    return neighborMinesCount;
  };

  return (
    <Flex
      cursor="pointer"
      bg="tomato"
      height="30px"
      width="30px"
      bgColor={isMine ? 'blue.300' : 'nodeBgColor'}
      boxShadow="inset 2px 2px 2px 0px rgb(255 255 255 / 84%), inset -2px -2px 2px 0px rgb(0 0 0 / 84%)"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      onClick={gameIsLost ? () => {} : openTile}
    >
      {renderContent()}
    </Flex>
  );
};

export default observer(Tile);
