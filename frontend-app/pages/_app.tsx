import {
  Box,
  ChakraProvider,
  extendTheme,
  ThemeConfig,
} from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { Footer } from '../components/Footer';
import { QueryClient, QueryClientProvider } from 'react-query';
import Container from '../components/Container';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};
const theme = extendTheme({ config: config });

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS theme={theme}>
        <Container title={pageProps.title} description={pageProps.description}>
          <Component {...pageProps} />
        </Container>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
