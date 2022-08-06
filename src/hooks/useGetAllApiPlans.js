import { useQuery } from 'react-query';
import { fetchWrapper } from '../services/restApi';
import { toast } from 'react-toastify';

export const useGetAllApiPlans = () => {
  return useQuery('allApiPlans', () => {
    return fetchWrapper(`apiPlans/getAllApiPlans`);
  });
};
