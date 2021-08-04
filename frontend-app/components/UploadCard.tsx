import {
  Box,
  Button,
  Flex,
  Heading,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useClipboard,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { CgArrowsExpandUpRight } from 'react-icons/cg';
import { FiCopy } from 'react-icons/fi';
import * as React from 'react';
import { useState } from 'react';
import { ChakraNextLink } from './ChrakraNextLink';

export type UploadCardProps = {
  id: string;
  assetName: string;
  arweaveLink: string;
  cardanoTransaction: string;
  ipfsLink: string;
};

export const UploadCard = (upload: UploadCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [state, setState] = useState('');
  const { onCopy } = useClipboard(state);
  const onCopyValue = (value: string) => {
    setState(value);
    onCopy();
  };

  return (
    <Box>
      <Modal size={'3xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Info about NFT</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              p={3}
              bg={'gray.300'}
              fontFamily={'mono'}
              whiteSpace={'pre'}
              overflowX={'scroll'}
            >
              <Flex>
                <Box mr={2}>Id: </Box>
                <Box fontWeight={'bold'}>{upload.id}</Box>
              </Flex>
              <Flex py={1}>
                <Box mr={2}>Arweave Link: </Box>
                <ChakraNextLink href={upload.arweaveLink} fontWeight={'bold'}>
                  {upload.arweaveLink}
                </ChakraNextLink>
              </Flex>
              <Flex py={2}>
                <Box mr={2}>Cardano Transaction: </Box>
                <ChakraNextLink
                  href={upload.cardanoTransaction}
                  fontWeight={'bold'}
                >
                  {upload.cardanoTransaction}
                </ChakraNextLink>
              </Flex>
              <Flex>
                <Box mr={2}>Ipfs link: </Box>
                <ChakraNextLink href={upload.ipfsLink} fontWeight={'bold'}>
                  {upload.ipfsLink}
                </ChakraNextLink>
              </Flex>
            </Box>
            <Img
              overflowX={'scroll'}
              objectFit={'contain'}
              src={upload?.arweaveLink}
              width={'100%'}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box
        bg={'gray.800'}
        borderRadius={'2xl'}
        boxShadow={'2xl'}
        height={'280px'}
      >
        <Box position={'relative'}>
          <Box
            onClick={onOpen}
            right={3}
            top={3}
            as={CgArrowsExpandUpRight}
            position={'absolute'}
          />
          <Img
            src={upload?.arweaveLink}
            height={'150px'}
            objectFit={'contain'}
            borderTopRadius={'2xl'}
            width={'100%'}
          />
        </Box>

        <VStack p={6} justifyContent={'space-between'} height={'130px'}>
          <Box width={'100%'}>
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

            <Flex justifyContent={'space-between'}>
              <Heading
                as={ChakraNextLink}
                href={'/uploads/' + upload.id}
                isTruncated
                maxW={['280px', '250px', '250px', '680px']}
                color={'white'}
                py={0.5}
                textDecoration={'underline'}
                fontSize={'22px'}
              >
                {upload?.assetName}
              </Heading>
              <Box
                as={FiCopy}
                onClick={() => onCopyValue(upload?.id)}
                cursor={'pointer'}
                mt={1}
              />
            </Flex>
          </Box>

          <Stack justifyContent={'space-between'} direction="row" w={'100%'}>
            <Button
              size={'sm'}
              rightIcon={<FiCopy />}
              onClick={() => onCopyValue(upload?.ipfsLink)}
              colorScheme="teal"
              variant="solid"
            >
              IPFS
            </Button>
            <Button
              size={'sm'}
              rightIcon={<FiCopy />}
              color={'white'}
              onClick={() => onCopyValue(upload?.arweaveLink)}
              variant="solid"
            >
              Arweawe
            </Button>
            <Button
              size={'sm'}
              rightIcon={<FiCopy />}
              onClick={() => onCopyValue(upload?.cardanoTransaction)}
              colorScheme="blue"
              variant="solid"
            >
              Cardano
            </Button>
          </Stack>
        </VStack>
      </Box>
    </Box>
  );
};
