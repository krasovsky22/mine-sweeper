import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import App from './App';
import { boardStore, Provider } from '@stores/Board';

import './index.css';
const theme = extendTheme({
  colors: {
    nodeBgColor: '#cdd0d1',
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider value={boardStore}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
