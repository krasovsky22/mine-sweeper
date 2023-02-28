import { useMst } from '@stores/Board';
import { Button, Flex, Box } from '@chakra-ui/react';
import { SmileIcon, SadIcon, GlassesIcon } from '@components/Icons';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

let timer: number;

const Controls = () => {
  const { resetGame, gameIsLost, gameIsWon, number_of_mines } = useMst();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleResetClick = () => {
    setSeconds(0);
    resetGame();
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
        {number_of_mines.toString().padStart(3, '0')}
      </Box>
      <Button onClick={handleResetClick} size="md">
        {gameIsLost && <SadIcon />}
        {gameIsWon && <SmileIcon />}
        {!gameIsLost && !gameIsWon && <GlassesIcon />}
      </Button>
      <Box
        lineHeight="30px"
        fontSize="30px"
        bg="black"
        color="red"
        fontFamily="mono"
      >
        {seconds.toString().padStart(3, '0')}
      </Box>
    </Flex>
  );
};

export default observer(Controls);
