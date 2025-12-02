import { useQuery } from '@tanstack/react-query';
import { getAllocatedNominals } from '../services/getAllocatedNominals';

export const useAllocatedNominals = () => {
  return useQuery({
    queryKey: ['allocatedNominals'],
    queryFn: getAllocatedNominals,
  });
};
