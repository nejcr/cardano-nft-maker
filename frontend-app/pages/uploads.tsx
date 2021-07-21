import { Box, SimpleGrid } from '@chakra-ui/react';
import * as React from 'react';

export default function Uploads() {
  return (
    <SimpleGrid
      columns={[1, 2]}
      as="section"
      bg="blue.800"
      color="white"
      h={'100%'}
    >
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
      <Box>4</Box>
    </SimpleGrid>
  );
}
Uploads.getInitialProps = async () => {
  return {
    title: 'Your NFT upload to cardano',
    description: 'Your NFT upload to cardano with cardano-nft-maker',
  };
};
