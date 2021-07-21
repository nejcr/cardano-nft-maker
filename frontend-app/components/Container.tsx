import Head from 'next/head';
import { IntroSection } from '../components/IntroSection';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  SimpleGrid,
  Skeleton,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import useBalance from '../api/api';
import { WalletInfo } from './WalletInfo';
import React from 'react';
import { ChakraNextLink } from './ChrakraNextLink';
import { useRouter } from 'next/router';

export type ContainerProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};
export default function Container({
  title,
  description,
  children,
}: ContainerProps) {
  const router = useRouter();
  const { data, isLoading,isFetching,isPreviousData, isError } = useBalance();
  const isLoaded = !isLoading && !isError
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box height={'94vh'}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WalletInfo walletData={data} isOpen={isOpen} onClose={onClose} />
      <SimpleGrid
        columns={[1, 2]}
        height={['13%', '5%']}
        bg={useColorModeValue('gray.50', 'inherit')}
        alignItems={'center'}
        justifyItems={'center'}
      >

        {router?.pathname === '/uploads' ? (
          <Heading size={'md'} as={ChakraNextLink} href={'/'}>
            Go to upload
          </Heading>
        ) : (
          <Heading size={'md'} as={ChakraNextLink} href={'/uploads'}>
            My Uploads
          </Heading>
        )}

        <Box>
          <ButtonGroup isAttached onClick={onOpen}>
            <Button colorScheme={'blue'}>
              <Flex>
                <Skeleton isLoaded={isLoaded}>
                  {Number(data?.cardano?.adaAmount)?.toFixed(3)}
                </Skeleton>
                <Box ml={2}>ADA</Box>
              </Flex>
            </Button>
            <Button colorScheme={'blue'} variant={'outline'}>
              <Flex>
                <Skeleton isLoaded={isLoaded}>
                  {Number(data?.arweave?.arweaveBalance)?.toFixed(3)}
                </Skeleton>
                <Box ml={2}>ARW</Box>
              </Flex>
            </Button>
          </ButtonGroup>
        </Box>
      </SimpleGrid>
      <Box bg={useColorModeValue('gray.50', 'inherit')} height={['87%', '95%']}>
        {children}
      </Box>
    </Box>
  );
}
