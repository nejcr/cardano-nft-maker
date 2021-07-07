import axios from 'axios';
import { useQuery } from 'react-query';

export const axiosClient = axios.create({
  baseURL: 'http://localhost:8043/',
  timeout: 4000,
});


export default function useBalance() {
  return useQuery(
    'balance',
    async () => (await axiosClient.get('/status')).data
  );
}
