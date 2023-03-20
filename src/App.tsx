import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import queryClient from '@/lib/queryClient';
import { worker } from '@/mocks/browser';
import { theme } from '@/lib/styles/theme';
import Router from './Router';
import { IS_MOCK } from './constants/config';

if (IS_MOCK) {
  worker.start();
}

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Router />
        </ChakraProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
