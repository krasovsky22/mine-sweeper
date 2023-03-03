import { useMst } from '@stores/Board';
import { Button, Flex, Box } from '@chakra-ui/react';
import { SmileIcon, SadIcon, GlassesIcon, ScaryIcon } from '@components/Icons';
import { observer } from 'mobx-react-lite';

const Controls = () => {
  const {
    isScary,
    minutesLeft,
    secondsPlayed,
    resetGame,
    gameIsLost,
    gameIsWon,
  } = useMst();

  const renderResetButtonIcon = () => {
    if (gameIsLost) {
      return <SadIcon />;
    }

    if (gameIsWon) {
      return <SmileIcon />;
    }

    if (isScary) {
      return <ScaryIcon />;
    }

    return <GlassesIcon />;
  };

  return (
    <Flex
      px={5}
      my={3}
      alignItems="center"
      justifyContent="space-between"
      height="30px"
    >
      <Box
        lineHeight="30px"
        fontSize="30px"
        bg="black"
        color="red"
        fontFamily="mono"
      >
        {minutesLeft.toString().padStart(3, '0')}
      </Box>
      <Button onClick={resetGame} size="md">
        {renderResetButtonIcon()}
      </Button>
      <Box
        lineHeight="30px"
        fontSize="30px"
        bg="black"
        color="red"
        fontFamily="mono"
      >
        {secondsPlayed.toString().padStart(3, '0')}
      </Box>
    </Flex>
  );
};

export default observer(Controls);
