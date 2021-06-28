import { ChakraProvider } from "@chakra-ui/react"
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ChakraProvider>
        <Component />
      </ChakraProvider>
  )
}

export default MyApp
