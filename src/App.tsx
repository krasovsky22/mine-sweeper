import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Container,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import Node from '@/components/Tile';
import { Controls, PlayGrid } from './components';
import { useMst } from '@stores/Board';
import { observer } from 'mobx-react-lite';

function App() {
  const { gameIsLost, gameIsWon } = useMst();
  return (
    <Container
      minHeight="100vh"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <Flex flexDir="column" bgColor="gray.400" gap={1}>
        {gameIsLost && (
          <Alert status="error">
            <AlertTitle>Boom!</AlertTitle>
            <AlertDescription>You lost.</AlertDescription>
          </Alert>
        )}
        {gameIsWon && (
          <Alert status="success">
            <AlertIcon />
            Congrats. You won the game.
          </Alert>
        )}
        <Controls />
        <PlayGrid />
      </Flex>
    </Container>
  );
}

export default observer(App);
