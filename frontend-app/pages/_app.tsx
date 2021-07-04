import { Box, ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { Footer } from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component />
      <Box height={'6vh'}>
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
