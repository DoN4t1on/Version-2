import { useMutation, useQueryClient } from 'react-query';
import { fetchWrapper } from '../services/restApi';
import { toast } from 'react-toastify';
import ErrorService from '../services/formatError/ErrorService';
import { storeLocalData } from '../services/auth/localStorageData';
export const useCheckEmail_UserNameAccount = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (body) => {
      return fetchWrapper('POST', `userAuth/checkemail`, body);
    },
    {
      onSuccess: (data) => {},
      onError: (err) => {
        toast.error(ErrorService.uniformError(err));
      },
    }
  );
};
