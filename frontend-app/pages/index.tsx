import { IntroSection } from '../components/IntroSection';

export default function Home() {
  return (
    <>
      <IntroSection />
    </>
  );
}

Home.getInitialProps = async () => {
  return {
    title: 'Upload NFT asset to cardano',
    description: 'Upload NFT asset to cardano with Arweave',
  };
};
