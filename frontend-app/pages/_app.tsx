import { Box, ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { Footer } from '../components/Footer';
import { QueryClient, QueryClientProvider } from 'react-query';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Component />
        <Box height={'6vh'}>
          <Footer />
        </Box>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
