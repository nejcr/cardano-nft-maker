import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import * as React from 'react';
import { useState } from 'react';
import FileUpload from './fileUpload/FileUpload';
import { MintTokenForm } from './forms/MintTokenForm';

export const IntroSection = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClose = () => {
    setFile(undefined);
    onClose();
  };
  return (
    <SimpleGrid
      columns={[1, 2]}
      as="section"
      bg="blue.800"
      color="white"
      h={'100%'}
    >
      <Modal size={'4xl'} isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <MintTokenForm file={file} onClose={handleClose} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <VStack
        alignItems={'flex-end'}
        pt={10}
        justify={'center'}
        textAlign={['center', 'left']}
      >
        <Box ml={[0, 20]}>
          <Heading
            textAlign={['center', 'left']}
            as="h3"
            size={'xl'}
            mt="7"
            mr={1}
            lineHeight="shorter"
          >
            Upload content for your NFT
          </Heading>
          <Heading
            textAlign={['center', 'left']}
            color={'twitter.300'}
            as="h4"
            size="md"
            mt="2"
          >
            Powered by Cardano and Arweave
          </Heading>
          <Text mt="4" textAlign={['center', 'left']}>
            File limit size:&nbsp; <b>2MB</b>
          </Text>
        </Box>
      </VStack>

      <VStack
        justify={'center'}
        pt={3}
        height={'100%'}
        spacing={3}
        flexDirection={'column'}
        alignItems={'center'}
        mr={{ base: '0vw', xl: '20vw' }}
      >
        <FileUpload
          onFileSelect={(event) => {
            onOpen();
            setFile(event.currentTarget.files[0]);
          }}
        />
        <Button
          variant={'outline'}
          size={'sm'}
          colorScheme={'blue'}
          onClick={onOpen}
        >
          or provide your own IPFS hash
        </Button>
      </VStack>
      {/*<VStack justify={"center"} width={["80%","60%"]}>*/}
      {/*    <Box w={"100%"}>*/}
      {/*        <SimpleGrid columns={[1,2]}>*/}
      {/*            <Heading size="md" mb="4" mt={{ lg: '3' }}>*/}
      {/*                Photo 1.jpg*/}
      {/*            </Heading>*/}
      {/*            <Heading  textAlign={"end"} size="md" mb="4" mt={{ lg: '3' }}>*/}
      {/*                Minting...*/}
      {/*            </Heading>*/}
      {/*        </SimpleGrid>*/}

      {/*        <Progress hasStripe value={64}  />*/}
      {/*    </Box>*/}

      {/*</VStack>*/}
    </SimpleGrid>
  );
};
