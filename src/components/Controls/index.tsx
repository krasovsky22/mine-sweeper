import { useMst } from '@stores/Board';
import { Button, Flex } from '@chakra-ui/react';
import { SmileIcon, SadIcon, GlassesIcon } from '@components/Icons';
import { observer } from 'mobx-react-lite';

const Controls = () => {
  const { resetGame, gameIsLost, gameIsWon } = useMst();
  return (
    <Flex px={5} my={3} alignItems="center" justifyContent="center">
      <Button onClick={resetGame} size="md">
        {gameIsLost && <SadIcon />}
        {gameIsWon && <SmileIcon />}
        {!gameIsLost && !gameIsWon && <GlassesIcon />}
      </Button>
    </Flex>
  );
};

export default observer(Controls);
