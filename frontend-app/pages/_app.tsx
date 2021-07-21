import { Box, ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { Footer } from '../components/Footer';
import { QueryClient, QueryClientProvider } from 'react-query';
import Container from "../components/Container";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Container title={pageProps.title} description={pageProps.description}>
            <Component/>
        </Container>
        <Box height={'6vh'}>
          <Footer />
        </Box>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
