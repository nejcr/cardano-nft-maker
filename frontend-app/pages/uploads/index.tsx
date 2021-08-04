import { Box, Center, Heading, SimpleGrid } from '@chakra-ui/react';
import * as React from 'react';
import { useMintedUploads } from '../../api/api';
import { UploadCard } from '../../components/UploadCard';

export default function Index() {
  const { data, isLoading } = useMintedUploads();
  console.log(process.env);
  return (
    <Box>
      {data?.length === 0 ? (
        <Center
          h={'89.3vh'}
          bg="blue.800"
          color="white"
          axis={'both'}
          width={'100%'}
        >
          <Heading width={'100%'} textAlign={'center'}>
            No assets were created
          </Heading>
        </Center>
      ) : (
        <SimpleGrid
          p={[6, 12]}
          columns={[1, 1, 2, 3, 5]}
          spacing={[6, 12]}
          bg="blue.800"
          color="white"
          h={'89.3vh'}
          overflowY={'auto'}
        >
          {data?.map((upload: any) => (
            <UploadCard
              key={upload.id}
              id={upload?.id}
              assetName={upload?.assetName}
              arweaveLink={upload.arweaveLink}
              cardanoTransaction={upload?.cardanoTransaction}
              ipfsLink={upload?.ipfsLink}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
Index.getInitialProps = async () => {
  return {
    title: 'Your NFT upload to cardano',
    description: 'Your NFT upload to cardano with cardano-nft-maker',
  };
};
