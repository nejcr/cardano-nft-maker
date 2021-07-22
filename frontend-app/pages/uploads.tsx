import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Img,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  SimpleGrid,
  Stack,
  VStack,
} from '@chakra-ui/react';
import * as React from 'react';
import { useMintedUploads } from '../api/api';
import { Head } from 'next/document';
import { FiCopy } from 'react-icons/fi';
import { CgArrowsExpandUpRight } from 'react-icons/cg';

export default function Uploads() {
  const { data, isLoading } = useMintedUploads();

  return (
    <>
      <Popover>
        <SimpleGrid
          p={[6, 12]}
          columns={[1, 5]}
          spacing={[6, 12]}
          bg="blue.800"
          color="white"
          h={'100%'}
        >
          {data?.map((upload: any) => (
            <Box
              bg={'whiteAlpha.100'}
              borderRadius={'2xl'}
              height={'280px'}
              width={'380px'}
              boxShadow={'2xl'}
            >
              <Box position={'relative'}>
                <Box
                  right={3}
                  top={3}
                  as={CgArrowsExpandUpRight}
                  position={'absolute'}
                />
                <Img
                  src={upload?.ipfsLink}
                  height={'150px'}
                  objectFit={'fill'}
                  borderTopRadius={'2xl'}
                  width={'100%'}
                />
              </Box>

              <VStack p={6} justifyContent={'space-between'} height={'130px'}>
                <Box>
                  <Flex>
                    <Heading
                      size={'xs'}
                      fontWeight={'bolder'}
                      color={'gray.500'}
                      alignItems={'flex-start'}
                      w={'100%'}
                    >
                      Cardano nft maker
                    </Heading>
                  </Flex>

                  <Flex>
                    <Heading isTruncated maxW={'310px'} size={'md'}>
                      {upload?.id}
                    </Heading>
                    <Box as={FiCopy} mt={1} />
                  </Flex>
                </Box>

                <Stack
                  justifyContent={'space-between'}
                  direction="row"
                  w={'100%'}
                >
                  <Button
                    size={'sm'}
                    rightIcon={<FiCopy />}
                    colorScheme="teal"
                    variant="solid"
                  >
                    IPFS
                  </Button>
                  <Button
                    size={'sm'}
                    rightIcon={<FiCopy />}
                    colorScheme="whiteAlpha"
                    variant="solid"
                  >
                    Arweawe
                  </Button>
                  <Button
                    size={'sm'}
                    rightIcon={<FiCopy />}
                    colorScheme="blue"
                    variant="solid"
                  >
                    Cardano
                  </Button>
                </Stack>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Confirmation!</PopoverHeader>
          <PopoverBody>
            Are you sure you want to have that milkshake?
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
Uploads.getInitialProps = async () => {
  return {
    title: 'Your NFT upload to cardano',
    description: 'Your NFT upload to cardano with cardano-nft-maker',
  };
};
