import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stat,
  StatNumber,
} from '@chakra-ui/react';

export const WalletInfo = ({
  walletData,
  isOpen,
  onClose,
}: {
  walletData: { [key: string]: any };
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <>
      <Modal size={'xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'}>Blockchain info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider borderWidth={'2px'} />
            <Box ml={3} py={3}>
              <Heading size={'md'} color={'blue.300'} textAlign={'left'}>
                Cardano Wallet
              </Heading>
              <SimpleGrid columns={[2, 4]} color={'blue.300'}>
                <>
                  <Flex alignItems={'center'}>
                    <Heading size={'sm'}>Era</Heading>
                    <Box pt={'0.5px'} ml={1}>
                      {' '}
                      : {walletData?.status.cardanoStatus?.era}
                    </Box>
                  </Flex>
                  <Flex alignItems={'center'} j>
                    <Heading size={'sm'}>Block</Heading>
                    <Box pt={'0.5px'} ml={1}>
                      {' '}
                      : {walletData?.status?.cardanoStatus?.block}
                    </Box>
                  </Flex>
                  <Flex alignItems={'center'}>
                    <Heading size={'sm'}>Epoch</Heading>
                    <Box pt={'0.5px'} ml={1}>
                      {' '}
                      : {walletData?.status?.cardanoStatus?.epoch}
                    </Box>
                  </Flex>

                  <Flex alignItems={'center'}>
                    <Heading size={'sm'}>Slot</Heading>
                    <Box pt={'0.5px'} ml={1}>
                      {' '}
                      : {walletData?.status?.cardanoStatus?.slot}
                    </Box>
                  </Flex>
                </>
              </SimpleGrid>
              <Stat py={4}>
                <StatNumber color={'blue.300'} textAlign={'center'}>
                  {' '}
                  {Number(walletData?.cardano?.adaAmount)?.toFixed(3)} ADA
                </StatNumber>

                <Box color={'blue.400'} fontSize={'15px'} textAlign={'center'}>
                  {walletData?.cardano?.address}
                </Box>
              </Stat>
            </Box>

            <Divider borderWidth={'2px'} />
            <Box ml={3} py={3}>
              <Heading size={'md'} textAlign={'left'}>
                Arweave Wallet
              </Heading>
              <SimpleGrid columns={[1, 3]}>
                <>
                  <Flex alignItems={'center'}>
                    <Heading size={'sm'}>Blocks</Heading>
                    <Box pt={'0.5px'} ml={1}>
                      {' '}
                      : {walletData?.status?.arweaveStatus?.blocks}
                    </Box>
                  </Flex>
                  <Flex alignItems={'center'}>
                    <Heading size={'sm'}>Network</Heading>
                    <Box pt={'0.5px'} ml={1}>
                      {' '}
                      : {walletData?.status?.arweaveStatus?.network}
                    </Box>
                  </Flex>

                  <Flex alignItems={'center'} pl={[0, 16]}>
                    <Heading size={'sm'}>version</Heading>
                    <Box pt={'0.5px'} ml={1}>
                      {' '}
                      : {walletData?.status?.arweaveStatus?.version}
                    </Box>
                  </Flex>
                </>
              </SimpleGrid>
              <Stat py={4}>
                <StatNumber textAlign={'center'}>
                  {' '}
                  {Number(walletData?.arweave?.arweaveBalance)?.toFixed(3)} ARW
                </StatNumber>

                <Box fontSize={'15px'} textAlign={'center'}>
                  {walletData?.arweave?.address}
                </Box>
              </Stat>
            </Box>
            <Divider borderWidth={'2px'} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
