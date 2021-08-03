import {
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  Img,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Spinner,
  Text,
  useColorModeValue as mode,
  useToast,
  useToken,
} from '@chakra-ui/react';
import * as React from 'react';
import { axiosClient } from '../../api/api';
import { useQuery } from 'react-query';
import { ChakraNextLink } from '../../components/ChrakraNextLink';

const UploadDetailLine = ({
  title,
  value,
  isLoaded,
  href,
}: {
  title: string;
  value: string | React.ReactNode;
  isLoaded: boolean;
  href?: string;
}) => (
  <Flex py={1}>
    <Box color={'gray.50'} whiteSpace={'pre'}>
      {title}
    </Box>
    <Box mx={1}>:</Box>
    {href ? (
      <ChakraNextLink href={href} whiteSpace={'pre'}>
        <Skeleton minW={'200px'} height={'15px'} mt={1} isLoaded={isLoaded}>
          {isLoaded ? value : 'loading'}
        </Skeleton>
      </ChakraNextLink>
    ) : (
      <Box whiteSpace={'pre'}>{value}</Box>
    )}
  </Flex>
);

export default function UploadDetail({ id }: { id: string }) {
  const toast = useToast();

  const { data, isLoading } = useQuery(
    ['mint', { id: id }],
    async () => {
      const res = await axiosClient.get(`/mint/${id}`);
      return res.data;
    },
    {
      onError: (error: any) => {
        const title = error?.response?.data?.message;
        toast({
          title: title,
          position: 'top-right',
          status: 'error',
          isClosable: true,
        });
      },
      refetchInterval: 5000,
      refetchIntervalInBackground: true,
    }
  );

  const [red100, blue200] = useToken(
    // the key within the theme, in this case `theme.colors`
    'colors',
    // the subkey(s), resolving to `theme.colors.red.100`
    ['red.100', 'blue.200']
    // a single fallback or fallback array matching the length of the previous arg
  );

  const isDetailLoading = isLoading || data?.status === 'mint_created';

  return (
    <Box as="section" bg={mode('gray.50', 'gray.800')} pt={[2, 24, 36]} pb="24">
      <Box
        maxW={{ base: 'xl', md: '7xl' }}
        mx="auto"
        px={{ base: '4', md: '6' }}
      >
        <SimpleGrid columns={[1, 1, 1, 2]} justifyItems={'stretch'} h={'100%'}>
          <Box flex="1" height={'100%'}>
            <Text
              size="xs"
              textTransform="uppercase"
              fontWeight="semibold"
              textAlign={['center', 'left']}
              color={mode('blue.600', 'white')}
              letterSpacing="wide"
            >
              NFT on cardano
            </Text>
            <Heading
              as="h1"
              p={0}
              m={0}
              size="2xl"
              color={mode('blue.600', 'blue.300')}
              fontWeight="extrabold"
              letterSpacing="tight"
            >
              {data?.assetName}
            </Heading>

            <Skeleton isLoaded={!isLoading} borderRadius={'2xl'} he>
              <Box
                px={2}
                mr={2}
                py={2}
                fontFamily={'mono'}
                overflow={['auto']}
                css={{
                  '&::-webkit-scrollbar': {
                    height: '12px',
                  },
                  '&::-webkit-scrollbar-track': {
                    height: '12px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: blue200,
                    borderRadius: '5px',
                  },
                }}
                color={mode('gray.600', 'gray.400')}
                borderTopLeftRadius={'2xl'}
                borderBottomLeftRadius={'2xl'}
                mt="4"
                fontSize="lg"
                fontWeight="medium"
              >
                <UploadDetailLine
                  title={'Id'}
                  value={data?.id}
                  isLoaded={!isDetailLoading}
                />
                <UploadDetailLine
                  title={'Status'}
                  isLoaded={!isDetailLoading}
                  value={
                    <Badge
                      ml="1"
                      fontSize="0.8em"
                      colorScheme={
                        data?.status === 'mint_created'
                          ? 'blue'
                          : data?.status === 'mint_success'
                          ? 'green'
                          : 'red'
                      }
                    >
                      {data?.status}
                    </Badge>
                  }
                />
                <UploadDetailLine
                  title={'Asset name'}
                  isLoaded={!isDetailLoading}
                  value={data?.assetName}
                />

                <UploadDetailLine
                  title={'Arweave id'}
                  isLoaded={!isDetailLoading}
                  value={data?.arweaveId}
                  href={data?.arweaveLink}
                />
                <UploadDetailLine
                  title={'Ipfsh hash'}
                  isLoaded={!isDetailLoading}
                  value={data?.ipfsHash}
                />
                <UploadDetailLine
                  title={'Cardano transaction id'}
                  isLoaded={!isDetailLoading}
                  value={data?.cardanoTransaction}
                  href={data?.cardanoTransactionLink}
                />
                {data?.metadata && (
                  <UploadDetailLine
                    isLoaded={!isDetailLoading}
                    title={'Metadata'}
                    value={JSON.stringify(data?.metadata)}
                  />
                )}
              </Box>
            </Skeleton>
          </Box>

          <Skeleton isLoaded={!isDetailLoading}>
            <Img
              pt={[2, 2, 2, 0]}
              marginLeft={[0, 0, 0, 5]}
              fallback={<Spinner />}
              pos="relative"
              zIndex="1"
              maxW={'100%'}
              maxH={'650px'}
              objectFit="contain"
              src={data?.arweaveLink}
            />
          </Skeleton>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
UploadDetail.getInitialProps = async ({ query }: { query: any }) => {
  const { id } = query;
  console.log(query, 'wtf');
  return {
    id: id,
    title: 'Your NFT upload to cardano',
    description: 'Your NFT upload to cardano with cardano-nft-maker',
  };
};
