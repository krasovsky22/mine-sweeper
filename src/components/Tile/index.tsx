import { observer } from 'mobx-react-lite';
import { Box, Flex, Text } from '@chakra-ui/react';

import { useMst } from '@stores/Board';
import { TileType } from '@models/Tile';
import { ExplosionIcon, BombIcon, FlagIcon } from '@components/Icons';

const minesCountToColor = (count: number) => {
  if (count > 2) {
    return 'red.500';
  }

  if (count > 1) {
    return 'green.500';
  }

  return 'blue.500';
};

const Tile = ({ tile }: { tile: TileType }) => {
  const { actionsDisabled, toggleIsScary } = useMst();

  const {
    isMine,
    openTile,
    isFlagged,
    isExploded,
    toggleIsFlagged,
    neighborMinesCount,
    isOpenedSuccessfully,
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

    if (actionsDisabled && isMine) {
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
        >
          {neighborMinesCount > 0 && (
            <Text textColor={minesCountToColor(neighborMinesCount)}>
              {neighborMinesCount}
            </Text>
          )}
        </Box>
      );
    }

    if (isFlagged) {
      return (
        <Flex
          width="100%"
          height="100%"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
        >
          <FlagIcon />
        </Flex>
      );
    }

    return null;
  };

  return (
    <Flex
      cursor="pointer"
      bg="tomato"
      height="30px"
      width="30px"
      bgColor={'nodeBgColor'}
      boxShadow="inset 2px 2px 2px 0px rgb(255 255 255 / 84%), inset -2px -2px 2px 0px rgb(0 0 0 / 84%)"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      onClick={actionsDisabled ? () => {} : openTile}
      onMouseDown={toggleIsScary}
      onMouseUp={toggleIsScary}
      onContextMenu={(event) => {
        event.preventDefault();
        toggleIsFlagged();
      }}
    >
      {renderContent()}
    </Flex>
  );
};

export default observer(Tile);
