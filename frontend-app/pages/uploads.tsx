import { Box, SimpleGrid } from '@chakra-ui/react';
import * as React from 'react';
import { useMintedUploads } from '../api/api';
import { UploadCard } from '../components/UploadCard';

export default function Uploads() {
  const { data, isLoading } = useMintedUploads();

  return (
    <Box>
      <SimpleGrid
        p={[6, 12]}
        columns={[1, 1, 2, 3, 5]}
        spacing={[6, 12]}
        bg="blue.800"
        color="white"
        maxH={'89.3vh'}
        overflowY={'auto'}
      >
        {data?.map((upload: any) => (
          <UploadCard
            id={upload?.id}
            arweaveLink={upload.arweaveLink}
            cardanoTransaction={upload?.cardanoTransaction}
            ipfsLink={upload?.ipfsLink}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
Uploads.getInitialProps = async () => {
  return {
    title: 'Your NFT upload to cardano',
    description: 'Your NFT upload to cardano with cardano-nft-maker',
  };
};
