import { useMutation, useQueryClient } from 'react-query';
import { fetchWrapper } from '../services/restApi';
import { toast } from 'react-toastify';
import ErrorService from '../services/formatError/ErrorService';
import { storeLocalData } from '../services/auth/localStorageData';
export const useUploadPost = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (body) => {
      return fetchWrapper('POST', `post/uploadpost`, body);
    },
    {
      onSuccess: (data) => {
        if (data.status) {
          toast.success('Erfahrung gepostet');
        }
      },
      onError: (err) => {
        toast.error(ErrorService.uniformError(err));
      },
    }
  );
};
