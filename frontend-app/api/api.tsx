import axios from 'axios';
import { useQuery } from 'react-query';
import { MintSubmissionProps } from '../components/forms/MintTokenForm';
import { fileToBase64 } from '../utils/utils';

export const axiosClient = axios.create({
  baseURL: `http://localhost:${process.env.API_PORT ?? '8043'}`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

export const postMint = async (url: string, body: MintSubmissionProps) => {
  const { values, file: pureFile } = body;
  let file;
  if (pureFile instanceof File) {
    file = await fileToBase64(pureFile);
  } else {
    file = pureFile;
  }

  const res = await axiosClient.post('/mint', { file, ...values });
  return res?.data;
};

export function useMintedUploads() {
  return useQuery('mints', async () => (await axiosClient.get('/mints')).data, {
    keepPreviousData: true,
  });
}

export function useBalance() {
  return useQuery(
    'balance',
    async () => (await axiosClient.get('/status')).data,
    {
      keepPreviousData: true,
    }
  );
}
